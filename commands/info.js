import fs from "fs";
import Command from "../utils/command.js";

class InfoCommand extends Command {
  #author;
  #description;

  constructor() {
    super();
    this.#author = JSON.parse(
      fs.readFileSync("./config/bot.json")
    )[0].creatorTag;
    this.#description = `
Hello! This is a discord bot written in JavaScript. Made by \`${this.#author}\`.
This bot is specifically made for personal use and nothing else.
    `;
  }

  executeCommand(message) {
    const embed = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setAuthor({
        name: this.#author,
        iconURL:
          "https://cdn.discordapp.com/avatars/408972598798450688/617053b744713e4a211c1e119ec46ab4.webp",
      })
      .setTitle("Bot Information")
      .setDescription(this.#description)
      .setImage(
        "https://cdn.discordapp.com/avatars/965201825928196098/c3714dff1fa2f6f32b91bf802de82de5.webp"
      )
      .setFooter({ text: "Have a nice day!" });
    message.channel.send({ embeds: [embed] });
  }
}

export default InfoCommand;
