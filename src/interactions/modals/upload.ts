import {
  Interaction,
  ChannelType,
  EmbedBuilder,
  GuildMember,
} from "discord.js";
import { client } from "../../";
import { categoryUpload } from "../../config/config.json";
import { prisma } from "../../database/prisma";
import { createUser, getPlan, language } from "../../functions";
import { rabbit } from "../../services/index";

export default class UploadInteraction {
  constructor() {}
  async execute(interaction: Interaction) {
    try {
      if (interaction.isModalSubmit()) {
        const botId = interaction.fields.getTextInputValue("botId");
        const memory = interaction.fields.getTextInputValue("memory");
        const file = interaction.fields.getTextInputValue("file");
        let botVerify: any;
        //const nodeVersion =
        //interaction.fields.getTextInputValue("nodeVersion")

        await interaction.guild?.channels.fetch();

        if (isNaN(parseInt(memory)))
          return interaction.reply({
            ephemeral: true,
            content: `${language(`messages:upload:memoryFormatError`)}`,
          });

        let user = await prisma.users.findFirst({
          where: { id: interaction.member?.user.id },
        });
        if (!user) {
          user = await createUser(interaction.member as GuildMember);
        }
        const plan = user?.plan as any;
        const node = await getPlan(interaction.member as GuildMember);
        if (interaction.guild?.channels.cache.get(user?.thread as string))
          return interaction.reply({
            ephemeral: true,
            content: `${language(`messages:upload:channelAlreadyCreated`)}`,
          });

        try {
          botVerify = await client.users.fetch(botId);
        } catch (ops) {
          return interaction.reply({
            ephemeral: true,
            content: `${language(`messages:upload:invalidBot`)}`,
          });
        }
        const applications = await prisma.applications.findFirst({
          where: { id: botVerify.id },
        });
        if (applications)
          return interaction.reply({
            ephemeral: true,
            content: `${language(`messages:upload:botAlreadyRegistered`)}`,
          });

        await interaction.reply({
          ephemeral: true,
          content: `${language(`messages:upload:channelUploadCreate`)}`,
        });
        const channel = await interaction.guild?.channels.create({
          name: `upload-${interaction.member?.user.username}`,
          type: ChannelType.GuildText,
          parent: categoryUpload,
          reason: "Canal criado para realização de upload de aplicação",
          position: 1,
          permissionOverwrites: [
            {
              id: interaction.member?.user.id as string,
              allow: [
                "AttachFiles",
                "ViewChannel",
                "ReadMessageHistory",
                "SendMessages",
              ],
            },
          ],
        });
        await prisma.users.update({
          where: {
            uuid: user?.uuid,
          },
          data: {
            thread: channel?.id as string,
          },
        });

        const embed = new EmbedBuilder()
          .setTitle(language(`commands:upload:message:title`))
          .setColor("Blue")
          .setThumbnail(botVerify.displayAvatarURL())
          .addFields([
            {
              name: language(`commands:upload:message:fields:1`),
              value: `**${botVerify.username} / ${botVerify.id}**`,
            },
            {
              name: language(`commands:upload:message:fields:2`),
              value: `**${memory} MB**`,
              inline: true,
            },
            {
              name: language(`commands:upload:message:fields:4`),
              value: `**${plan.name}**`,
              inline: true,
            },
          ]);

        const msgId = await channel?.send({
          content: `${interaction.member}`,
          embeds: [embed],
        });
        channel
          ?.send({ content: language(`commands:upload:message:message`) })
          .then(async (msg) => {
            const filter = (user: any) => {
              return user.author.id === interaction.member?.user.id;
            };
            channel
              .awaitMessages({ filter, max: 1, time: 30000 })
              .then(async (collected) => {
                const attachment = collected.first()?.attachments;
                if (!attachment) {
                  return console.log(".zip not informed");
                }
                const zip = attachment.map((att) => att)[0];

                const bot = await prisma.applications.create({
                  data: {
                    id: botVerify.id,
                    avatar: botVerify.displayAvatarURL(),
                    lang: "Javascript",
                    type: "paid",
                    tag: botVerify.tag,
                    ram: parseInt(memory),
                    node: node.node,
                    user: {
                      connect: {
                        uuid: user?.uuid,
                      },
                    },
                  },
                });
                console.log("bot", bot);
                if (bot) {
                  rabbit.send("host:node", node.node, {
                    type: "upload",
                    proxy: zip.proxyURL,
                    size: zip.size,
                    memory,
                    image: "node:16",
                    main: file,
                    messageId: msgId?.id,
                    channelId: channel.id,
                  });
                }
              })
              .catch((collected) => {});
          });
      }
    } catch (err) {
      console.log("catch", err);
    }
  }
}
