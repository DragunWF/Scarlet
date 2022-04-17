import fs from "fs";

const data = JSON.parse(fs.readFileSync("../config/keywords.json"));

class KeyWordResponder {
  static checkForKeyWord(message) {
    for (let word of message.content.split(" ")) {
      for (let object of data) {
        if (object.keywords.includes(word)) {
          this.respondToMessage(message, object);
          return;
        }
      }
    }
  }

  static isReactionResponse(keywordObject) {
    const hasPhrases = keywordObject.responses.phrases.length;
    const hasEmojis = keywordObject.responses.emojis.length;
    if (keywordObject.hasReaction) {
      if (hasPhrases && hasEmojis) {
        const chance = Math.floor(Math.random() * 2) + 1;
        if (chance == 1) return true;
        else return false;
      }
      if (hasPhrases) return false;
      if (hasEmojis) return true;
    }
    return false;
  }

  static chooseResponse(keywordObject, reaction) {
    const responses = reaction
      ? keywordObject.responses.emojis
      : keywordObject.responses.phrases;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static respondToMessage(message, keywordObject) {
    const isReaction = this.isReactionResponse(keywordObject);
    const response = chooseResponse(keywordObject, isReaction);
    if (isReaction) message.react(response);
    else if (keywordObject.useReply) message.reply(response);
    else message.channel.send(response);
  }
}
