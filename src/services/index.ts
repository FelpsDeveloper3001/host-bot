import Rabbit from "./rabbitMq";
import { ping as pingStrapi } from "../api/functions/ping";
import { color } from "../functions";

export async function services() {
  const rabbit = new Rabbit().on("ready", () => {
    rabbit.consume("host:bot", (message: any) => {});
  });
  ping();
}

export async function ping() {
  const a = await pingStrapi();
  if (a == 200) {
    console.log(color("text", `💪 Successfully Strapi connection`));
  } else {
    console.log(color("error", `💪 Error in Strapi connection`));
  }
}
