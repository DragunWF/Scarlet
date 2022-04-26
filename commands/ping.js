import Command from "../utils/command.js";

class PingCommand extends Command {
  constructor() {
    super();
  }

  executeCommand(message) {
    const ping = Date.now() - message.createdTimestamp;
    const embed = new this.MessageEmbed()
      .setColor(this.getRandomEmbedColor())
      .setAuthor({
        name: "Pong!",
      })
      .setDescription(`Ping: **${ping}ms** :ping_pong:`);
    message.channel.send({ embeds: [embed] });
  }
}

export default PingCommand;
