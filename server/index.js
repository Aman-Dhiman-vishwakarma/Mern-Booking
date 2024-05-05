require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const server = express();

server.use(express.json());
const cors = require('cors');
server.use(cors())
server.use(express.urlencoded({extended: true}));
server.use(cookieParser())
const authrouter = require("./routes/auth.route");



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MernTwitter');
  console.log('database connected')
}


server.use("/auth", authrouter.authroutes)





server.listen(process.env.PORT, () => {
    console.log('server started')
})