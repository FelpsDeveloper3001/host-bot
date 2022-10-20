import amqplib, { connect } from "amqplib";
import { rabbit_url } from "../config/config.json";

import { EventEmitter } from "events";
import { color } from "../functions";

// variables temporary

let channel: amqplib.Channel;

export default class RabbitMq extends EventEmitter {
  constructor() {
    super();
    this.connect();
  }

  private async connect() {
    await connect(rabbit_url)
      .then(async (connection) => {
        channel = await connection.createChannel().then((channel) => {
          console.log(color("text", `💪 Successfully connection RabbitMQ`));
          return channel;
        });
        await channel.assertQueue(`host:bot`, {
          durable: true,
        });

        await channel.assertExchange("host:bot", "direct", {
          durable: true,
        });
        await channel.bindQueue(
          `host:bot`, // queue
          "host:bot", // key
          "host:bot" //exchange
        );

        this.emit("ready");
      })
      .catch((err) => {
        console.log(color("error", `💪 Error connection RabbitMQ`), err);
      });
  }

  public async send(queue: string, key: string, message: Object) {
    channel.publish(queue, key, Buffer.from(JSON.stringify(message)));
  }
  public async consume(queue: string, callback: (message: string) => void) {
    await channel.consume(queue, (msg) => {
      if (msg !== null) {
        channel.ack(msg);
        callback(JSON.parse(msg.content.toString()));
      }
    });
  }
}
