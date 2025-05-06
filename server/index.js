const exppess = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = exppess();
const route = require("./route");

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  io.on("disconnect", () => {
    console.log(disconnect);
  });
});

server.listen(4000, () => {
  console.log("Server is running");
});
