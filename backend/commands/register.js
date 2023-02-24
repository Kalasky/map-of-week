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
  data: new SlashCommandBuilder().setName('register').setDescription('Initialize your account to participate in future events!'),
  async execute(interaction) {
    const player = await Player.findOne({ discordId: interaction.user.id })

    if (player) {
      interaction.reply({ content: 'You are already registered!', ephemeral: true })
    } else {
      const newPlayer = new Player({
        discordId: interaction.user.id,
      })
      await newPlayer.save()
      interaction.reply({ content: 'You have been registered!', ephemeral: true })
    }
  },
}
