import fs from "fs";

const data = JSON.parse(fs.readFileSync("../config/keywords.json"));

class KeyWordResponder {
  checkForKeyWord(message) {
    for (let word of message.content.split(" ")) {
      for (let object of data) {
        if (object.keywords.includes(word)) {
          this.respondToMessage(message, data);
          return;
        }
      }
    }
  }

  chooseResponse(keywordObject, reaction) {
      
  }

  respondToMessage(message, keywordObject) {
    if (keywordObject.hasReaction) {
      const chance = Math.floor(Math.random() * 2) + 1;
      if (chance == 1) {
        if (keywordObject.reply) message.reply();
      }
    }
  }
}
