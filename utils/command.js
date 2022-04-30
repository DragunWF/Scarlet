import { MessageEmbed, MessageAttachment } from "discord.js";
import Tools from "./general-tools.js";

class Command {
  #embedMessageColors;
  #mainColor;

  constructor() {
    this.MessageEmbed = MessageEmbed;
    this.MessageAttachment = MessageAttachment;
    this.#embedMessageColors = [
      "#0F52BA", // Sappire Blue
      "#9b111e", // Ruby Red
      "#50C878", // Emerald Green
      "#faed27", // Yellow
      "#E38C2D", // Orange
      "#A1045A", // Magenta
      "#9966cc", // Purple Amethyst
      "#FFC0CB", // Pink
      "#D5F6FB", // Aqua
      "#9BD087", // Pastel Green
      "#A4D8D8", // Pastel Cyan
      "#FDFD96", // Pastel Yellow
      "#AEC6CF", // Pastel Blue
      "#C3B1E1", // Pastel Purple
      "#FAC898", // Pastel Orange
      "#E39FF6", // Lavender
    ];
    this.#mainColor = "#E0115F";
  }

  executeCommand(message) {
    // This is to create safety and to work as kind of like an abstract method in OOP languages...
    throw new Error(
      "You forgot to add the implementation to your inherited command!"
    );
  }

  get mainColor() {
    return this.#mainColor;
  }

  getRandomEmbedColor() {
    return Tools.getRandomItemFromArray(this.#embedMessageColors);
  }
}

export default Command;
