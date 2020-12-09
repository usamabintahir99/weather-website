const foreast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to save
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Usama'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Usama'
    })
})

app.get('/help',(req,res)=>{
    res.render(('help'),{
        msg: 'Help me in learning NodeJs',
        title: 'Help',
        name: 'Usama'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide the address!'
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if (error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    
    res.send({
        products:[] 
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg: 'Help article not found',
        name: 'Usama'
    })})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg: 'Page not found',
        name: 'Usama'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})