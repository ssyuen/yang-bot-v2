const { Message, User } = require("discord.js");
const { client } = require('../../index')
const prefix = process.env.PREFIX;


module.exports = {
    'converse': {
        name: 'converse',
        description: 'Talk with Yang!',
        execute(message) {
            let fmtMsg = message.content.toLowerCase();

            if (fmtMsg.search('brother') !== -1) {
                message.channel.send('Sounds like something Sam would say...');
            }
            else if (fmtMsg.search('happy birthday') !== -1) {
                message.channel.send(`Happy Birthday! 🎈🎉 to ${message.author} from ${process.env.NAME}`);
            }
            else if (fmtMsg.includes('thanks') && fmtMsg.includes('yang')) {
                message.channel.send(`❤. Anytime ${message.author}.`);
            }
            else if (message.isMemberMentioned(client.user)) {
                message.channel.send('You mentioned?');
            }
        }
    },
}
