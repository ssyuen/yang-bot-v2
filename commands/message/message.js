const { Message, User } = require("discord.js");
const { client } = require('../../index')
const prefix = process.env.PREFIX;


module.exports = {

    converse: message => {
        let fmtMsg = message.content.toLowerCase();
        
        if (fmtMsg.search('brother') !== -1) {
            return 'Sounds like something Sam would say...';
        }
        else if (fmtMsg.search('happy birthday') !== -1) {
            return `Happy Birthday! 🎈🎉 to ${message.author} from ${process.env.NAME}`;
        }
        else if (fmtMsg.search('thanks') !== -1) {
            return `❤. Anytime ${message.author}.`;
        }
        else if (message.mentions.has(client.user)) {
            return 'You mentioned?'
        }
    },
    updatePinLog: message => {
        
        console.log(message)
        if (message.name !== '4560') return
        let pinMsg = message.fetchMessage(message.lastMessageID);

        const channel = message.author.guild.channels.cache.find(ch => ch.name === 'edu-pins');

        channel.send(content)
    }
}
