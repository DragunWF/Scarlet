import Command from "../utils/command.js";
import MessageLogger from "../utils/message_logger.js";

class SnipeCommand extends Command {
  constructor() {
    super();
    this.noSnipeResponses = [
      "Better luck next time lad, there is nothing to snipe...",
      "Sorry, but there is nothing to snipe.",
      "Well that is unfortunate, there is nothing to snipe.",
      "Sorry but I can't snipe anything when I have nothing recorded within my magic.",
    ];
    this.deletedMessage = null;
    this.editedMessage = { before: null, after: null };
  }

  storeDeletedMessage(message) {
    if (MessageLogger.validateMessageContent(message.content))
      this.deletedMessage = message;
  }

  storeEditedMessage(before, after) {
    if (MessageLogger.validateMessageContent(after.content)) {
      this.editedMessage.after = after;
      this.editedMessage.before = before;
    }
  }

  snipeDeletedMessage(object, message) {
    if (object.deletedMessage) {
    //   const embed = new object.MessageEmbed()
    //     .setColor(object.mainColor)
    //     .setAuthor();
    } else {
      message.channel.reply(
        object.noSnipeResponses[
          Math.floor(Math.random() * object.noSnipeResponses.length)
        ]
      );
    }
  }

  snipeEditedMessage(object, message, snipeBefore = false) {
    if (object.editedMessage.before && object.editedMessage.after) {
      return;
    } else {
      message.channel.reply(
        object.noSnipeResponses[
          Math.floor(Math.random() * object.noSnipeResponses.length)
        ]
      );
    }
  }
}

export default SnipeCommand;
