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

    this.queryNewInfo(message, type);
    this.queryNewUpdates(message, type);

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

    setTimeout(() => {
      db.query(sqlQuery, content, (err, results) => {
        if (err) console.log(err);
      });
    }, 25);
  }

  static queryNewInfo(message, type) {
    if (type === "messageUpdate") message = message.before;
    const parameters = [
      message.guild.id,
      message.guild.name,
      message.channel.id,
      message.channel.name,
      message.author.id,
      message.author_tag,
    ];
    db.query("CALL insert_new_info(?,?,?,?,?,?)", parameters, (err, result) => {
      if (err) console.log(err);
    });
  }

  static queryNewUpdates(message, type) {
    const messageEvents = ["messageCreate", "messageUpdate", "messageDelete"];
    if (messageEvents.includes(type)) {
      const id =
        type === messageEvents[1]
          ? message.before.author.id
          : message.author.id;
      const tag = this.filterUnsupportedCharacters(
        type === messageEvents[1]
          ? message.before.author.tag
          : message.author.tag
      );

      const parameters = [id, tag];
      db.query(
        "CALL check_user_tag_updates(?,?)",
        parameters,
        (err, results) => {
          if (err) console.log(err);
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
