import Command from "../utils/command.js";
import MessageLogger from "../utils/message-logger.js";

class SnipeCommand extends Command {
  constructor() {
    super();
    this.noSnipeResponses = [
      "Better luck next time I guess, seems like my spell missed.",
      "Sorry, but there is nothing for me to use my magic on.",
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
      const embed = new object.MessageEmbed()
        .setColor(object.mainColor)
        .setAuthor({
          name: object.deletedMessage.author.tag,
          iconURL: object.deletedMessage.author.displayAvatarURL(),
        })
        .setDescription(object.deletedMessage.content)
        .setFooter({ text: "Deleted Message" })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send(
        object.noSnipeResponses[
          Math.floor(Math.random() * object.noSnipeResponses.length)
        ]
      );
    }
  }

  snipeEditedMessage(object, message) {
    if (object.editedMessage.before && object.editedMessage.after) {
      const embed = new object.MessageEmbed()
        .setColor(object.mainColor)
        .setAuthor({
          name: object.editedMessage.after.author.tag,
          iconURL: object.editedMessage.after.author.displayAvatarURL(),
        })
        .setDescription(object.editedMessage.before.content)
        .setFooter({ text: "Edited Message" })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send(
        object.noSnipeResponses[
          Math.floor(Math.random() * object.noSnipeResponses.length)
        ]
      );
    }
  }
}

export default SnipeCommand;
