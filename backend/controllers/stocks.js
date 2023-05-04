const request = require('request');
const cheerio = require('cheerio');
const Stock = require('../models/stock');

exports.getStockData = function (req, res) {
    const symbol = req.params.symbol;
    const url = `https://finance.yahoo.com/quote/${symbol}`;

    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            // Extracting data scraping
            const name = $('h1[class="D(ib) Fz(18px)"]').text();
            const price = $('fin-streamer[class="Fw(b) Fz(36px) Mb(-4px) D(ib)"]').text();
            const open = $('td[data-test="OPEN-value"]').text();
            const previousClose = $('td[data-test="PREV_CLOSE-value"]').text();
            const marketCap = $('td[data-test="MARKET_CAP-value"]').text();
            const dayRange = $('td[data-test="DAYS_RANGE-value"]').text();
            const bid = $('td[data-test="BID-value"]').text();
            const ask = $('td[data-test="BID-value"]').text();
            const volume = $('fin-streamer[data-field="regularMarketVolume"]').attr('value');
            const peRatio = $('td[data-test="PE_RATIO-value"]').text();
            const epsRatio = $('td[data-test="EPS_RATIO-value"]').text();
            const regularMarketPrice = $('fin-streamer[data-field="regularMarketPrice"]').attr('value');
            const postMarketPrice = $('fin-streamer[data-field="regularMarketPrice"]').attr('value');

            // Validating the scraped data
            const validatedPrice = isNaN(parseFloat(price)) ? 0 : parseFloat(price);
            const validatedOpen = isNaN(parseFloat(price)) ? 0 : parseFloat(open);
            const validatedPreviousClose = isNaN(parseFloat(price)) ? 0 : parseFloat(previousClose);
            const validatedMarketCap = isNaN(parseFloat(price)) ? 0 : marketCap;
            const validatedDayRange = isNaN(parseFloat(price)) ? 0 : parseFloat(dayRange);
            const validatedBid = isNaN(parseFloat(price)) ? 0 : bid;
            const validatedAsk = isNaN(parseFloat(price)) ? 0 : ask;
            const validatedVolume = isNaN(parseFloat(price)) ? 0 : volume;
            const validatedPeRatio = isNaN(parseFloat(price)) ? 0 : parseFloat(peRatio);
            const validatedEpsRatio = isNaN(parseFloat(price)) ? 0 : parseFloat(epsRatio);
            const validatedRegularMarketPrice = isNaN(parseFloat(price)) ? 0 : parseFloat(regularMarketPrice);
            const validatedPostMarketPrice = isNaN(parseFloat(price)) ? 0 : parseFloat(postMarketPrice);

            
            const newStock = new Stock({
                symbol: symbol,
                name: name,
                price: validatedPrice,
                open: validatedOpen,
                previousClose: validatedPreviousClose,
                marketCap: validatedMarketCap,
                dayRange: validatedDayRange,
                bid: validatedBid,
                ask: validatedAsk,
                volume: validatedVolume,
                peRatio: validatedPeRatio,
                epsRatio: validatedEpsRatio,
                regularMarketPrice: validatedRegularMarketPrice,
                postMarketPrice: validatedPostMarketPrice,
            });

            newStock.save()
                .then(savedStock => res.json(savedStock))
                .catch(error => res.status(500).json({ error: 'Failed to save stock data.' }));

        } else {
            res.status(500).json({ error: 'Request failed.' });
        }
    });
};
