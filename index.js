require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js');
const util = require('./commands/util/util');
const prefix = process.env.PREFIX;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandDir = fs.readdirSync('./commands')

exports.client = client;


for (const dir of commandDir) {
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        for (indCommand of Object.keys(command)) {
            client.commands.set(command[indCommand].name, command[indCommand]);
        }

    }

}


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.author !== client.user && message.content.substring(0, 1) === `${prefix}`) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandIdent = args.shift().toLowerCase();

        if (client.commands.has(commandIdent)) {
            const command = client.commands.get(commandIdent);
            try {
                command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('There was an error trying to execute that command!');
            }
        }
        

    }
    else {
        if (message.author !== client.user) {
            const command = client.commands.get('converse');
            try {
                command.execute(message)
            } catch (error) {
                console.error(error);
                message.reply('There was an error trying to talk!');
            }
        }
    }

})

// client.on('guildMemberAdd', member => {
//     memberCmds.join(member);
// })

// client.on('guildMemberRemove', member => {
//     memberCmds.leave(member);
// })

// client.on('channelPinsUpdate', message => {
//     messageCmds.updatePinLog(message);
// })

// client.on('messageDelete', message => {
//     // TODO
// })

client.login(process.env['TOKEN']);


