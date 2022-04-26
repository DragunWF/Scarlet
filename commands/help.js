import fs from "fs";
import Command from "../utils/command.js";

class HelpCommand extends Command {
  #prefix;
  #commandList;

  constructor() {
    super();
    this.#prefix = JSON.parse(fs.readFileSync("./config/bot.json"))[0].prefix;
    this.#commandList = [];
  }

  executeCommand(message) {
    const embed = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setTitle("List of Commands")
      .setDescription(this.#concatenateCommands())
      .setFooter({ text: "Have fun!" });
    message.channel.send({ embeds: [embed] });
  }

  fillCommandList(commands) {
    for (let command of commands)
      this.#commandList.push({ name: command.name, hasArgs: command.hasArgs });
  }

  #concatenateCommands() {
    let withArgs = "";
    let noArgs = "";
    for (let command of this.#commandList) {
      if (command.hasArgs)
        withArgs += `- \`${this.#prefix}${command.name} <argument>\`\n`;
      else noArgs += `- \`${this.#prefix}${command.name}\`\n`;
    }
    return `**Regular Commands:**\n${noArgs}\n**Commands With Arguments:**\n${withArgs}`;
  }
}

export default HelpCommand;
