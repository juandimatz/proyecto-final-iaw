const express = require('express');

const scraper = require('./services/scraperService');

var app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on ' + port);
});