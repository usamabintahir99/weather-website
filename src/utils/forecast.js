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
            callback(undefined, "Temerature: "+ body.current.temp + ' degrees' + '<br>'+'Maximum Temperature: '+body.daily[0].temp.max+ ' degrees'+'<br>'+'Minimum Temperature: '+body.daily[0].temp.min+ ' degrees'+"<br>"+"Description: " + body.daily[0].weather[0].description)
        }
    }
)

}

module.exports = forecast