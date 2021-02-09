const message = require("../message/message");

const prefix = process.env.PREFIX;
const AV_KEY = process.env.AV_KEY

let cryptoCurr = ""
let realCurr = ""
const AV_URL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptoCurr}&to_currency=${realCurr}&apikey=${AV_KEY}`

module.exports = {
    checkValid: function(message) {
        let fmtMsg = message.content.split(" ")[0];
        switch(fmtMsg) {
            case `${prefix}crypto`:
                return true;
        }
    },
    crypto: message => {
        let fmtMsg = message.content.split(" ");
        cryptoCurr = fmtMsg[1].toUpperCase();
        realCurr = fmtMsg[2].toUpperCase();
        let response = fetch(AV_URL, {
            method: 'GET'
        }).then(data => data.json()).then(data => {
            let response = data
            let askPrice = response['9. Ask Price']
            let exchangeRate = response['5. Exchange Rate']
            let realCurrName = response['4. To_Currency Name']
            return `1 ${cryptoCurr} is exchanging for ${exchangeRate} ${realCurrName}.`
        })
        return response;
    }

}