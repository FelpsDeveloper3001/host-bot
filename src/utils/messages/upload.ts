import { TextChannel } from "discord.js"

interface Upload {
  data: any
  channel: TextChannel
  progress: number
  message: any
}
export function uploadMessage(data: Upload) {
  //if (data.progress == 1) {
  data.message.edit({
    embeds: [],
    content: `${data.progress}`,
  })
  //  }
}
