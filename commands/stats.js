import fetch from "node-fetch";
import Command from "../utils/command.js";

class StatsCommand extends Command {
  constructor() {
    super();
  }

  async executeCommand(message, user) {
    const stats = await this.#fetchCodeWarsStats();
    const embed = new this.MessageEmbed();
  }

  async #fetchCodeWarsStats(user) {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${user}`
    );
    return await response.json();
  }
}

export default StatsCommand;
