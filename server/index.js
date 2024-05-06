require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = express();

server.use(express.json());
const cors = require('cors');
server.use(cors())
server.use(express.urlencoded({extended: true}));
server.use(cookieParser())
const authrouter = require("./routes/auth.route");
const userrouter = require("./routes/user.route")
const postrouter = require("./routes/post.route")


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MernTwitter');
  console.log('database connected')
}


server.use("/auth", authrouter.authroutes)
server.use("/users", userrouter.userroutes)
server.use("/posts", postrouter.postroutes)


server.listen(process.env.PORT, () => {
    console.log('server started')
})