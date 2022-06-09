const Discord = require('discord.js');
const GuildSettings = require ('../models/guildSettings');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member){
        //member.guild.channels.cache.get('976194967338905600').send(`${member.user} Entrou no servidor!`);
        const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

        if(!guildSettings && !guildSettings.welcome_channel_id){
            return;
        }

        const canalDeRegras = member.guild.channels.cache.get(guildSettings.rule_channel_id);

        const novoMembroEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Bem-vindo(a)!!!')
            .setDescription(`Olá ${member.user}, seja bem-vindo(a) ao nosso servidor, esperamos que se divirta!!! Por favor, dê uma passadinha no canal de regras: ${canalDeRegras}.`)
            .setImage(member.user.displayAvatarURL())
            .setTimestamp();

            member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
                embeds: [novoMembroEmbed],
            });
    }
}