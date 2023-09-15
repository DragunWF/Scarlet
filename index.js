import "dotenv/config";
import Discord from "discord.js";
// import fs from "fs";

import CommandProcessor from "./utils/command-processor.js";
import keepServerRunning from "./utils/server.js";
import MessageLogger from "./utils/message-logger.js";
import KeywordResponder from "./utils/keyword-responder.js";
import Data from "./utils/data.js";
import Troll from "./utils/troll.js";

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
// const prefix = JSON.parse(fs.readFileSync("./config/bot.json"))[0].prefix;
const settings = Data.getSettings();
const prefix = settings.prefix;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`My Master [${prefix}help]`, {
    type: "WATCHING",
  });
  CommandProcessor.onReady();
});

client.on("messageCreate", (message) => {
  try {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix))
      CommandProcessor.processCommand(message, client);
    KeywordResponder.checkForKeyword(message);
    MessageLogger.logCreatedMessage(message);
    if (message.author.id === settings.users.jewker)
      Troll.initializeTrolling(client);
  } catch (error) {
    message.channel.send("**An unknown error has occured**");
    console.log(error);
  }
});

client.on("messageDelete", (message) => {
  try {
    if (message.author.bot) return;
    CommandProcessor.modifySnipeCommand(true, message);
    MessageLogger.logDeletedMessage(message, client);
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
    MessageLogger.logEditedMessage(oldMessage, newMessage, client);
  } catch (error) {
    console.log(error);
  }
});

keepServerRunning();
client.login(process.env.TEST);
