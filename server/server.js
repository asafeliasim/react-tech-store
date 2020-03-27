const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const geocode = require('./routers/geocode/geocode');
/*models routers*/
const UserRouter = require('./routers/userRouter');
const ProductRouter = require('./routers/productRouter');
const CartRouter = require('./routers/cartRouter');
const apiRouter = require('./routers/api');
const BranchRouter = require('./routers/branchRouter');
/*end of models routers*/
//const socketListener = require('./sockets/socketIO');

const path = require('path');


const app = express();
//http://192.168.230.1/



//socketListener(io);
const PORT = 3001;

require('./db/mongoose');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(UserRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(apiRouter);
app.use(BranchRouter);

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/geocode/:address', (req, res) => {

   const address = req.params.address;

   geocode(address, (err, { longitude, latitude} = {}) => {
      if (!address) {
         return res.send({ error: 'No such address has been found' })
      }
      if (err) {
         return res.send({ error: err })
      }
      console.log(address);
      res.send({ longitude, latitude});
   })
});


const server = app.listen(PORT,()=>{
   console.log(`server connect is PORT: ${PORT} `);
   console.log(__dirname)
});

/*Socket-io chat*/
const socketIo = require('socket.io');
const io = socketIo(server);

/*io.on("connection", socket => {
   // eslint-disable-next-line no-unused-expressions,no-sequences
   console.log("New client connected"), setInterval(
       () => getApiAndEmit(socket),
       500
   );
   socket.on("disconnect", () => console.log("Client disconnected"));
});*/
//TODO: need file to hold the variables
/*
const axios = require('axios');
const apiDarkSky = "https://api.darksky.net/forecast/a03cfddadcdac235785db2773ca94c95/32.0722,34.8089";

const getApiAndEmit = async socket =>{
 try{
    const res = await axios.get(
            apiDarkSky
    );
    socket.emit('Powered by Dark Sky',res.data.currently.temperature);

 }catch (e) {
    console.error(`Error: ${e.code}`);
 }
};*/
