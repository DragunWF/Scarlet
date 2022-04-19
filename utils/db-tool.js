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

    switch (type) {
      case "messageCreate":
        content = {
          message_id: message.id,
          guild_id: message.guildId,
          author_id: message.author.id,
          author_tag: message.author.tag,
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
          author_id: message.author.id,
          author_tag: message.author.tag,
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
          author_id: message.after.author.id,
          author_tag: message.after.author.tag,
          before_edit_content: message.before.content,
          after_edit_content: message.after.content,
          date_edited: datetime[0],
          time_edited: datetime[1].split(".")[0],
        };
        table = "edited_messages";
        break;
      case "newUser":
        content = {
          author_id: message.author.id,
          author_tag: message.author.tag,
        };
        table = "users";
        break;
      case "newChannel":
        content = {
          guild_id: message.guildId,
          channel_id: message.channelId,
          channel_name: message.channel.name,
        };
        table = "channels";
        break;
      case "newGuild":
        content = {
          guild_id: message.guildId,
          guild_name: message.guild.name,
        };
        table = "guilds";
        break;
    }
    const sqlQuery = `INSERT INTO ${table} SET ?`;

    if (type === "messageDelete" || type === "messageUpdate") {
      const id = type === "messageUpdate" ? message.before.id : message.id;
      db.query(`CALL on_message_state_update(${id});`, (err, results) => {
        if (err) console.log(err);
      });
    }

    db.query(sqlQuery, content, (err, results) => {
      if (err) console.log(err);
    });
  }
}

export default DatabaseTool;
