require('dotenv').config()
const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})
const Player = require('./models/Player')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a Track of the Week Event!')
    .addUserOption((option) => option.setName('mapName').setDescription('Enter the map name for the event.').setRequired(true))
    .addUserOption((option) => option.setName('mapAuthor').setDescription("Enter the map author's name.").setRequired(true))
    .addUserOption((option) => option.setName('eventInfo').setDescription('Additional info for the event.').setRequired(true))
    .addUserOption((option) =>
      option.setName('eventDate').setDescription('Enter the map name for the event! MM/DD/YYYY').setRequired(true)
    ),
  async execute(interaction) {
    const player = await Player.findOne({ discordId: interaction.user.id })
    if (player.role !== 'admin') {
      interaction.reply({ content: 'You do not have permission to create events', ephemeral: true })
      return
    }

    const dataStr = interaction.options.getUser('eventDate').id
    const dataArr = dataStr.split('/')
    const data = new Date(dataArr[2], dataArr[0] - 1, dataArr[1])
    if (data < Date.now()) {
      interaction.reply({ content: 'Event date cannot be in the past', ephemeral: true })
      return
    }

    const newEvent = new Event({
      mapName: interaction.options.getUser('mapName').id,
      eventDate: data,
      eventInfo: interaction.options.getUser('eventInfo').id,
    })
    await newEvent.save()

    interaction.reply({ content: 'Successfully created event', ephemeral: true })
  },
}
