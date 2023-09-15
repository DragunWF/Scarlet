import fs from "fs";

class Data {
  static #settings = JSON.parse(fs.readFileSync("./config/bot.json"));
  static #commands = JSON.parse(fs.readFileSync("./config/commands.json"));
  static #keywords = JSON.parse(fs.readFileSync("./config/keywords.json"));

  static getSettings() {
    return this.#settings;
  }

  static getCommands() {
    return this.#commands;
  }

  static getKeywords() {
    return this.#keywords;
  }
}

export default Data;
