const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const GuildSettings = require('../models/guildSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("boasvindas")
        .setDescription("Declara qual vai ser o canal de boas-vindas!")
        .addChannelOption(option => option
            .setName("canal")
            .setDescription("O canal a ser declarado como de boas-vindas.")
            .setRequired(true)
            ),
    async execute(interaction){
        if(!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])){
            interaction.reply('Você não tem permissão para utilizar este comando!');
            return;
        }

        GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
            if (err){
                console.log(err);
                interaction.reply('Ocorre um erro durante a execução deste comando!');
                return;
            }

            if(!settings){
                settings = new GuildSettings({
                    guild_id: interaction.guild.id,
                    welcome_channel_id: interaction.options.getChannel("canal").id
                });
            }else{
                settings.welcome_channel_id = interaction.options.getChannel("canal").id;
            }

            settings.save(err => {
                if(err){
                    console.log(err);
                    interaction.reply('Ocorre um erro durante a execução deste comando!');
                    return;
                }

                interaction.reply(`O novo canal de boas-vindas foi definido para <${interaction.options.getChannel("canal")}>`);
            })
        })
    }
}