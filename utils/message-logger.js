import fs from "fs";
import DatabaseTool from "./db-tool.js";
import Command from "./command.js";
import { MessageEmbed } from "discord.js";

const settings = JSON.parse(fs.readFileSync("./config/bot.json"))[0];
const utils = new Command();

let lastMessageContent = null;

class MessageLogger {
  static validateMessageContent(content, isMessageCreate = false) {
    if (
      !(content.length > 1) ||
      (isMessageCreate && content.startsWith(settings.prefix)) ||
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

  static logDeletedMessage(message, client) {
    if (this.validateMessageContent(message.content)) {
      this.logToChannel(message, settings.logChannels.deleted, client);
      DatabaseTool.insertMessageContent(message, "messageDelete");
    }
  }

  static logEditedMessage(before, after, client) {
    if (this.validateMessageContent(after.content)) {
      this.logToChannel(before, settings.logChannels.edited, client);
      DatabaseTool.insertMessageContent(
        { before: before, after: after },
        "messageUpdate"
      );
    }
  }

  static logToChannel(message, channel, client) {
    const logChannel = client.channels.cache.get(channel);
    const footerText =
      channel == settings.logChannels.deleted
        ? "Deleted Message"
        : "Edited Message";
    const embed = new MessageEmbed()
      .setColor(utils.getRandomEmbedColor())
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(message.content)
      .setFooter({ text: footerText })
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }
}

export default MessageLogger;
