import Rabbit from "./rabbitMq";
import { connect } from "../database/prisma";
import { receive } from "../api/events";
let rabbit: Rabbit;
export async function services() {
  rabbit = new Rabbit().on("ready", () => {
    rabbit.consume("host:bot", (message: any) => {
      receive(message);
      //console.log(message)
    });
  });
  connect();
}

export { rabbit };
