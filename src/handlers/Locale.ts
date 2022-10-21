import { Client } from "discord.js"
import i18next from "i18next"
import i18nbackend from "i18next-fs-backend"
import fs from "fs"
import path from "path"
import { color } from "../functions"

module.exports = async (client: Client) => {
  try {
    const dir = path.join(__dirname, "../locales")
    await i18next.use(i18nbackend).init({
      ns: ["commands", "permissions", "messages"],
      defaultNS: "commands",
      preload: fs.readdirSync(dir),
      fallbackLng: "en",
      backend: { loadPath: `${dir}/{{lng}}/{{ns}}.json` },
      interpolation: {
        escapeValue: false,
        useRawValueToEscape: true,
      },
      returnEmptyString: false,
      returnObjects: true,
    })
    console.log(
      color(
        "text",
        `🌠 Successfully loaded ${color(
          "variable",
          i18next.languages.length
        )} locale(s)`
      )
    )
  } catch (ops) {
    console.log(color("error", `🌠 error loading locales`), ops)
  }
}
