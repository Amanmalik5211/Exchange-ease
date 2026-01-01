const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const connectDB = require('./config/database');
const initializeSocket = require('./socket/socketHandler');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();
const port = process.env.PORT || 5000;


const httpServer = http.createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  }
});


initializeSocket(io);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connectDB();


app.get('/', (req, res) => {
  res.send('HOME HOME HOME');
});

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', userRoutes);
app.use('/', searchRoutes);
app.use('/', likeRoutes);


httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
