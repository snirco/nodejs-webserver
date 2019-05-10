const querystring = require('querystring');
const request = require('request');
const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapBoxToken = 'pk.eyJ1Ijoic25pcmNvIiwiYSI6ImNqdXAzM2tzajFkdHg0Y284eXphd29wN2kifQ.vtBBxn9R6X37rylIoyP7-w';

const buildMapBoxUrl = (address) => {
    const url = mapBoxUrl;
    const token = mapBoxToken;
    return url + address + '.json?' + querystring.stringify({ access_token: token });
}

const getCoordinates = (address, callback) => {
    const url = buildMapBoxUrl(address);
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            return console.log("GeoCode Error: ", err);            
        } else {
            if (res.body.features.length > 0) {
                callback(res.body.features[0].center);
            } else {
                return console.log('no results found');
            }
        }
    })
}

module.exports = {
    buildMapBoxUrl: buildMapBoxUrl,
    getCoordinates: getCoordinates
}