const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define path for Express config
const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup HandleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicFolder))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ajeenckya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ajeenckya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ajeenckya',
        message: 'This is help message'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please send address'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error
            })
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error: error
                })
            }     

            res.send({
                'forecast': forecastData,
                'location': location,
                'address': address
            })
        })
    })

   
})

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: 'Help Page',
        name: 'This is a Help Page',
        error: 'Help article not found'
    })
})

app.get('/*', (request, response) => {
    response.render('404', {
        title: '404 Page',
        name: 'This is a 404 Page',
        error: 'Page not found'
    })
})

app.get('*', (req, res) => {
    res.send('404 page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})