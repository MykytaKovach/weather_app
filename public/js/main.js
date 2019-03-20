
// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })
// `${data.summary} . temperature is ${data.temp} celcium and with a ${data.rainProb * 100} % of rain.`
document.addEventListener('DOMContentLoaded',(e)=>{
    const location = document.querySelector('#location')
    const forecast = document.querySelector('#forecast')
    const form=document.querySelector('form')
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        location.innerHTML="Loading"
        forecast.innerHTML= ""
        fetch(`/weather?adress=${document.querySelector('input').value}`).then((res)=>{
        res.json().then((data)=>{
            
            if (data.error) {
                location.innerHTML=data.error
                return forecast.innerHTML=""
            } 
            location.innerHTML=data.location
            forecast.innerHTML= `${data.summary} . temperature is ${data.temp} celcium and with a ${Math.floor( data.rainProb * 100)} % of rain.`

            
        })
    })
    })
})

