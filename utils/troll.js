import fs from "fs";

class Troll {
  static #trollRole = "Citizen";
  static #rangeOfMinutes = [5, 10];
  static #data = JSON.parse(fs.readFileSync("./config/bot.json"));
  static #target;

  static initializeTrolling(messageObj, clientObj) {
    this.#trollJewker(messageObj, clientObj);
    this.#target = clientObj.users.fetch(this.#data.users.jewker);
    console.log("Trolling has been initialized!");
  }

  static #trollJewker(message) {
    const minutes = Math.floor(
      Math.random() * (this.#rangeOfMinutes[1] - this.#rangeOfMinutes[0]) +
        this.#rangeOfMinutes[0]
    );
    setTimeout(() => {
      message.guild.roles.find((role) => role.name === this.#trollRole);
      // Implement logic to apply role here (Revenge Time)
      // Pseudocode
      // If user already has the role, remove it. If it doesn't add it.
      // Continually recurse this function within a random range of minutes
      this.trollJewker();
    }, minutes * 60);
  }
}

export default Troll;
