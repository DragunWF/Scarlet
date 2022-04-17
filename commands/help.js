import Command from "../utils/command.js";

class HelpCommand extends Command {
  constructor() {
    super();
    this.prefix = null;
    this.commandList = [];
  }

  fillCommandList(commands) {
    for (let command of commands) {
      this.commandList.push({ name: command.name, hasArgs: command.hasArgs });
    }
  }

  concatenateCommands() {
    let withArgs = "";
    let noArgs = "";
    for (let command of this.commandList) {
      if (command.hasArgs)
        withArgs += `- \`${this.prefix}${command.name} <argument>\`\n`;
      else noArgs += `- \`${this.prefix}${command.name}\`\n`;
    }
    return `**Regular Commands:**\n${noArgs}\n**Commands With Arguments:**\n${withArgs}`;
  }

  processHelpCommand(object, message) {
    const embed = new object.MessageEmbed()
      .setColor(object.mainColor)
      .setTitle("List of commands")
      .setDescription(object.concatenateCommands())
      .setFooter({ text: "Have fun!" });
    message.channel.send({ embeds: [embed] });
  }
}

export default HelpCommand;
