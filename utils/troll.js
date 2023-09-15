import fs from "fs";
import Data from "./data.js";

class Troll {
  static #trollRoleName = "Citizen";
  static #rangeOfMinutes = { min: 1, max: 1 };
  static #targetIsOnline = false;

  static initializeTrolling(messageObj) {
    if (!this.#targetIsOnline) {
      this.#targetIsOnline = true;
      this.#trollJewker(messageObj, messageObj.author.id);
      console.log("Trolling has been initialized!");
    }
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

    setTimeout(() => {
      const userHasRole = targetUser.roles.cache.has(trollRole.id);
      if (userHasRole) {
        targetUser.roles.remove(trollRole.id);
      } else {
        targetUser.roles.add(trollRole.id);
      }
      this.#trollJewker(targetID);
    }, minutes * 60);
  }
}

export default Troll;
