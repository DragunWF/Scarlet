import fetch from "node-fetch";
import Command from "../utils/command.js";
import Tools from "../utils/general-tools.js";

class StatsCommand extends Command {
  constructor() {
    super();
  }

  async executeCommand(message, user) {
    try {
      const stats = await this.#fetchCodeWarsStats(user);
      const embed = new this.MessageEmbed()
        .setColor(this.mainColor)
        .setTitle("CodeWars Stats")
        .setDescription(`**Username:** ${this.#formatStatValue(user)}`)
        .setFields(
          { name: "Skills", value: this.#concatenateUserSkills(stats.skills) },
          {
            name: "Rank",
            value: this.#formatStatValue(stats.ranks.overall.name),
            inline: true,
          },
          {
            name: "Honor",
            value: this.#formatStatValue(
              Tools.formatNumberWithComma(stats.honor)
            ),
            inline: true,
          },
          {
            name: "Clan",
            value: this.#formatStatValue(this.#formatClan(stats.clan)),
            inline: true,
          },
          {
            name: "Katas Solved",
            value: this.#formatStatValue(
              Tools.formatNumberWithComma(stats.codeChallenges.totalCompleted)
            ),
            inline: true,
          },
          {
            name: "Katas Authored",
            value: this.#formatStatValue(
              Tools.formatNumberWithComma(stats.codeChallenges.totalAuthored)
            ),
            inline: true,
          },
          {
            name: "Leaderboard Position",
            value: this.#formatStatValue(
              Tools.formatNumberWithComma(stats.leaderboardPosition)
            ),
            inline: true,
          }
        )
        .setFooter({ text: "Data fetched from CodeWars API" })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send(
        "Sorry lad, but I don't know if that user exists..."
      );
    }
  }

  async #fetchCodeWarsStats(user) {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${user}`
    );
    return await response.json();
  }

  #formatStatValue(value) {
    return `\`${value}\``;
  }

  #formatClan(clan) {
    if (!clan) return "Unknown";
    return clan;
  }

  #concatenateUserSkills(array) {
    return array.map((skill) => this.#formatStatValue(skill)).join(", ");
  }
}

export default StatsCommand;
