const express= require ('express');
const app= express();
const codeBlockRouts = require('./src/Router/CodeBlockRouts');
const http = require("http");
const { Server } = require("socket.io")
const codeBlockController = require('./src/Controllers/CodeBlockController');

app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
        console.log(`User Connected room: ${data}`);
        codeBlockController.handleJoinRoom(socket, data); 
    });  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);

    });
  });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods',  'GET, POST, DELETE, PUT');
    res.set('Content-Type', 'application/json','Authorization','x-access-token');
    next();
   });

app.use( codeBlockRouts)
server.listen(process.env.PORT || 8080, ()=> {
    console.log('Server on');
});