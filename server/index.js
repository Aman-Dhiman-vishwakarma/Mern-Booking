require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const server = express();

server.use(express.json());
const cors = require('cors');
server.use(cors())



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MernTwitter');
  console.log('database connected')
}


server.get('/', (req, res)=>{
    res.json({"messege":"ok aman"})
})
server.listen(process.env.PORT, () => {
    console.log('server started')
})