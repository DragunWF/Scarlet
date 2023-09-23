import fs from "fs";
import Data from "./data.js";

class Troll {
  static #trollRoleName = "Citizen";
  static #rangeOfMinutes = { min: 3, max: 8 };
  static #targetIsOnline = false;
  static #iterations = 0;
  static #trollModeOn = false;

  static initializeTrolling(messageObj) {
    if (!this.#targetIsOnline) {
      this.#trollModeOn = true;
      this.#targetIsOnline = true;
      this.#trollJewker(messageObj, messageObj.author.id);
      console.log("Trolling has been initialized!");
    }
  }

  static showStatus() {
    console.log(`Troll Mode: ${this.#trollModeOn}`);
    console.log(`Target is Online: ${this.#targetisOnline}`);
    console.log(`Iterations: ${iterations}`);
  }

  static #trollJewker(message, targetID) {
    const minutes = Math.floor(
      Math.random() * (this.#rangeOfMinutes.max - this.#rangeOfMinutes.min) +
        this.#rangeOfMinutes.min
    );
    const targetUser = message.guild.members.cache.get(targetID);
    const trollRole = message.guild.roles.cache.find(
      (role) => role.name === this.#trollRoleName
    );
    console.log(targetUser);

    setTimeout(() => {
      // Fix Bug later. (TargetUser is null)
      const userHasRole = targetUser.roles.cache.has(trollRole.id);
      if (userHasRole) {
        targetUser.roles.remove(trollRole.id);
        console.log(
          `Troll Role added to ${targetUser.username} (${this.#iterations})`
        );
      } else {
        targetUser.roles.add(trollRole.id);
        console.log(
          `Troll Role removed from ${targetUser.username} (${this.#iterations})`
        );
      }
      if (this.#trollModeOn) {
        this.#trollJewker(message, targetID);
      }
    }, minutes * 2000);
    this.#iterations++;
  }
}

export default Troll;
