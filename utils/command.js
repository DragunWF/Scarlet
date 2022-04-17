import { MessageEmbed } from "discord.js";

const embedMessageColors = [
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
const _mainColor = new WeakMap();

class Command {
  constructor() {
    this.MessageEmbed = MessageEmbed;
    _mainColor.set(this, "#9966cc");
  }

  get mainColor() {
    return _mainColor.get(this);
  }

  getRandomEmbedColor() {
    return embedMessageColors[
      Math.floor(Math.random() * embedMessageColors.length)
    ];
  }
}

export default Command;
