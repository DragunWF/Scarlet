import DatabaseTool from "./db-tool.js";

let lastMessageContent = null;

class MessageLogger {
  static validateMessageContent(content, isMessageCreate = false) {
    if (isMessageCreate && content === lastMessageContent) return false;
    if (!(content.length > 1)) return false;
    if (content.length < 10) {
      const uniqueCount = [...new Set(content.split(""))].filter((element) => {
        if (element === " ") return element;
      }).length;
      if (!(uniqueCount > 1)) return false;
    }
    return true;
  }

  static logCreatedMessage(message) {
    if (this.validateMessageContent(message.content, true)) {
      lastMessageContent = message.content;
      DatabaseTool.insertCreatedMessage(message);
    }
  }

  static logDeletedMessage(message) {
    if (this.validateMessageContent(message.content)) {
      DatabaseTool.insertDeletedMessage(message);
    }
  }

  static logEditedMessage(before, after) {
    if (this.validateMessageContent(after.content)) {
      DatabaseTool.insertEditedMessage(before, after);
    }
  }
}

export default MessageLogger;
