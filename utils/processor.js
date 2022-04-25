import fs from "fs";

import PingCommand from "../commands/ping.js";
import HelpCommand from "../commands/help.js";
import InfoCommand from "../commands/info.js";
import CryptoCommand from "../commands/crypto.js";
import SnipeCommand from "../commands/snipe.js";
import ChatCommand from "../commands/chat.js";

const settings = JSON.parse(fs.readFileSync("./config/bot.json"))[0];

const ping = new PingCommand();
const help = new HelpCommand();
const info = new InfoCommand();
const crypto = new CryptoCommand();
const snipe = new SnipeCommand();
const chat = new ChatCommand();

// The purpose of command executions is to map command objects with a function to call
const commands = JSON.parse(fs.readFileSync("./config/commands.json"));
const commandExecutions = [
  { name: "ping", call: ping.getBotLatency, object: ping },
  { name: "help", call: help.processHelpCommand, object: help },
  { name: "info", call: info.getBotInformation, object: info },
  { name: "crypto", call: crypto.sendCryptoData, object: crypto },
  { name: "snipe", call: snipe.snipeDeletedMessage, object: snipe },
  { name: "esnipe", call: snipe.snipeEditedMessage, object: snipe },
  { name: "chat", call: chat.sendMessage, object: chat },
  { name: "channel", call: chat.setChannel, object: chat },
];

class CommandProcessor {
  static onReady() {
    ping.prefix = settings.prefix;
    help.prefix = settings.prefix;
    help.fillCommandList(commands);
    this.mapCommandExecutions();
  }

  static mapCommandExecutions() {
    commands.sort((a, b) => a.name.localeCompare(b.name));
    commandExecutions.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < commands.length; i++) {
      commands[i].execution = commandExecutions[i].call;
      commands[i].object = commandExecutions[i].object;
    }
  }

  static modifySnipeCommand(isDeletedMessage, message) {
    if (isDeletedMessage) snipe.storeDeletedMessage(message);
    else snipe.storeEditedMessage(message.before, message.after);
  }

  static #rulerCommandOnly(message) {
    const responses = [
      "Only my master can run this command... **nerd**",
      "Sorry but only my master can run this command...",
      "Nope, you can't tell me to run this command nerd...",
      "You can't tell me what to do nerd...",
      `Hey ${message.author.name}, You can't make me run this command...`,
    ];
    message.reply(responses[Math.floor(Math.random() * responses.length)]);
  }

  static processCommand(command, client) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(settings.prefix.length)
      .split(/\s+/);

    const parameters = [];
    for (let cmd of commands) {
      if (cmd.alias.includes(commandName.toLowerCase())) {
        if (cmd.rulerCommand && command.author.id !== settings.users.master) {
          this.#rulerCommandOnly(command);
          break;
        } else {
          parameters.push(cmd.object);
          parameters.push(command);
          if (cmd.hasClientObject) parameters.push(client);
          if (cmd.hasArgs) parameters.push(args);
          cmd.execution(...parameters);
          break;
        }
      }
    }
  }
}

export default CommandProcessor;
