import Command from "../utils/command.js";

class ChatCommand extends Command {
  constructor() {
    super();
    this.channel = null;
  }

  sendMessage(object, message, content) {
    if (object.channel) object.channel.send(content.join(" "));
    else {
      const responses = [
        "A channel has not been set up yet master...",
        "Master, you need to set up a channel first before I can talk",
        "A channel needs to be set up first master before I can talk",
      ];
      try {
        message.channel.send(
          responses[Math.floor(Math.random() * responses.length)]
        );
      } catch (err) {
        console.log(err);
        const errorResponses = [
          "I have been rudely interrupted master! I couldn't talk",
          "Sorry master, but it seems like I have ran into a problem",
          "Master! I have encountered myself into an error",
        ];
        message.reply(
          errorResponses[Math.floor(Math.random() * errorResponses.length)]
        );
      }
    }
  }

  setChannel(object, message, client, channelId) {
    if (object.channel && object.channel.id === channelId)
      message.channel.send("I've already been set up there master");
    else {
      const responses = object.channel
        ? [
            "Time for me to move to a different area",
            "Well, time to travel again I guess",
            "Onwards I go, to adventure!",
            "Another adventure, another tale to be unwoven...",
            "Travelling travelling, here I go hehe",
          ]
        : [
            "Oh this will be fun hehe",
            "Ah yes, it is time to start our fun",
            "Time for another session hehe...",
          ];

      object.channel = client.channels.cache.get(channelId[0]);
      if (!object.channel)
        message.channel.send("That's an invalid input master!");
      else
        message.reply(responses[Math.floor(Math.random() * responses.length)]);
    }
  }
}

export default ChatCommand;
