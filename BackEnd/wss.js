import WebSocket from 'ws';
import * as fs from "fs";

const wss = new WebSocket.Server({ port: 8080 });

let clients = []
const games = []

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (message === 'startGame') {
      clients.push(ws);
      if (clients.length === 2) {
        games.push
        ({ 
          jogadores: clients,
          id: ""
        })
        clients = [];
      }
    } 
    
  });
  
});