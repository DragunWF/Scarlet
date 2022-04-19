import "dotenv/config";
import Discord from "discord.js";

import CommandProcessor from "./utils/processor.js";
import keepServerRunning from "./utils/server.js";
import MessageLogger from "./utils/message-logger.js";
import KeywordResponder from "./utils/keyword-responder.js";

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "s!"; // Can be changed

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`My Master [${prefix}help]`, {
    type: "WATCHING",
  });
  CommandProcessor.onReady(prefix);
});

client.on("messageCreate", (message) => {
  try {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix))
      CommandProcessor.processCommand(message, client, prefix);
    KeywordResponder.checkForKeyword(message);
    MessageLogger.logCreatedMessage(message);
  } catch (error) {
    message.channel.send("**An unknown error has occured**");
    console.log(error);
  }
});

client.on("messageDelete", (message) => {
  try {
    if (message.author.bot) return;
    CommandProcessor.modifySnipeCommand(true, message);
    MessageLogger.logDeletedMessage(message);
  } catch (error) {
    console.log(error);
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  try {
    if (oldMessage.author.bot) return;
    CommandProcessor.modifySnipeCommand(false, {
      before: oldMessage,
      after: newMessage,
    });
    MessageLogger.logEditedMessage(oldMessage, newMessage);
  } catch (error) {
    console.log(error);
  }
});

keepServerRunning();
client.login(process.env.TOKEN);
