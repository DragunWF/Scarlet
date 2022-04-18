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
  static insertCreatedMessage(message) {
    const datetime = new Date().toISOString().split("T");
    const content = {
      message_id: message.id,
      guild_id: message.guildId,
      author_id: message.author.id,
      author_tag: message.author.tag,
      message_content: message.content,
      date_sent: datetime[0],
      time_sent: datetime[1].split(".")[0],
    };
    const sqlQuery = "INSERT INTO messages SET ?";
    db.query(sqlQuery, content, (err, results) => {
      if (err) console.log(err);
    });
  }

  static insertDeletedMessage(message) {
    const content = {
      message_id: message.id,
      guild_id: message.guildId,
      author_id: message.author.id,
      author_tag: message.author.tag,
      message_content: message.content,
      date_deleted: datetime[0],
      time_deleted: datetime[1].split(".")[0],
    };
    const sqlQuery = `
    CALL on_message_state_update(${message.id});
    INSERT INTO deleted_messages SET ?
    `;
    db.query(sqlQuery, content, (err, results) => {
      if (err) console.log(err);
    });
  }

  static insertEditedMessage(before, after) {
    return;
  }
}

export default DatabaseTool;
