const express = require ('express');
const app = express();
const PORT = 8080;

// importo la clase Contenedor del ejercicio anterior

const Contenedor = require('./assets/main.js')

//Creo una instancia de la clase para poder invocar sus metodos posteriormente
const cont = new Contenedor.Contenedor('./assets/productos.txt');



// Conectando el server
const server = app.listen(PORT, ()=>{ 
    console.log('Mi server ExpressJS')
})

server.on("error", error => console.log(`Error en servidor ${error}`));


//Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
app.get('/productos', (req, res) => {
    res.send(`Estos son los productos ${JSON.stringify(cont.getAll())}`);
 })
 


//Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
 app.get('/productoRandom', (req, res) => {
     if (req ){
         
        //combino la funcion Math.round con Math.random para obtener un numero entero aleatorio entre el id max y min de la data
        res.send(`Producto Random: ${JSON.stringify(cont.getById(Math.round(Math.random() * (cont.maxId - cont.minId) + cont.minId )))}`) 

     }
 })


