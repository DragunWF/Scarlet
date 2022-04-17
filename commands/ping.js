import Command from "../utils/command.js";

class PingCommand extends Command {
  constructor() {
    super();
  }

  getBotLatency(object, message) {
    const ping = Date.now() - message.createdTimestamp;
    const embedOutput = new object.MessageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setAuthor({
        name: "Pong!",
      })
      .setDescription(`Ping: **${ping}ms** :ping_pong:`);
    message.channel.send({ embeds: [embedOutput] });
  }
}

export default PingCommand;
