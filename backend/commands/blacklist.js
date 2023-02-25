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
    .addUserOption((option) => option.setName('discordId').setDescription("The user's discord id").setRequired(true)),
  async execute(interaction) {
    // only admin can blacklist
    const player = await Player.findOne({ discordId: interaction.user.id })
    if (player.role !== 'admin') {
      interaction.reply({ content: 'You do not have permission to blacklist players', ephemeral: true })
      return
    }
    // check if user is already blacklisted
    const blacklistedPlayer = await Player.findOne({ discordId: interaction.options.getUser('discordId').id })
    if (blacklistedPlayer.blacklisted) {
      interaction.reply({ content: 'That player is already blacklisted', ephemeral: true })
      return
    }
    // blacklist user
    blacklistedPlayer.blacklisted = true
    await blacklistedPlayer.save()
    interaction.reply({ content: 'Successfully blacklisted', ephemeral: true })
  },
}
