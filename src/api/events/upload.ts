import { TextChannel } from "discord.js";
import { client } from "../../";
import { uploadMessage } from "../../utils/messages/upload";

module.exports = async (message: any) => {
  const channel = client.channels.cache.get(message.channelId) as TextChannel;
  if (channel) {
    const messages = await channel.messages.fetch();
    const messageFilter = messages.filter((x) => x.id == message.messageId);
    const msg = messageFilter.map((x: any) => x)[0];
    if (msg) {
      uploadMessage({
        data: message,
        channel,
        message: msg,
        progress: message.progress,
      });
    }
  }
};
