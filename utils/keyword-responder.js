import fs from "fs";
import Tools from "./general-tools.js";

class KeywordResponder {
  static #data = JSON.parse(fs.readFileSync("./config/keywords.json"));

  static checkForKeyword(message) {
    for (let word of message.content.split(" ")) {
      for (let object of this.#data) {
        if (object.keywords.includes(word)) {
          if (this.#checkIfCanExecute(object))
            this.#respondToMessage(message, object);
          return;
        }
      }
    }
  }

  static #checkIfCanExecute(keywordObject) {
    let canExecute = false;
    this.#data[this.#data.indexOf(keywordObject)].timesMentioned++;
    if (keywordObject.timesMentioned % keywordObject.timesToExecute == 0)
      canExecute = true;
    return canExecute;
  }

  static #isReactionResponse(keywordObject) {
    const hasPhrases = keywordObject.responses.phrases.length;
    const hasEmojis = keywordObject.responses.emojis.length;
    if (keywordObject.hasReaction) {
      if (hasPhrases && hasEmojis) {
        const chance = Math.floor(Math.random() * 2) + 1;
        if (chance === 1) return true;
        else return false;
      }
      if (hasPhrases) return false;
      if (hasEmojis) return true;
    }
    return false;
  }

  static #chooseResponse(keywordObject, isReaction) {
    const responses = isReaction
      ? keywordObject.responses.emojis
      : keywordObject.responses.phrases;
    return Tools.getRandomItemFromArray(responses);
  }

  static #respondToMessage(message, keywordObject) {
    const isReaction = this.#isReactionResponse(keywordObject);
    const response = this.#chooseResponse(keywordObject, isReaction);
    if (isReaction) message.react(response);
    else if (keywordObject.useReply) message.reply(response);
    else message.channel.send(response);
  }
}

export default KeywordResponder;
