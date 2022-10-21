import api from "../"
import { strapi_url } from "../../config/config.json"

interface botCreateProps {
  bot_id: string
  bot_name: string
  client_id: string
  client_name: string
  online: boolean
  machine?: Object
  plan: String
}

export interface Bot extends botCreateProps {
  err: number
}

export async function teste(): Promise<any> {
  return new Promise((res) => {
    api
      .get("/system")
      .then((data) => {
        res(data.status)
      })
      .catch((err) => {
        res(err.status)
      })
  })
}

export async function getBot(id: string): Promise<Bot> {
  const response = await api.get(`bots?filters[bot_id][$eq]=${id}`)
  return response.data.data[0].attributes
}

export async function createBot(data: botCreateProps): Promise<Bot> {
  try {
    const bot = await getBot(data.bot_id)
    bot.err = 1
    if (bot) return bot
    const response = await api.post(`${strapi_url}/bots`, {
      data,
    })
    return response.data.data
  } catch (err) {
    return err
  }
}
