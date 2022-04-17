import DatabaseTool from "./db-tool.js";

class MessageLogger {
  static validateMessageContent(content) {
    if (!content.length > 1) return false;
    if (content.length < 10) {
      const uniqueCount = [...new Set(content.split(""))].filter((element) => {
        if (element === " ") return element;
      }).length;
      if (!uniqueCount > 1) return false;
    }
    return true;
  }

  static logCreatedMessage(message) {
    if (this.validateMessageContent) {
      DatabaseTool.insertCreatedMessage(message);
    }
  }

  static logDeletedMessage(message) {
    //
  }

  static logEditedMessage(before, after) {
    //
  }
}

export default MessageLogger;
