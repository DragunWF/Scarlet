import "dotenv/config";
import Discord from "discord.js";

import CommandProcessor from "./utils/processor.js";
import keepServerRunning from "./utils/server.js";

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "!"; // Can be changed

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("The Universe [!help]", {
    type: "WATCHING",
  });
  CommandProcessor.onReady(prefix);
});

client.on("messageCreate", (message) => {
  try {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix))
      CommandProcessor.processCommand(message, prefix);
    // Add more code here
  } catch (error) {
    message.channel.send("**An unknown error has occured**");
    console.log(error);
  }
});

client.on("messageDelete", (message) => {
  try {
    if (message.author.bot) return;
    // Add code here
  } catch (error) {
    console.log(error);
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  try {
    if (oldMessage.author.bot) return;
    // Add code here
  } catch (error) {
    console.log(error);
  }
});

keepServerRunning();
client.login(process.env.TOKEN);
