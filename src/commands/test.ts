import { PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

const command: Command = {
  name: "test",
  execute: (message, args) => {
    message.channel.send({ content: " testes" });
  },
  cooldown: 10,
  aliases: ["t"],
  permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers], // to test
};

export default command;
