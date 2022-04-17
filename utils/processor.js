import fs from "fs";

import PingCommand from "../commands/ping.js";
import HelpCommand from "../commands/help.js";
import InfoCommand from "../commands/info.js";
import CryptoCommand from "../commands/crypto.js";

const ping = new PingCommand();
const help = new HelpCommand();
const info = new InfoCommand();
const crypto = new CryptoCommand();

// The purpose of command executions is to map command objects with a function to call
const commands = JSON.parse(fs.readFileSync("./config/commands.json"));
const commandExecutions = [
  { name: "ping", call: ping.getBotLatency, object: ping },
  { name: "help", call: help.processHelpCommand, object: help },
  { name: "info", call: info.getBotInformation, object: info },
  { name: "crypto", call: crypto.sendCryptoData, object: crypto },
];

class CommandProcessor {
  static onReady(prefix) {
    ping.prefix = prefix;
    help.prefix = prefix;
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

  static processCommand(command, prefix) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);

    const parameters = [];
    for (let cmd of commands) {
      if (cmd.alias.includes(commandName.toLowerCase())) {
        parameters.push(cmd.object);
        parameters.push(command);
        if (cmd.hasArgs) parameters.push(args);
        cmd.execution(...parameters);
      }
    }
  }
}

export default CommandProcessor;
