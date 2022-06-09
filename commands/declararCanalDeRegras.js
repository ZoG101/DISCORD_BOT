const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const GuildSettings = require('../models/guildSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("regras")
        .setDescription("Declara qual vai ser o canal de regras!")
        .addChannelOption(option => option
            .setName("canal")
            .setDescription("O canal a ser declarado como de regras.")
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
                    rule_channel_id: interaction.options.getChannel("canal").id
                });
            }else{
                settings.rule_channel_id = interaction.options.getChannel("canal").id;
            }

            settings.save(err => {
                if(err){
                    console.log(err);
                    interaction.reply('Ocorre um erro durante a execução deste comando!');
                    return;
                }

                interaction.reply(`O novo canal de regras foi definido para <${interaction.options.getChannel("canal")}>`);
            })
        })
    }
}