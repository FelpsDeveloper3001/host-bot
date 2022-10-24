import axios from "axios"
import { strapi_url, strapi_token } from "../config/config.json"

const instance = axios.create({
  baseURL: strapi_url,
  headers: {
    Authorization: `Bearer ${strapi_token}`,
  },
})

export default instance
