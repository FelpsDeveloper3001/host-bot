import Rabbit from "./rabbitMq"
import { ping as pingStrapi } from "../api/functions/ping"
import { color } from "../functions"
import { connect } from "../database/prisma"
import { receive } from "../api/events"
let rabbit: Rabbit
export async function services() {
  rabbit = new Rabbit().on("ready", () => {
    rabbit.consume("host:bot", (message: any) => {
      receive(message)
    })
  })
  ping()
  connect()
}

export async function ping() {
  const a = await pingStrapi()
  if (a == 200) {
    console.log(color("text", `💪 Successfully Strapi connection`))
  } else {
    console.log(color("error", `💪 Error in Strapi connection`))
  }
}

export { rabbit }
