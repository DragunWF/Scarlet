import fs from "fs";
import DatabaseTool from "./db-tool.js";

const prefix = JSON.parse(fs.readFileSync("./config/bot.json"))[0].prefix;
let lastMessageContent = null;

class MessageLogger {
  static validateMessageContent(content, isMessageCreate = false) {
    if (
      !(content.length > 1) ||
      (isMessageCreate && content.startsWith(prefix)) ||
      (isMessageCreate && content === lastMessageContent)
    )
      return false;
    if (content.length < 10) {
      const uniqueCount = [...new Set(content.split(""))].filter((element) => {
        if (element !== " ") return element;
      }).length;
      if (!(uniqueCount > 1)) return false;
    }
    return true;
  }

  static logCreatedMessage(message) {
    if (this.validateMessageContent(message.content, true)) {
      lastMessageContent = message.content;
      DatabaseTool.insertMessageContent(message, "messageCreate");
    }
  }

  static logDeletedMessage(message) {
    if (this.validateMessageContent(message.content)) {
      DatabaseTool.insertMessageContent(message, "messageDelete");
    }
  }

  static logEditedMessage(before, after) {
    if (this.validateMessageContent(after.content)) {
      DatabaseTool.insertMessageContent(
        { before: before, after: after },
        "messageUpdate"
      );
    }
  }
}

export default MessageLogger;
 