import { TextChannel } from "discord.js"
import { client } from "../../"

module.exports = async (message: any) => {
  const channel = client.channels.cache.get(message.channelId) as TextChannel
  const messages = await channel.messages.fetch({ limit: 1 })
  const messageFilter = messages.filter((x) => x.id == message.message)
  const msg = messageFilter.map((x: any) => x)[0]
  if (msg) {
  }
}
