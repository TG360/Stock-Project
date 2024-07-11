/* eslint-disable no-undef */
// server.js

const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const request = require('request');
require('dotenv').config();

app.use(cors());

const defaultDate = new Date();
const defaultStartDate = `${defaultDate.getFullYear() - 5}-${defaultDate.getMonth() + 1}-${defaultDate.getDate()}`;

const fetchStockData = (symbol, startDate = defaultStartDate, interval = '1day') => {
    console.log('Fetching stock data for:', symbol, startDate);
    return new Promise((resolve, reject) => {
        const options = {
            "method": "GET",
            "hostname": "api.twelvedata.com",
            "path": `/time_series?symbol=${symbol}&start_date=${startDate}%2000:00:00&interval=${interval}&apikey=07b67fd520c444b1923d535211aa4bed`,
            "port": null,
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(JSON.parse(body.toString()));
            });
        });

        req.on("error", function (error) {
            reject(error);
        });

        req.end();
    });
};

const fetchNewsData = (symbol) => {
    return new Promise((resolve, reject) => {
        const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&limit=20&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
                reject(err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
                reject(new Error(`Status code: ${res.statusCode}`));
            } else {
                resolve(data);
            }
        });
    });
};

app.get('/news/:symbol', async (req, res) => {
    const { symbol } = req.params;

    if (!symbol) {
        return res.status(400).json({ error: 'Stock symbol is required' });
    }

    try {
        const data = await fetchNewsData(symbol);
        res.json(data);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/stock/:symbol', async (req, res) => {
    const { symbol } = req.params;

    if (!symbol) {
        return res.status(400).json({ error: 'Stock symbol is required' });
    }

    try {
        const data = await fetchStockData(symbol, defaultStartDate);
        res.json(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
