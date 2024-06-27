import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);

// Added cors for development
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

let players = [];
let drawingData = [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let isGameStarted = false;
let cursors = {};

app.use(cors());
app.use(json());

// Serve static files from the 'dist' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

// API routes with prefix '/api'
app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

app.post('/api/game/start', (_req, res) => {
  isGameStarted = true;
  drawingData = [];

  io.emit('draw', drawingData);
  io.emit('clearBoard', true);
  io.emit('gameStarted', true); // Broadcast game start event to all clients
  res.status(200).json({ message: 'Game Started' });
});

io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    // Remove player on disconnect
    if (socket.user && socket.user.name) {
      // Remove player from list
      players = players.filter(item => item.id !== socket.user.id);
      io.emit('user:disconnected', socket.user.name);

      // Remove cursor
      delete cursors[socket.user.id];
      io.emit('cursorUpdate', Object.values(cursors)); 
    }
    io.emit('user:list', players);
  });

  socket.on('user:create', (data) => {
    players.push(data); // Add the new player to the array
    socket.user = data;
    io.emit('user:created', data);
    io.emit('draw', drawingData);
  });

  socket.on('user:list', () => {
    io.emit('user:list', players);
  });

  socket.on('message:send', (msg) => {
    io.emit('message:received', msg);
  });

  // Drawing collaboration features
  socket.on('draw', (data) => {
    drawingData.push(data); // Store the drawing data
    io.emit('draw', drawingData); // Broadcast drawing data to all clients
  });

  socket.on('clearBoard', () => {
    drawingData = []; // Clear the drawing data
    io.emit('draw', drawingData);
    io.emit('clearBoard', true); // Broadcast clear board event to all clients
  });

  socket.on('cursorMove', (data) => {
    cursors[socket.user.id] = data;
    io.emit('cursorUpdate', Object.values(cursors));
  });

  // Additional drawing collaboration features
  socket.on('changeColor', (color) => {
    io.emit('changeColor', color); // Broadcast color change to all clients
  });

  socket.on('toggleEraser', (isEraser) => {
    io.emit('toggleEraser', isEraser); // Broadcast eraser toggle to all clients
  });
});

// Route handler for SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
