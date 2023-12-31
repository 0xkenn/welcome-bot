const { Client } = require('discord.js');
const { CommandKit } = require('commandkit');
const mongoose = require('mongoose');
require('dotenv/config');

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

new CommandKit({
    client,
    commandsPath: `${__dirname}/commands`,
    eventsPath: `${__dirname}/events`,
    devGuildIds: ['1186961265642442772'],
    devUserIds: ['1131343663138623648'],
    bulkRegister: true,
});
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to Database');
    client.login(process.env.TOKEN);

});

