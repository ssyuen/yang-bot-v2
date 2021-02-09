const prefix = process.env.PREFIX;

module.exports = {
    checkValid: function(message) {
        switch(message) {
            case `${prefix}ping`:
                return true;
        }
    },
    ping: function(message) {
        let ping = Date.now() - message.createdTimestamp + ' ms';
        return "Your ping is " + `${ping}`;

    },

    wiki: function(message) {
        let response =  fetch('https://en.wikipedia.org/wiki/' + message.content);
        
    }

}
