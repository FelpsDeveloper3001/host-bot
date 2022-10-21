import { join } from "path"

export async function receive(message: any) {
  try {
    const events = join(__dirname)

    require(`${events}/${message.type}`)(message)
  } catch (ops) {
    console.log("error events api", ops)
  }
}
