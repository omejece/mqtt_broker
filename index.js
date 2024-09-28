const aedes = require("aedes")();
const net = require("net");
const ClientControl = require("./features/clients/ClientController");


const server = net.createServer(aedes.handle);

server.listen(4200,function(){
     console.log("server listening at port 4200");
});


// when a new client connects
aedes.on("client",async function(client){
     await ClientControl.saveClient(client);
     console.log(`Client connected: ${client.id}`);
     console.log(Object.keys(client));
     console.log(client.req);
});

aedes.on("subscribe",async function(subscription,client){
    console.log(`Client ${client.id} subscribed to topics: ${subscriptions.map(s => s.topic).join(', ')}`);
});

aedes.on("publish",async function(packet,client){
    if (client) {
        console.log(`Client ${client.id} published to topic ${packet.topic}: ${packet.payload.toString()}`);
    }
});

aedes.on('clientDisconnect', async function (client) {
    console.log(`Client disconnected: ${client.id}`);
    await ClientControl.deleteClient(client);
});


// Override the default authenticate method to capture login parameters
aedes.authenticate = function (client, username, password, callback) {
    console.log(`Client attempting to connect: ${client.id}`);
    console.log(`Username: ${username}`);
    
    // Password is a Buffer, so convert it to string
    const passwordStr = password ? password.toString() : null;
    console.log(`Password: ${passwordStr}`);
  
    // Example authentication logic (always accept the connection)
    if (username === 'validUser' && passwordStr === 'validPassword') {
      callback(null, true);  // Authentication successful
    } else {
      callback(null, false); // Authentication failed
    }
};