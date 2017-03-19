'use strict'
var
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    bcrypt = require('bcrypt-nodejs'),
    jsonfile = require('jsonfile'),

    file = "./users.json",

    app = express(),
    port= process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true})); //form params in req.body

//Variable que almacenara el par de nombre de usuario y contraseña.
var hash = bcrypt.hashSync("contraseña");
console.log('contraseña de usuario encriptada: ${hash}');
var users = {
  usuario : hash,
  fer : bcrypt.hashSync("ferpassword"),
  jimmy : bcrypt.hashSync("jimmypassword"),
  amy : bcrypt.hashSync("amyspassword")
};

//Escribimos esta información en el fichero users.json
jsonfile.writeFile(file, users, {spaces: 2}, (err)=>{
  console.error(err);
});

app.use(session({
    secret: '2C44-4D44-WppQ212',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));

//Cuando accedamos a la raíz, nos redireccionará al login.
app.get('/', (req, res)=>{
  res.redirect('/login');
});

app.get('/login',(req,res)=>{
    res.render('index');
});

//Cuando enviemos el formulario, se ejecutará este middleware.
app.post('/login', (req, res)=>{
  if(!req.body.username || !req.body.password){
    console.log('login failed');
    res.send('Login failed');
  } else if(req.body.username in users &&
            bcrypt.compareSync(req.body.password, users[req.body.username])){
              req.session.user = req.body.username;
              req.session.admin = true;
              res.send("Login exitoso! usuario: "+req.session.user);
            }else {
              console.log('login ${util.inspect(req.query)} fallido');
              res.send("No has podido loguear.");
            }
});

//Esta función comprueba que el usuario esté autenticado.
var auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401);
};

//Cuando accedamos a la ruta "/content" y estemos autenticados, podremos leer el libro.
app.use( "/content", [ auth, express.static( __dirname + "/book" ) ] );

//Cuando accedamos a /logout, se nos eliminará la sesion.
app.get('/logout',(req,res) =>{
  req.session.destroy();
  res.send("logout exitoso!");
})

app.listen(port, (err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log('Servidor corriendo en el puerto:', port);
})
