const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://procolab-v1.herokuapp.com", "http://www.procolab.tech"],
        methods: ["GET", "POST"]
    }
});
// on connection
io.on("connection", (socket)=>{
    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`${socket.id} has joined the Room: ${data}`)
    })
    socket.on("send_code", (data)=>{
        console.log(data.code);
        socket.to(data.room).emit("receive_code", data);
    })
    socket.on("disconnect", ()=>{
        console.log(`${socket.id} has disconnected`)
    })
})

server.listen(process.env.PORT || 3001, function(){
    console.log("The server has started at 3001.");
})