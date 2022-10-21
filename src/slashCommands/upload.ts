import { SlashCommand } from "../types"
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalActionRowComponentBuilder,
  SlashCommandBuilder,
  GuildMember,
} from "discord.js"
import { v4 as uuidv4 } from "uuid"
import { mode } from "../config/config.json"
import { language } from "../functions"
import { prisma } from "../database/prisma"
import { getImages, getPlans } from "../api/functions/system"

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Upload aplication to server"),
  execute: async (interaction) => {
    if (!interaction.guild?.members.me?.permissions.has(["ManageChannels"]))
      return interaction.reply({
        ephemeral: true,
        content: `I don't have permission to manage channels`,
      })

    const modalID = uuidv4()
    const modal = new ModalBuilder()
      .setCustomId(modalID)
      .setTitle(language(`commands:upload:mode:${mode}:title`))
    if (mode == "individual") {
      const plans = await getPlans()
      const client =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("clientId")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:1`))
            .setPlaceholder("00000000000000000")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      const bot =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("botId")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:2`))
            .setPlaceholder("00000000000000000")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      const plan =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("plan")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:3`))
            .setPlaceholder(plans.map((plan: any) => plan.name).join(" | "))
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      const venc =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("venc")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:4`))
            .setPlaceholder("3d | 7d | 15d | 30d | 90d")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      const node =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("node")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:5`))
            .setPlaceholder("Atlas | Pandora | Auto")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      modal.addComponents(client, bot, plan, venc, node)
    } else {
      const images = await getImages()
      const bot =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("botId")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:1`))
            .setPlaceholder("00000000000000000")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      const memory =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("memory")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:2`))
            .setPlaceholder("512 | 1024 | 2048 | 4096")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      const file =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("file")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:3`))
            .setPlaceholder("main.js | index.js | bot.js")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      const nodeVersion =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("nodeVersion")
            .setLabel(language(`commands:upload:mode:${mode}:inputs:4`))
            .setPlaceholder(images.map((plan: any) => plan).join(" | "))
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      modal.addComponents(bot, memory, file, nodeVersion)
    }
    await prisma.interactions.create({
      data: {
        customId: modalID,
        createdBy: interaction.member?.user.id,
        extra: JSON.stringify({
          type: "upload",
        }),
      },
    })
    await interaction.showModal(modal)
  },
  cooldown: 10,
}

export default command
