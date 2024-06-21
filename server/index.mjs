import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

let players = [];

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

io.on('connection', (socket) => {

  // ----------------------------
  socket.on('disconnect', () => {
    // Remove player on disconnect
    if (socket.user && socket.user.name) {
      players = players.filter(item => item.id !== socket.user.id);
      io.emit('user:disconnected', socket.user.name);
    }
    io.emit('user:list', players);
  });

  socket.on('user:create', (data) => {
    players.push(data); // Add the new player to the array
    socket.user = data;
    io.emit('user:created', data);
  });

  socket.on('user:list', () => {
    io.emit('user:list', players);
  });

  socket.on('message:send', (msg) => {
    io.emit('message:received', msg);
  });

  // ----------------------------

  // Drawing collaboration features
  socket.on('draw', (data) => {
    io.emit('draw', data); // Broadcast drawing data to all clients
  });

  socket.on('clearBoard', () => {
    io.emit('clearBoard'); // Broadcast clear board event to all clients
  });

  // Cursor synchronization
  socket.on('cursor', (data) => {
    io.emit('cursor', data); // Broadcast cursor data to all clients
  });

  // Object selection and manipulation
  socket.on('objectManipulation', (data) => {
    io.emit('objectManipulation', data); // Broadcast object manipulation data to all clients
  });

  // Additional drawing collaboration features
  socket.on('changeColor', (color) => {
    io.emit('changeColor', color); // Broadcast color change to all clients
  });

  socket.on('toggleEraser', (isEraser) => {
    io.emit('toggleEraser', isEraser); // Broadcast eraser toggle to all clients
  });

  // Shape recognition and drawing assist
  socket.on('drawShape', (shapeData) => {
    io.emit('drawShape', shapeData); // Broadcast shape drawing data to all clients
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
