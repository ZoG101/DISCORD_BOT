require('dotenv').config();
const fs = require('fs');
const Database = require ('./config/database');

const db = new Database();

db.connect();

const { Client, Intents, Collection } = require('discord.js');


const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ]
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [];

client.commands = new Collection();

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(const file of eventFiles){
    const event = require(`./events/${file}`);

    if(event.once){
        client.once(event.name, (...args) => event.execute(...args, commands));
    }else{
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}

client.on('messageCreate', (message) => {
    if(message.content === 'ping'){
        message.reply({
            content: 'Como assim?! Tô lotada de trabalho e você quer jogar?!',
            ephemeral: true,
        });
    }
});

client.login(process.env.TOKEN);