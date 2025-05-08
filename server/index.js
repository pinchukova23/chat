const exppess = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = exppess();
const route = require("./route");
const { addUser, findUser, removeUser } = require("./users");

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
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user } = addUser({ name, room });

    socket.emit("message", {
      data: { user: { name: "Admin" }, message: `Hey ${user.name}` },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Admin" }, message: ` ${user.name} has joined` },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      const { room, name } = user;

      io.to(room).emit("message", {
        data: { user: { name: "Admin" }, message: `${name} left chat` },
      });
    }
  });

  io.on("disconnect", () => {
    console.log(disconnect);
  });
});

server.listen(4000, () => {
  console.log("Server is running");
});
