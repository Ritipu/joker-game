import WebSocket from 'ws';
import * as fs from "fs";

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
  
    fs.watch('contador.json', (data) => {
        ws.send('update')
    })
});