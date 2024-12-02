const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg, callback) => {
        console.log('message: ' + msg);
        // io.emit: 모든 클라이언트에 메시지
        io.emit('chat message', msg);
        callback({
            status: 'success'
        })
    });
    // socket.broadcast.emit: 현재 클라이언트를 제외한 나머지에 "hi" 메시지
    socket.broadcast.emit('hi');
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
