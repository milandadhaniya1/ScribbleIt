let drawingData = [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let isGameStarted = false;

export const startGame = (req, res, io) => {
  isGameStarted = true;
  drawingData = [];

  io.emit('draw', drawingData);
  io.emit('clearBoard', true);
  io.emit('gameStarted', true); // Broadcast game start event to all clients
  res.status(200).json({ message: 'Game Started' });
};
