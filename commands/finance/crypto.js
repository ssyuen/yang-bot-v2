const fetch = require("node-fetch");
const AV_KEY = process.env.AV_KEY
const PREFIX = process.env.PREFIX


module.exports = {
    'crypto': {
        name: 'crypto',
        description: 'Returns value of a cryptocurrency in any real world currency.',
        usage: '<CRYPTOCURRENCY> <REALWORLDCURRENCY>',
        execute(message, args) {
            let cryptoCurr = args[0].toUpperCase();
            let realCurr = 'USD'
            if (args.length === 2) {
                realCurr = args[1].toUpperCase();
            }
            

            fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptoCurr}&to_currency=${realCurr}&apikey=${AV_KEY}`)
                .then(data => data.json())
                .then(data => {

                    let askPrice = data['Realtime Currency Exchange Rate']['9. Ask Price']
                    let exchangeRate = data['Realtime Currency Exchange Rate']['5. Exchange Rate']
                    let realCurrName = data['Realtime Currency Exchange Rate']['4. To_Currency Name']
                    message.channel.send(`1 ${cryptoCurr} is exchanging for **${exchangeRate}** ${realCurrName}.`)
                }).catch(error => {
                    message.channel.send(`Improper usage: ${PREFIX}${this.name} ${this.usage}`);
                })
        }
    },
    'rating':{
        name: 'rating',
        description: 'Returns value of a cryptocurrency in any real world currency.',
        usage: '<CRYPTOCURRENCY> <REALWORLDCURRENCY>',
        execute(message, args) {
            cryptoCurr = args[0].toUpperCase();
            realCurr = args[1].toUpperCase();

            fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptoCurr}&to_currency=${realCurr}&apikey=${AV_KEY}`)
                .then(data => data.json())
                .then(data => {

                    let askPrice = data['Realtime Currency Exchange Rate']['9. Ask Price']
                    let exchangeRate = data['Realtime Currency Exchange Rate']['5. Exchange Rate']
                    let realCurrName = data['Realtime Currency Exchange Rate']['4. To_Currency Name']
                    message.channel.send(`1 ${cryptoCurr} is exchanging for ${exchangeRate} ${realCurrName}.`)
                })
        }
    },

}