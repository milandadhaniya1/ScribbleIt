import express from 'express';
import { startGame } from '../controllers/gameController.mjs';
import { io } from '../index.mjs'; // Import the io instance

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

router.post('/game/start', (req, res) => {
  startGame(req, res, io);
});

export default router;
