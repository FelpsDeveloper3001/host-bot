import Rabbit from "./rabbitMq"
import { ping as pingStrapi } from "../api/functions/ping"
import { color } from "../functions"
import { connect } from "../database/prisma"
import { getBot } from "../api/functions/bots"

let rabbit: Rabbit
export async function services() {
  //const a = await getBot("931226824753700934")
  //console.log(a)
  rabbit = new Rabbit().on("ready", () => {
    rabbit.consume("host:bot", (message: any) => {})
    /*
    rabbit.send("host:node", "pandora", {
      OK: true,
    })
    */

    /*
    rabbit.consume("host:node-pandora", (message: any) => {
      console.log("message", message)
    })
    */
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
