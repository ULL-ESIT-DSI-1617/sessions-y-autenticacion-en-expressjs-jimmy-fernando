#!/usr/bin/env node
'use strict'
var
    fs = require('fs'),
    bcrypt = require('bcrypt-nodejs');

var users,
    newUser = process.argv[2],
    password = process.argv[3],
    file = __dirname + '/../users.json';

if (newUser && password){
    // password = bcrypt.hashSync(password); //Para guardar las contraseña encriptadas
    fs.readFile(file,'utf8',(err,data)=>{
        if (err){
            if ( err.code === "ENOENT"){
                console.error('El fichero no existe.');
                return;
            }else {
                throw err;
            }
        }
        users = JSON.parse(data || '{}' );
        if( users[newUser]){
            console.log('Contraseña cambiada');
            users[newUser] = password;
        }else {
            console.log(`Datos del usuario ${newUser} añadido`);
            users[newUser] = password;
        }

        console.log('Users: ', users);
        fs.writeFileSync(file,JSON.stringify(users));

    });
}else{
    console.error('Ingrese el nombre de usuario y su contraseña');
}



// fs.open(__dirname + '/../users.json', 'a+' || 'r', (err, fd) => {
//     if (err)  throw err;
//     fs.fstat(fd, (err, stats) => {
//         var bufferSize=stats.size,
//             chunkSize=512,
//             buffer=new Buffer(bufferSize),
//             bytesRead = 0;
//
//         while (bytesRead < bufferSize) {
//             if ((bytesRead + chunkSize) > bufferSize) {
//                 chunkSize = (bufferSize - bytesRead);
//             }
//             fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
//             bytesRead += chunkSize;
//         }
//         users = buffer.toString('utf8', 0, bufferSize); //No se guarda correcamente en la variable
//         console.log(typeof users, users);
//         fs.close(fd, ()=>{
//             console.log("Fichero cerrado");
//         });
//     });
// });
