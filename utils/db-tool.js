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

    this.queryNewInfo();
    switch (type) {
      case "messageCreate":
        content = {
          message_id: message.id,
          guild_id: message.guildId,
          channel_id: message.channel.id,
          author_id: message.author.id,
          message_content: message.content,
          date_sent: datetime[0],
          time_sent: datetime[1].split(".")[0],
        };
        table = "messages";
        break;
      case "messageDelete":
        content = {
          message_id: message.id,
          guild_id: message.guildId,
          channel_id: message.channel.id,
          author_id: message.author.id,
          message_content: message.content,
          date_deleted: datetime[0],
          time_deleted: datetime[1].split(".")[0],
        };
        table = "deleted_messages";
        break;
      case "messageUpdate":
        content = {
          message_id: message.after.id,
          guild_id: message.after.guildId,
          channel_id: message.after.channel.id,
          author_id: message.after.author.id,
          before_edit_content: message.before.content,
          after_edit_content: message.after.content,
          date_edited: datetime[0],
          time_edited: datetime[1].split(".")[0],
        };
        table = "edited_messages";
        break;
    }
    const sqlQuery = `INSERT INTO ${table} SET ?`;

    this.queryNewUpdates(message, type);
    db.query(sqlQuery, content, (err, results) => {
      if (err) console.log(err);
    });
  }

  static queryNewInfo(message) {
    const queries = [
      {
        select: `SELECT * FROM guilds WHERE guild_id = ${message.guildId}`,
        table: "guilds",
        content: {
          guild_id: message.guildId,
          guild_name: message.guildName,
        },
      },
      {
        select: `SELECT * FROM users WHERE author_id = ${message.author.id}`,
        table: "users",
        content: {
          author_id: message.author.id,
          author_tag: message.author.tag,
        },
      },
      {
        select: `SELECT * FROM channels WHERE channel_id = ${message.channel.id}`,
        table: "channels",
        content: {
          guild_id: message.guildId,
          channel_id: message.channel.id,
          channel_name: message.channel.name,
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
    if (type === "messageDelete" || type === "messageUpdate") {
      const id = type === "messageUpdate" ? message.before.id : message.id;
      db.query(`CALL on_message_state_update(${id});`, (err, results) => {
        if (err) console.log(err);
      });
    }
  }
}

export default DatabaseTool;
