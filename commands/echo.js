const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription(`Dá echo '_'`)
        .addStringOption((option) => 
            option
                .setName("mensagem")
                .setDescription(`A mensagem do echo '_'`)
                .setRequired(true)
        ),
    async execute(interaction){
        interaction.reply({
            content: interaction.options.getString("mensagem"),
            ephemeral: true,
        });
    }
}