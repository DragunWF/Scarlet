import Command from "../utils/command.js";

const description = `
Hello! This is a discord bot written in JavaScript. Made by \`DragonWF#9321\`
This bot is specifically made for personal use and nothing else.
`;

class InfoCommand extends Command {
  constructor() {
    super();
  }

  getBotInformation(object, message) {
    const embedOutput = new object.MessageEmbed()
      .setColor(object.mainColor)
      .setAuthor({
        name: "DragonWF#9321",
        iconURL:
          "https://cdn.discordapp.com/avatars/408972598798450688/617053b744713e4a211c1e119ec46ab4.webp",
      })
      .setTitle("Bot Information")
      .setDescription(description)
      .setImage(
        "https://cdn.discordapp.com/avatars/965201825928196098/c3714dff1fa2f6f32b91bf802de82de5.webp"
      )
      .setFooter({ text: "Have a nice day!" });
    message.channel.send({ embeds: [embedOutput] });
  }
}

export default InfoCommand;
