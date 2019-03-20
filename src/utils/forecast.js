const request = require('request')
const geoCode = require('./geocode')

const forecast = ( lat, long,callback)=>{
    const url = `https://api.darksky.net/forecast/dafd6bfdd3a241c4c7ee30b51f1900b0/${lat},${long}?lang=uk&units=si`
    const json = true
request({ url,json},(error , {body})=>{
    if(error){
        callback('unable to connect to weather service',undefined)
    } else if(body.error) {
        callback(body.error,undefined)
    } else {
        callback(undefined,{
            summary: body.daily.data[0].summary,
            temp: body.currently.temperature,
            rainProb: body.currently.precipProbability
        })
    
}})
}


module.exports = forecast