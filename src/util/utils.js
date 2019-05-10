const forecast = require('./forecast.js');
const geocode = require('./geocode.js');

const getWeather = (address, res) => {
    geocode.getCoordinates(address, (coordinates) => {
        forecast.getForecast(coordinates, (data) => {
            res.render('index', {
                address: address,
                forecast: 'It\'s now ' + data.temperature + ' degrees celcius in ' + address + ', with ' + data.precipProbability + '% chance of rain',
                title: 'Weather'
            });
        });
    });
}

module.exports = {
    getWeather: getWeather
}

