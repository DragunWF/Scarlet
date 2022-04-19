import Command from "../utils/command.js";

export class ChatCommand extends Command {
  constructor() {
    super();
    this.channel = null;
  }

  sendMessage(object, message, content) {
    if (object.channel) object.channel.send(content.join(" "));
    else message.channel.send("A channel has not been set up yet master...");
  }

  setChannel(object, message, client, channelId) {
    const response = object.channel
      ? "Master, I've moved to a different outpost!"
      : "Master, I've set up an outpost at a channel!";

    object.channel = client.channels.cache.get(channelId[0]);
    if (!object.channel)
      message.channel.send("That's an invalid input master!");
    else message.reply(response);
  }
}

export default ChatCommand;
