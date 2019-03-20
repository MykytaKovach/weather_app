const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//paths
const publicPath = path.join(__dirname,'../public')
const templatePath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


const app = express();


//setting handlebars location
app.set('view engine','hbs')
app.set('views',templatePath)
hbs.registerPartials(partialPath)

//setting static folder
app.use(express.static(publicPath))

//setting routes

app.get('/weather',(req,res)=>{
    if(!req.query.adress) return res.send({error:'no adress provided'})
    geoCode(req.query.adress,(error,{long,lat,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(long,lat,(error,{summary,temp,rainProb})=>{
            if(error) return res.send({error})
            res.send({
        
                summary,
                temp,
                rainProb,
                location,
                adress: req.query.adress
            })

        })
    })
    
})

app.get('',(req,res)=>{
    res.render('index',{
        title : 'weather app',
        name:'nikita kovach'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'about',
        name:'nikita kovach'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help',
        message: 'If u have any questions you are free to aks',
        name:"nikita kovach"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('notfound',{
        title:'404:Page not found',
        error:"Help article not found",
        name:"nikita kovach"
    })
   })

app.get('*',(req,res)=>{
 res.render('notfound',{
     title:'404:Page not found',
     error:"Page not found",
     name:"nikita kovach"
 })
})




app.listen(3000, ()=>{
    console.log('server started')
})