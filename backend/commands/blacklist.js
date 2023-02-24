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
    .setName('blacklist')
    .setDescription('Blacklist a player from participating in future events.')
    .addUserOption((option) => option.setName('user').setDescription('The user to blacklist').setRequired(true)),
  async execute(interaction) {
    const player = await Player.findOne({ discordId: interaction.user.id })

    if (player) {
      if (player.blacklisted) {
        interaction.reply({ content: 'That player is already blacklisted', ephemeral: true })
      } else {
        player.blacklisted = true
        await player.save()
        interaction.reply({ content: 'Successfully blacklisted', ephemeral: true })
      }
    }
  },
}
