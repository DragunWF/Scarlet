import Command from "../utils/command.js";
import MessageLogger from "../utils/message-logger.js";

export class SnipeCommand extends Command {
  #deletedMessage;

  constructor() {
    super();
    this.#deletedMessage = null;
  }

  executeCommand(message) {
    if (this.#deletedMessage) {
      const embed = new this.MessageEmbed()
        .setColor(this.mainColor)
        .setAuthor({
          name: this.#deletedMessage.author.tag,
          iconURL: this.#deletedMessage.author.displayAvatarURL(),
        })
        .setDescription(this.#deletedMessage.content)
        .setFooter({ text: "Deleted Message" })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } else {
      const noSnipeResponses = [
        "Better luck next time I guess, seems like my spell missed.",
        "Sorry, but there is nothing for me to use my magic on.",
        "Well that is unfortunate, there is nothing to snipe.",
        "Sorry but I can't snipe anything when I have nothing recorded within my magic.",
      ];
      message.channel.send(
        this.noSnipeResponses[
          Math.floor(Math.random() * noSnipeResponses.length)
        ]
      );
    }
  }

  storeDeletedMessage(message) {
    if (MessageLogger.validateMessageContent(message.content))
      this.#deletedMessage = message;
  }
}

export class EditSnipeCommand extends Command {
  #editedMessage;

  constructor() {
    super();
    this.#editedMessage = { before: null, after: null };
  }

  executeCommand(message) {
    if (this.#editedMessage.before && this.#editedMessage.after) {
      const embed = new this.MessageEmbed()
        .setColor(this.mainColor)
        .setAuthor({
          name: this.editedMessage.after.author.tag,
          iconURL: this.editedMessage.after.author.displayAvatarURL(),
        })
        .setDescription(this.editedMessage.before.content)
        .setFooter({ text: "Edited Message" })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } else {
      const noSnipeResponses = [
        "I can't find any edited messages sadly...",
        "Sadge, I couldn't find any edited messages...",
        "Sorry but I couldn't find any edited messages within my magic...",
        "There's no edited message to snipe with my magic unfortunately...",
      ];
      message.channel.send(
        this.noSnipeResponses[
          Math.floor(Math.random() * noSnipeResponses.length)
        ]
      );
    }
  }

  storeEditedMessage(before, after) {
    if (MessageLogger.validateMessageContent(after.content)) {
      this.editedMessage.after = after;
      this.editedMessage.before = before;
    }
  }
}
