import "dotenv/config";
import mysql from "mysql";

const db = mysql.createPool({
  connectionLimit: 5,
  aquireTimeout: 10000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
console.log("Database has been connected successfully!");

class DatabaseTool {
  static insertMessageContent(message, type) {
    const datetime = new Date().toISOString().split("T");
    let table = null;
    let content = null;

    this.queryNewInfo(message);
    switch (type) {
      case "messageCreate":
        content = {
          message_id: message.id,
          guild_id: message.guild.id,
          channel_id: message.channel.id,
          author_id: message.author.id,
          message_content: this.filterUnsupportedCharacters(message.content),
          date_sent: datetime[0],
          time_sent: datetime[1].split(".")[0],
        };
        table = "messages";
        break;
      case "messageDelete":
        content = {
          message_id: message.id,
          guild_id: message.guild.id,
          channel_id: message.channel.id,
          author_id: message.author.id,
          message_content: this.filterUnsupportedCharacters(message.content),
          date_deleted: datetime[0],
          time_deleted: datetime[1].split(".")[0],
        };
        table = "deleted_messages";
        break;
      case "messageUpdate":
        content = {
          message_id: message.after.id,
          guild_id: message.after.guild.id,
          channel_id: message.after.channel.id,
          author_id: message.after.author.id,
          before_edit_content: this.filterUnsupportedCharacters(
            message.before.content
          ),
          after_edit_content: this.filterUnsupportedCharacters(
            message.after.content
          ),
          date_edited: datetime[0],
          time_edited: datetime[1].split(".")[0],
        };
        table = "edited_messages";
        break;
    }
    const sqlQuery = `INSERT INTO ${table} SET ?`;

    this.queryNewUpdates(message, type);
    setTimeout(() => {
      db.query(sqlQuery, content, (err, results) => {
        if (err) console.log(err);
      });
    }, 50);
  }

  static queryNewInfo(message) {
    const queries = [
      {
        select: `SELECT * FROM users WHERE author_id = ${message.author.id}`,
        table: "users",
        content: {
          author_id: message.author.id,
          author_tag: this.filterUnsupportedCharacters(message.author.tag),
        },
      },
      {
        select: `SELECT * FROM guilds WHERE guild_id = ${message.guild.id}`,
        table: "guilds",
        content: {
          guild_id: message.guild.id,
          guild_name: message.guild.name,
        },
      },
      {
        select: `SELECT * FROM channels WHERE channel_id = ${message.channel.id}`,
        table: "channels",
        content: {
          guild_id: message.guild.id,
          channel_id: message.channel.id,
          channel_name: this.filterUnsupportedCharacters(message.channel.name),
        },
      },
    ];

    for (let query of queries) {
      db.query(query.select, (err, results) => {
        if (err) console.log(err);
        if (!results.length) {
          db.query(
            `INSERT INTO ${query.table} SET ?`,
            query.content,
            (err, results) => {
              if (err) console.log(err);
            }
          );
        }
      });
    }
  }

  static queryNewUpdates(message, type) {
    const messageEvents = ["messageCreate", "messageUpdate", "messageDelete"];
    if (messageEvents.includes(type)) {
      const id =
        type === messageEvents[2]
          ? message.before.author.id
          : message.author.id;
      const tag =
        type === messageEvents[2]
          ? this.filterUnsupportedCharacters(message.before.author.tag)
          : message.author.tag;

      db.query(
        `SELECT * FROM users WHERE author_id = ${id}`,
        (err, results) => {
          if (err) console.log(err);
          if (results.length) {
            const userTag = results[0].author_tag;
            if (tag !== userTag) {
              db.query(
                `CALL update_user_tag(${id}, ${tag})`,
                (err, results) => {
                  if (err) console.log(err);
                }
              );
            }
          }
        }
      );
    }

    if (type !== messageEvents[0] && messageEvents.includes(type)) {
      const id = type === "messageUpdate" ? message.before.id : message.id;
      db.query(`CALL on_message_state_update(${id});`, (err, results) => {
        if (err) console.log(err);
      });
    }
  }

  static filterUnsupportedCharacters(string) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const punctuations = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~. `;

    const supported = `${letters}${digits}${punctuations}`.split("");
    return string
      .split("")
      .filter((chr) => {
        if (supported.includes(chr.toLowerCase())) return chr;
      })
      .join("");
  }
}

export default DatabaseTool;
