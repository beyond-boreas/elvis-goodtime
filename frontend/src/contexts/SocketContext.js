import io from "socket.io-client";
import React from "react";

/* This context is used to open a single web socket with the server which is then shared across all components in the app. */

// io() assumes the frontend is on the same domain as the server - otherwise need to specify io(SERVER_URL)
export const socket = io("http://localhost:3001/");

// Create a React context to pass this socket to other components
export const SocketContext = React.createContext(socket);
