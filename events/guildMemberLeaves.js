const GuildSettings = require ('../models/guildSettings');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member){
        const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

        if(!guildSettings && !guildSettings.welcome_channel_id){
            return;
        }

        member.guild.channels.cache.get(guildSettings.welcome_channel_id).send(`${member.user} teve que dar uma volta...`);
    }
}