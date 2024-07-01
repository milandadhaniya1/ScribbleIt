import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import gameRoutes from './routers/gameRoutes.mjs';
import { socketHandler } from './sockets/index.mjs';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(json());
app.use(bodyParser.json());

// Added cors for development
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

// API routes with prefix '/api'
app.use('/api', gameRoutes);

if (process.env.SaveLogToDb === 'true') {
  (async () => {
    const mongoose = await import('mongoose');
    mongoose.connect(process.env.MongoDBConnection).then(() => console.log('Connected DB!'));
  })();
}

io.on('connection', (socket) => {
  socketHandler(socket, io);
});

// Route handler for SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
