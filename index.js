const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message",message);
    });
});

app.use(express.static(path.resolve(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
server.listen(9000, () => console.log("Server started at PORT: 9000"));
