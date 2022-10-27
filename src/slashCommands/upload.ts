import { SlashCommand } from "../types";
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalActionRowComponentBuilder,
  SlashCommandBuilder,
  GuildMember,
} from "discord.js";
import { v4 as uuidv4 } from "uuid";
import { usersRestrited } from "../config/config.json";
import { createUser, getPlan, language } from "../functions";
import { prisma } from "../database/prisma";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Upload aplication to server"),
  execute: async (interaction) => {
    if (!interaction.guild?.members.me?.permissions.has(["ManageChannels"]))
      return interaction.reply({
        ephemeral: true,
        content: `I don't have permission to manage channels`,
      });
    let user = (await prisma.users.findFirst({
      where: { id: interaction.member?.user.id },
      select: { applications: true },
    })) as {
      applications: [];
    };
    if (!user) {
      user = await createUser(interaction.member as GuildMember);
    }

    const plan = await getPlan(interaction.member as GuildMember);
    if (user?.applications.length >= plan.maxApplications)
      return interaction.reply({
        ephemeral: true,
        content: `${language(`messages:upload:maxApplications`)}`,
      });
    const modalID = uuidv4();
    const modal = new ModalBuilder()
      .setCustomId(modalID)
      .setTitle(language(`commands:upload:modal:title`));

    const bot =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("botId")
          .setLabel(language(`commands:upload:modal:inputs:1`))
          .setPlaceholder("00000000000000000")
          .setRequired(true)
          .setStyle(TextInputStyle.Short)
      );
    const memory =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("memory")
          .setLabel(language(`commands:upload:modal:inputs:2`))
          .setPlaceholder("512 | 1024 | 2048 | 4096")
          .setRequired(true)
          .setStyle(TextInputStyle.Short)
      );
    const file =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("file")
          .setLabel(language(`commands:upload:modal:inputs:3`))
          .setPlaceholder("main.js | index.js | bot.js")
          .setRequired(true)
          .setStyle(TextInputStyle.Short)
      );
    /*
    const nodeVersion =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("nodeVersion")
          .setLabel(language(`commands:upload:modal:inputs:4`))
          .setPlaceholder(images.map((plan: any) => plan).join(" | "))
          .setRequired(true)
          .setStyle(TextInputStyle.Short)
      )
      */
    modal.addComponents(bot, memory, file);

    await prisma.interactions.create({
      data: {
        customId: modalID,
        createdBy: interaction.member?.user.id,
        extra: JSON.stringify({
          type: "upload",
        }),
      },
    });
    await interaction.showModal(modal);
  },
  cooldown: 10,
};

export default command;
