let players = [];
let drawingData = [];
let cursors = {};

const shouldSaveLog = process.env.SaveLogToDb === 'true';

let User, Message;
if (shouldSaveLog) {
  import('../models/logModel.mjs').then(module => {
    User = module.default;
  });
  import('../models/messageModel.mjs').then(module => {
    Message = module.default;
  });
}

export const socketHandler = (socket, io) => {
  socket.on('disconnect', async () => {
    // Remove player on disconnect
    if (socket.user && socket.user.name && socket.user.id) {
      if (shouldSaveLog) {
        // Log user disconnection
        await User.create({
          userId: socket.user.id,
          username: socket.user.name,
          action: 'disconnect',
        });
      }

      // Remove player from list
      players = players.filter(item => item.id !== socket.user.id);
      io.emit('user:disconnected', socket.user.name);

      // Remove cursor
      delete cursors[socket.user.id];
      io.emit('cursorUpdate', Object.values(cursors));
    }
    io.emit('user:list', players);
  });

  socket.on('user:create', async (data) => {
    players.push(data); // Add the new player to the array
    socket.user = data;
    io.emit('user:created', data);
    io.emit('draw', drawingData);

    if (shouldSaveLog) {
      // Log user creation
      await User.create({
        userId: data.id,
        username: data.name,
        action: 'connect',
      });
    }
  });

  socket.on('user:list', () => {
    io.emit('user:list', players);
  });

  socket.on('message:send', async (msg) => {
    io.emit('message:received', msg);

    if (shouldSaveLog && socket.user) {
      // Save chat history
      await Message.create({
        userId: socket.user.id,
        username: socket.user.name,
        message: msg,
      });
    }
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
    if (socket.user && socket.user.id) {
      cursors[socket.user.id] = data;
    }
    io.emit('cursorUpdate', Object.values(cursors));
  });

  // Additional drawing collaboration features
  socket.on('changeColor', (color) => {
    io.emit('changeColor', color); // Broadcast color change to all clients
  });

  socket.on('toggleEraser', (isEraser) => {
    io.emit('toggleEraser', isEraser); // Broadcast eraser toggle to all clients
  });
};
