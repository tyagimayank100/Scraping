const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
        default: null
    },
    previousClose: {
        type: Number,
        default: null
    },
    open: {
        type: Number,
        default: null
    },
    marketCap: {
        type: String,
        default: null
    },
    volume: {
        type: String,
        default: null
    },
    bid: {
        type: String,
        default: null
    },
    ask: {
        type: String,
        default: null
    },
    dayRange: {
        type: Number,
        default: null
    },
    peRatio: {
        type: Number,
        default: null
    },
    epsRatio: {
        type: Number,
        default: null
    },
    regularMarketPrice: {
        type: Number,
        default: null
    },
    postMarketPrice: {
        type: Number,
        default: null
    },
});


module.exports = mongoose.model('Stock', StockSchema);
