import Command from "../utils/command.js";

const description = `
Hello! This is a Discord Bot.
`; // Change description

class InfoCommand extends Command {
  constructor() {
    super();
  }

  getBotInformation(object, message) {
    const embedOutput = new object.MessageEmbed()
      .setColor(object.mainColor)
      .setAuthor({
        // Feel free to change for people who are planning to use this template
        name: "DragonWF#9321",
        iconURL: "https://cdn.discordapp.com/avatars/408972598798450688/617053b744713e4a211c1e119ec46ab4.webp",
      })
      .setTitle("Bot Information")
      .setDescription(description)
      .setImage(
        "https://cdn.discordapp.com/avatars/939435166034722827/73ead4510886bc2ecfd08b7147b07d17.webp"
      )
      .setFooter({ text: "Have a nice day!" });
    message.channel.send({ embeds: [embedOutput] });
  }
}

export default InfoCommand;
