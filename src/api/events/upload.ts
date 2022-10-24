import { TextChannel } from "discord.js"
import { client } from "../../"
import { uploadMessage } from "../../utils/messages/upload"

module.exports = async (message: any) => {
  const channel = client.channels.cache.get(message.channelId) as TextChannel
  if (channel) {
    const messages = await channel.messages.fetch({ limit: 1 })
    const messageFilter = messages.filter((x) => x.id == message.messageId)
    console.log(messages, messageFilter, message)
    const msg = messageFilter.map((x: any) => x)[0]
    console.log(msg)
    if (msg) {
      console.log("opa")
      uploadMessage({
        data: message,
        channel,
        message: msg,
        progress: message.progress,
      })
    }
  }
}
