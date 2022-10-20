import { Client, GatewayIntentBits, Collection } from "discord.js";
import { services } from "./services";

const { Guilds, MessageContent, GuildMessages, GuildMembers, DirectMessages } =
  GatewayIntentBits;
const client = new Client({
  intents: [
    Guilds,
    MessageContent,
    GuildMessages,
    GuildMembers,
    DirectMessages,
  ],
});
import { Command, SlashCommand } from "./types";
import { readdirSync } from "fs";
import { join } from "path";
import { token } from "./config/config.json";

client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, "./handlers");
readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});
services();

client.login(token);
