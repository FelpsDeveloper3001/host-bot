import api from "../"
import { strapi_url } from "../../config/config.json"

export async function getNodeByName(name: string): Promise<any> {
  const response = await api.get(`nodes?filters[name][$eq]=${name}`)
  if (response.data.data[0]) {
    return response.data.data[0].attributes
  }
  return undefined
}

export async function createNode(data: {
  name: string
  memory: number
  cpus: number
}): Promise<any> {
  try {
    const node = (await getNodeByName(data.name)) as any
    if (node) return node
    const response = await api.post(`${strapi_url}/nodes`, {
      data: {
        name: data.name,
        ip: "0.0.0.0",
        memory: data.memory,
        cores: data.cpus,
      },
    })
    return response.data.data
  } catch (err) {
    return err
  }
}
