import fs from "fs";

import PingCommand from "../commands/ping.js";
import HelpCommand from "../commands/help.js";
import InfoCommand from "../commands/info.js";
import CryptoCommand from "../commands/crypto.js";
import { SnipeCommand, EditSnipeCommand } from "../commands/snipes.js";
import { SendMessageCommand, SetChannelCommand } from "../commands/set-and-send.js";
import StatsCommand from "../commands/stats.js";

class CommandProcessor {
  static #commands = JSON.parse(fs.readFileSync("./config/commands.json"));
  static #commandExecutions = [
    { name: "ping", object: new PingCommand() },
    { name: "help", object: new HelpCommand() },
    { name: "info", object: new InfoCommand() },
    { name: "crypto", object: new CryptoCommand() },
    { name: "snipe", object: new SnipeCommand() },
    { name: "esnipe", object: new EditSnipeCommand() },
    { name: "send", object: new SendMessageCommand() },
    { name: "set", object: new SetChannelCommand() },
    { name: "stats", object: new StatsCommand() }
  ];
  static #settings = JSON.parse(fs.readFileSync("./config/bot.json"))[0];
  static #snipeCommandIndex;
  static #esnipeCommandIndex;

  static onReady() {
    let helpCommandIndex;
    for (let i = 0; i < this.#commandExecutions.length; i++) {
      switch (this.#commandExecutions[i].name) {
        case "help":
          helpCommandIndex = i;
          break;
        case "snipe":
          this.#snipeCommandIndex = i;
          break;
        case "esnipe":
          this.#esnipeCommandIndex = i;
          break;
      }
    }

    this.#commandExecutions[helpCommandIndex].object.fillCommandList(
      this.#commands
    );
    this.mapCommandExecutions();
  }

  static processCommand(command, client) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(this.#settings.prefix.length)
      .split(/\s+/);

    const parameters = [];
    for (let cmd of this.#commands) {
      if (cmd.alias.includes(commandName.toLowerCase())) {
        if (
          cmd.rulerCommand &&
          command.author.id !== this.#settings.users.master
        ) {
          this.#rulerCommandOnly(command);
          break;
        } else {
          parameters.push(command);
          if (cmd.hasClientObject) parameters.push(client);
          if (cmd.hasArgs) parameters.push(args);
          cmd.object.executeCommand(...parameters);
          break;
        }
      }
    }
  }

  static mapCommandExecutions() {
    this.#commands.sort((a, b) => a.name.localeCompare(b.name));
    this.#commandExecutions.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < this.#commands.length; i++)
      this.#commands[i].object = this.#commandExecutions[i].object;
  }

  static modifySnipeCommand(isDeletedMessage, message) {
    const snipe = this.#commandExecutions[this.#snipeCommandIndex].object;
    const esnipe = this.#commandExecutions[this.#esnipeCommandIndex].object;
    if (isDeletedMessage) snipe.storeDeletedMessage(message);
    else esnipe.storeEditedMessage(message.before, message.after);
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
}

export default CommandProcessor;
