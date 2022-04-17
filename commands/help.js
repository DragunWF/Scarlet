import Command from "../utils/command.js";

class HelpCommand extends Command {
  constructor(prefix) {
    super();
    this.prefix = null;
    this.commandList = [];
  }

  fillCommandList(commands) {
    console.log(commands);
    for (let command of commands) {
      this.commandList.push(command.name);
    }
  }

  concatenateCommands(hasArgs, initial = null) {
    let output = "";
    for (let item of this.commandList) {
      if (hasArgs) output += `- \`${this.prefix}${initial} ${item}\`\n`;
      else output += `- \`${this.prefix}${item}\`\n`;
    }
    return output;
  }

  processHelpCommand(object, message) {
    const embed = new object.MessageEmbed()
      .setColor(object.mainColor)
      .setTitle("List of commands")
      .setDescription(object.concatenateCommands(false))
      .setFooter({ text: "Have fun!" });
    message.channel.send({ embeds: [embed] });
  }
}

export default HelpCommand;
