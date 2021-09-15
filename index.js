require('dotenv').config();
const express = require('express');
const app = express();
const port = 5001 || process.env.port;
const auth = require('./routes/auth.route.js');
app.use(express.json())
app.use('/api',auth);



app.listen(port,()=>{
    console.log(`server running at port : ${port}`)
})