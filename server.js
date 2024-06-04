const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clients = [];

wss.on('connection', ws => {
  console.log('New client connected');
  clients.push(ws);

  ws.on('message', message => {
    const data = JSON.parse(message);

    clients.forEach(client => {
      client.send(JSON.stringify(data));
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');