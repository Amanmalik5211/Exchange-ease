let messages = [];

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log('Socket connected', socket.id);
    
    socket.emit('getMsg', messages);
    
    socket.on('sendMsg', (data) => {
      messages.push(data);
      io.emit('getMsg', messages);
    });
    
    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    });
  });
};

module.exports = initializeSocket;

