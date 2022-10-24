import { Interaction, ChannelType, EmbedBuilder, GuildMember } from "discord.js"
import { client } from "../../"
import { createBot, getBot } from "../../api/functions/bots"
import { getImages, getPlans } from "../../api/functions/system"
import { mode, categoryUpload } from "../../config/config.json"
import { prisma } from "../../database/prisma"
import { getPlan, language } from "../../functions"
import { rabbit } from "../../services/index"

export default class UploadInteraction {
  constructor() {}
  async execute(interaction: Interaction) {
    try {
      if (interaction.isModalSubmit()) {
        if (mode == "public") {
          const plan = await getPlan(interaction.member as GuildMember)
          const botId = interaction.fields.getTextInputValue("botId")
          const memory = interaction.fields.getTextInputValue("memory")
          const file = interaction.fields.getTextInputValue("file")
          let botVerify: any
          const nodeVersion =
            interaction.fields.getTextInputValue("nodeVersion")
          const images = await getImages()
          if (!images.find((image) => image == nodeVersion)) {
            await prisma.interactions.delete({
              where: { customId: interaction.customId },
            })
            return interaction.reply({
              ephemeral: true,
              content: `${language(`messages:upload:invalidImage`)}`,
            })
          }
          await interaction.guild?.channels.fetch()

          if (isNaN(parseInt(memory)))
            return interaction.reply({
              ephemeral: true,
              content: `${language(`messages:upload:memoryFormatError`)}`,
            })
          const userChannel = await prisma.interactions.findMany({
            where: {
              createdBy: interaction.member?.user.id,
            },
          })
          const verifyChannel = async () => {
            return new Promise((res) => {
              userChannel.map(async (interactions) => {
                const channel = interaction.guild?.channels.cache.get(
                  interactions.channelId as string
                )

                if (channel) {
                  res(true)
                } else res(false)
              })
            })
          }
          const verify = await verifyChannel()
          if (verify) {
            await prisma.interactions.delete({
              where: { customId: interaction.customId },
            })
            return interaction.reply({
              ephemeral: true,
              content: `${language(`messages:upload:channelAlreadyCreated`)}`,
            })
          }
          try {
            botVerify = await client.users.fetch(botId)
          } catch (ops) {
            return interaction.reply({
              ephemeral: true,
              content: `${language(`messages:upload:invalidBot`)}`,
            })
          }
          const strapiBot = await getBot(botVerify.id)
          if (strapiBot) {
            return interaction.reply({
              ephemeral: true,
              content: `${language(`messages:upload:botAlreadyRegistered`)}`,
            })
          }

          await interaction.reply({
            ephemeral: true,
            content: `${language(`messages:upload:channelUploadCreate`)}`,
          })
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
          })
          await prisma.interactions.update({
            where: {
              customId: interaction.customId,
            },
            data: {
              channelId: channel?.id as string,
            },
          })

          const embed = new EmbedBuilder()
            .setTitle(language(`commands:upload:modal:title`))
            .setColor("Blue")
            .setThumbnail(botVerify.displayAvatarURL())
            .addFields([
              {
                name: language(`commands:upload:modal:fields:1`),
                value: `**${botVerify.username} / ${botVerify.id}**`,
              },
              {
                name: language(`commands:upload:modal:fields:2`),
                value: `**${memory} MB**`,
                inline: true,
              },
              {
                name: language(`commands:upload:modal:fields:3`),
                value: `**${nodeVersion}**`,
                inline: true,
              },
              {
                name: language(`commands:upload:modal:fields:4`),
                value: `**${plan.name}**`,
                inline: true,
              },
            ])

          const msgId = await channel?.send({
            content: `${interaction.member}`,
            embeds: [embed],
          })
          channel
            ?.send({ content: language(`commands:upload:modal:message`) })
            .then(async (msg) => {
              const filter = (user: any) => {
                return user.author.id === interaction.member?.user.id
              }
              channel
                .awaitMessages({ filter, max: 1, time: 30000 })
                .then(async (collected) => {
                  const attachment = collected.first()?.attachments
                  if (!attachment) {
                    return console.log(".zip not informed")
                  }
                  const zip = attachment.map((att) => att)[0]

                  const bot = await createBot({
                    bot_id: botVerify.id,
                    bot_name: botVerify.username,
                    client_id: interaction.member?.user.id as string,
                    client_name: interaction.member?.user.username as string,
                    online: false,
                    plan: plan.name,
                  })
                  console.log("bot", bot)
                  if (bot) {
                    rabbit.send("host:node", plan.node, {
                      type: "upload",
                      mode,
                      proxy: zip.proxyURL,
                      size: zip.size,
                      memory,
                      image: nodeVersion,
                      main: file,
                      messageId: msgId?.id,
                      channelId: channel.id,
                    })
                  }
                })
                .catch((collected) => {})
            })
        }
      }
    } catch (err) {
      console.log("catch", err)
    }
  }
}
