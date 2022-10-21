import { Interaction, ChannelType } from "discord.js"
import { client } from "../../"
import { getImages, getPlans } from "../../api/functions/system"
import { mode, categoryUpload } from "../../config/config.json"
import { prisma } from "../../database/prisma"
import { language } from "../../functions"

export default class UploadInteraction {
  constructor() {}
  async execute(interaction: Interaction) {
    try {
      if (interaction.isModalSubmit()) {
        if (mode == "public") {
          const botId = interaction.fields.getTextInputValue("botId")
          const memory = interaction.fields.getTextInputValue("memory")
          const file = interaction.fields.getTextInputValue("file")
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

          let botVerify
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
          interaction.reply({
            ephemeral: true,
            content: `${language(`messages:upload:channelUploadCreate`)}`,
          })
        }
      }
    } catch (err) {
      console.log("catch", err)
    }
  }
}

async function wait(timer: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(true)
    }, timer)
  })
}
