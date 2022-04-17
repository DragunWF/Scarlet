import Command from "../utils/command.js";
import MessageLogger from "../utils/message_logger.js";

class SnipeCommand extends Command {
  constructor() {
    super();
    this.deletedMessage = null;
    this.editedMessage = { before: null, after: null };
  }

  storeDeletedMessage(message) {
    if (MessageLogger.validateMessageContent(message.content)) {
      return;
    }
  }

  storeEditedMessage(before, after) {
    if (MessageLogger.validateMessageContent(after.content)) {
      return;
    }
  }

  snipeDeletedMessage() {
    return;
  }

  snipeEditedMessage() {
    return;
  }
}

export default SnipeCommand;
