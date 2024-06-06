import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = [];

app.use(json());

app.use(express.static('dist'));
app.get('', (req, res) => {
    res.status(200).json({ message: 'Welcome'});
});
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!players.includes(username)) {
    players.push(username);
    res.status(200).json({ message: 'Login successful', username });
  } else {
    res.status(400).json({ message: 'Username already exists' });
  }
});

io.on('connection', (socket) => {
  console.log('New player connected');

  socket.on('disconnect', () => {
    console.log('Player disconnected');
  });

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
