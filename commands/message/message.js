const prefix = process.env.PREFIX;

module.exports = {
    converse: function (message) {
        let fmtMsg = message.content.toLowerCase();

        if(fmtMsg.search('brother') !== -1) {
            return 'Sounds like something Sam would say...'
        }
        else if(fmtMsg.search('happy birthday') !== -1) {
            return `Happy Birthday! 🎈🎉 to ${message.author} from ${process.env.NAME}`
        }
        else if(fmtMsg.search('thanks') !== -1) {
            return `❤. Anytime ${message.author}.`
        }

    }

}
