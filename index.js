const express = require('express');
var cors = require('cors')

var http = require('http');


const router = express.Router({ mergeParams: true });

const app = express()
app.use(
    express.urlencoded()
);
let server = http.Server(app);



app.use(express.json());
app.use(cors())
let items = require('./router/fooditemrouter');
let cart=require('./router/cartroutes');


app.use('/api', items);
app.use('/api',cart)



//-----------------------------------------------------------port--------------------------------------------------------------------
const port =  5001;


server.listen(port, (req, res) => {
    console.log('server start at ' + port);
})