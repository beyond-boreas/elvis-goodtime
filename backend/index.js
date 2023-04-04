// IMPORTS

const cors = require("cors"); // Cross-origin resource sharing

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "http://localhost:3000",
  },
});

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Middleware to prefer returning resources in /build directory (frontend)
app.use(express.static("build"));

// ROUTES
let answers = [
  {
    user: "billy",
    party: "billy's party",
    content: "billy's answer",
    id: 3,
  },
];

// START SERVER
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.debug(`Connected new ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Disconnected ${socket.id}`);
  });

  app.post("/api/submissions", (request, response) => {
    const body = request.body;
    console.debug(`POST request for ${JSON.stringify(request.body)}`);

    const answer = {
      user: body.user,
      party: body.party,
      content: body.content,
    };
    answers = answers.concat(answer);

    response.json(answer);

    console.debug("Emitting REFRESH_SUBMISSIONS");
    io.emit("REFRESH_SUBMISSIONS");
  });

  app.get("/", (request, response) => {
    response.json(answers);
  });

  app.get("/api/submissions", (request, response) => {
    console.debug(`GET request for ${JSON.stringify(answers)}`);
    response.json(answers);
  });
});
