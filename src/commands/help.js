import Command from "../utils/command.js";

class HelpCommand extends Command {
  constructor() {
    super();
    this.prefix = null;
  }

  concatenateCommands(array, hasArgs, initial = null) {
    let output = "";
    for (let item of array) {
      if (hasArgs) output += `- \`${this.prefix}${initial} ${item}\`\n`;
      else output += `- \`${this.prefix}${item}\`\n`;
    }
    return output;
  }

  processHelpCommand(object, message) {
    const commandList = ["ping", "info"];
    const embed = new object.MessageEmbed()
      .setColor(object.mainColor)
      .setTitle("List of commands")
      .setDescription(object.concatenateCommands(commandList, false))
      .setFooter({ text: "Welcome!" });
    message.channel.send({ embeds: [embed] });
  }
}

export default HelpCommand;
