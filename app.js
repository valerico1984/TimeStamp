const express = require('express');

const app = express();

require('dotenv').config()
//se sirve del directorio public
app.use('/public', express.static(__dirname+'/static'));

const PORT= process.env.PORT

//toma la ruta de index.html

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

//ruta de petición a la api que hace funcionar el microservicio de TimeStamp:

app.get('/api/:date', (req,res)=>{
  console.log(new Date(parseInt(req.params.date)));
 
//si la nueva fecha del parámentro es inválida:
  if (new Date(req.params.date)=='Invalid Date') {

    //si la nueva fecha del parámetro, ya convertida en entero, no es inválida:
     if (new Date(parseInt(req.params.date))!='Invalid Date'){

      //se envía la respuesta a la petición get con un objeto que contiene:
        //1. fecha en formato unix
        //2. fecha en formato utc (lograda gracias a "toUTCString")

              res.send({unix: parseInt(req.params.date),
                        utc: new Date(parseInt(req.params.date)).toUTCString()});
                      }
                //si la fecha convertida en entero es inválida, retorna mensaje de error      
                else {
                      res.send({error:"Invalid date"})
                    }
            }
            //si la fecha no es inválida, se envía la respuesta a la petición get:
            else{
              //la respuesta es un objeto, con dos elementos:
              //1. unix:  transforma la cadena recibida en formato unix
              //2. utc: crea una nueva fecha y la convierte a utc con toUTCString

              res.send({
              unix: Date.parse(req.params.date),
              utc: new Date(req.params.date).toUTCString(),
            })}

          })

//si no se reciben parámetros:

app.get('/api/', (req,res)=>{
  res.send({
    unix: Date.parse(new Date),
    utc: new Date().toUTCString()})
})



// listen for requests :)
app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});

