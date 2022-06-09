const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('conta')
        .setDescription(`Faz uma conta simples com dois números.`)
        .addNumberOption((option) => 
            option 
                .setName('a')
                .setDescription(`Priemiro número.`)
                .setRequired(true)
        )
        .addNumberOption((option) => 
            option 
                .setName('b')
                .setDescription(`Segundo número.`)
                .setRequired(true)
        ),
    async execute(interaction){
        const num1 = interaction.options.getNumber('a')||0;
        const num2 = interaction.options.getNumber('b')||0;
        interaction.reply({
            content:
            `
            A soma é igual a: ${num1 + num2};
            A subtração é igual a: ${num1 - num2};
            A multiplicação é igual a: ${num1 * num2};
            A divisão é igual a: ${num1 / num2};
            O resto da divisão é igual a: ${num1 % num2};
            A potência é igual a: ${num1 ** num2}
            `,
            ephemeral: true,
        });
    }
}