// IMPORTS
const express = require("express");
const app = express();

const cors = require("cors"); // Allow CORS on all requests
app.use(cors()) 

const dotenv = require('dotenv') // Local environment variables in .env
dotenv.config() // Env variables available as process.env.NAME

const morgan = require('morgan') // Log HTTP requests
app.use(morgan('dev')) 

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // Manual CORS config req'd for dev with front/backend at localhost:3000/3001
  cors: {
    origin: "http://localhost:3000",
  },
});


// MIDDLEWARE
app.use(express.json()); // Attach request json content to request.body


app.use(express.static("build")); // Return frontend resources in ./build


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
require('dotenv').config()
  app.get("/api/submissions", (request, response) => {
    console.debug(`GET request for ${JSON.stringify(answers)}`);
    response.json(answers);
  });
});
