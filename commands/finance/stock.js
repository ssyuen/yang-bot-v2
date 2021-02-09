const fetch = require("node-fetch");
const AV_KEY = process.env.AV_KEY
const PREFIX = process.env.PREFIX
const AV_URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo'
module.exports = {
    'stock': {
        name: 'stock',
        description: 'Returns stock\'s data by ticker name.',
        usage: '<TICKER>',
        execute(message, args) {
            let ticker = args[0].toUpperCase();
            fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${AV_KEY}`)
                .then(data => data.json())
                .then(data => {
                    let stock = data['Global Quote']
                    console.log()
                    if (Object.keys(stock).length === 0) {
                        message.channel.send(`No stock data found for ${ticker}. Make sure you are spelling it right!`)
                    }
                    else {
                        let companyData = `>>> Symbol: **${stock['01. symbol']}**\nPrice: **${stock['05. price']}**\nVolume: **${stock['06. volume']}**\n% Change since Previous Trading Day: **${stock['10. change percent']}**`
                        message.channel.send(companyData);
                    }

                })
                .catch(error => {
                    message.channel.send(`Improper usage: ${PREFIX}${this.name} ${this.usage}`);
                })
        }
    },
    'specific': {
        name: 'specific',
        description: 'Returns in-depth stock\'s data by ticker name.',
        usage: '<TICKER>',
        execute(message, args) {
            let ticker = args[0].toUpperCase();
            fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${AV_KEY}`)
                .then(data => data.json())
                .then(data => {
                    if (Object.keys(data).length !== 0) {
                        message.channel.send(`>>> ${data['Name']} | ${data['Symbol']} | $${(Number(data['BookValue']) * Number(data['PriceToBookRatio'])).toFixed(2)}\nP/E Ratio: ${data['PERatio']}\nPEG Ratio: ${data['PEGRatio']}\nDividend Per Share: ${data['DividendPerShare']}\nEarnings Per Share: ${data['EPS']}\nBeta: ${data['Beta']}\nPrice to Book Ratio: ${data['PriceToBookRatio']}\nMarket Capitalization: ${data['MarketCapitalization']}\n52 Week High: $${data['52WeekHigh']}\n52 Week Low: $${data['52WeekLow']}`)
                    }
                })
                .catch(error => {
                    message.channel.send(`Improper usage: ${PREFIX}${this.name} ${this.usage}`);
                })
        }
    }
}