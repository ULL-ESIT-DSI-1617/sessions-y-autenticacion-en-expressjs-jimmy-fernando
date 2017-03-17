'use strict'
var
    express = require('express'),
    app = express(),
    port= process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.listen(port, (err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log('Servidor corriendo en el puerto:', port);
})
