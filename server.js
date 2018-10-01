const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('year',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{ //middelware for checking if next is hit for example need for see if token valid or header
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  })
  next();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    welcomeMessage:'Welcome to my site!',
    title:'Home Page',
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    title:'About Page',
  });
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
