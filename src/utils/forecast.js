const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0628ba3fe138bca913c03057bd3f259e/' + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' +
                    'There is a ' + body.currently.precipProbability + '% chance of rain. ' + 
                    'Current wind speed is ' + body.currently.windSpeed + '.')
        }
    })
}


module.exports = forecast