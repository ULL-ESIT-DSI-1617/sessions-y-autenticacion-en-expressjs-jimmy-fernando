'use strict'
var
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),

    users = require('./users.json'),

    app = express(),
    port= process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true})); //form params in req.body
app.use(session({
    secret: '2C44-4D44-WppQ212',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));

//Falta autenticacion
app.use('/book',express.static('book')); //acceder al libro en la ruta /book //gitbook build docs book

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/login',(req,res)=>{
    //Implementar autenticacion y creacion de sesion
});
app.get('/logout',(req,res) =>{
    //Implementar eliminacion de sesion
})

app.listen(port, (err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log('Servidor corriendo en el puerto:', port);
})
