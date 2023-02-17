const { io } = require('../index');

// Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado");
    client.on('disconnect', () => { 
        console.log("Cliente desconectado");
    });

    client.on('mensaje',( payload )=>{ //escucha un evento personalizado
        console.log(payload);
        io.emit('mensaje', { admin: "Nuevo mensaje"});  //Emite una respuesta a todos los clientes conectados
    });
    
});