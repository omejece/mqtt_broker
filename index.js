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