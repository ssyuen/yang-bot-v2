require('dotenv').config()
const Discord = require('discord.js');
const util = require('./commands/util/util');
const prefix = process.env.PREFIX;

const client = new Discord.Client();
exports.client = client;


const utilCmds = require('./commands/util/util');
const messageCmds = require('./commands/message/message');
const memberCmds = require('./commands/member/member');
const funCmds = require('./commands/fun/fun');
const cryptoCmds = require('./commands/finance/crypto');
const stockCmds = require('./commands/finance/stock');

// let cmds = 

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.author !== client.user && message.content.substring(0, 1) === `${prefix}`) {
        let command = message.content;
        if (utilCmds.checkValid(command)) {
            switch (command.substring(1)) {
                case 'ping':
                    message.channel.send(utilCmds.ping(message));
                    break;
            }
        }
        else if (cryptoCmds.checkValid(command)) {
            switch (command.substring(1)) {
                case 'crypto':
                    message.channel.send(cryptoCmds.crypto(message));
                    break;
            }
        }
        else {
            message.channel.send('I don\'t know how to do that!')
        }
    }
    else {
        if (message.author !== client.user) {
            message.channel.send(messageCmds.converse(message));
        }

    }

})

client.on('guildMemberAdd', member => {
    memberCmds.join(member);
})

client.on('guildMemberRemove', member => {
    memberCmds.leave(member);
})

client.on('channelPinsUpdate', message => {
    messageCmds.updatePinLog(message);
})

client.on('messageDelete', message => {
    // TODO
})

client.login(process.env['TOKEN']);


