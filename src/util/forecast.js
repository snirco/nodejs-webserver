const geocode = require('./geocode.js');
const utils = require('./utils.js');
const querystring = require('querystring');
const request = require('request');
const darkSkyUrl = 'https://api.darksky.net/forecast/';
const darkSkyToken = '67ba6a3dc6a578e0012f7d60819697aa';

const buildDarkSkyUrl = (coordinates) => {
    const url = darkSkyUrl;
    const token = darkSkyToken;
    coor = coordinates.reverse().join();
    return url + token + '/' + coor + '?' + querystring.stringify({ units: 'si' });
}

const getForecast = (coordinates, callback) => {
    const url = buildDarkSkyUrl(coordinates);
    request({ url: url, json: true, limit: 1 }, (err, res) => {
        if (err) {
            return console.log("Forecast Error: ", err);            
        }
        callback(res.body.currently)
    });

    // geocode.getCoordinates(address, (coordinates) => {
    //     const url = buildDarkSkyUrl(coordinates);
    //     request({ url: url, json: true, limit: 1 }, (err, res) => {
    //         callback(res.body.currently)
    //     });
    // });
}

module.exports = {
    buildDarkSkyUrl: buildDarkSkyUrl,
    getForecast: getForecast
}