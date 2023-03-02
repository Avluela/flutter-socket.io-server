const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require("../models/band");

const bands = new Bands();

bands.addBand( new Band('Dir en Grey') );
bands.addBand( new Band('Of monsters and mens') );
bands.addBand( new Band('Day6') );
bands.addBand( new Band('Incubus') );


// Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log("Cliente desconectado");
    });

    client.on('mensaje',( payload )=>{ //escucha un evento personalizado
        console.log('mensaje', payload);
        io.emit('mensaje', { admin: "Hola mundo"});  //Emite una respuesta a todos los clientes conectados
    });

    client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        // io.emit('nuevo-mensaje', payload); //emite a todos!
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitió!
    });

    client.on('vote-band',(payload) => {
        bands.voteBand(payload['id']);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band',(payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band',(payload) => {
        bands.deleteBand(payload['id']);
        io.emit('active-bands', bands.getBands());
    });
    
});