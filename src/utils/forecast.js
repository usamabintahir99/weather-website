const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=minutely,hourly,alerts&units=metric&appid=101b5ba5d7ca9e29542a02ddb708d804'

    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.cod){
            callback('Unable to find location',undefined)
        }
        else{
            console.log(body.daily[0])
            callback(undefined, 'Its '+ body.current.temp + ' degrees currently. '+'Maximum Temperature is '+body.daily[0].temp.max+ ' degrees. '+'Minimum Temperature is '+body.daily[0].temp.min+ ' degrees. '+'Description: ' + body.daily[0].weather[0].description)
        }
    }
)

}

module.exports = forecast