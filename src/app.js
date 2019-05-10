const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const utils = require('./util/utils.js');
const geocode = require('./util/geocode.js');
const forecast = require('./util/forecast.js');

// Setting up express and the static page to serve
const app = express();
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// Setting up view engine as hbs for loading dynamic pages
app.set('view engine', 'hbs');

// Setting up hbs to look for views in the right folder
const templatesDir = path.join(__dirname, '../views/templates/');
app.set('views', templatesDir);

// Setting hbs partials
const partialsDir = path.join(__dirname, '../views/partials/');
hbs.registerPartials(partialsDir);

// Routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Adress must be provided.'
        });
    }
    const address = req.address;
    geocode.getCoordinates(address, (coordinates) => {
        forecast.getForecast(coordinates, (data) => {
            res.send({
                address: address,
                forecast: 'It\'s now ' + data.temperature + ' degrees celcius in ' + address + ', with ' + data.precipProbability + '% chance of rain',
                title: 'Weather',
            });
        });
    });
    // utils.getWeather(req.query.address, res);
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});