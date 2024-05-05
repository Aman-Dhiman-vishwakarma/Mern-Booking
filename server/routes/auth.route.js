const express = require('express');
const { signup, login, logout, getme } = require('../controllers/auth.controller');
const { protectRoute } = require('../middlewere/protectRoute');
const authroutes = express.Router();

authroutes.get("/me", protectRoute, getme)
.post("/signup", signup)
.post('/login', login)
.post('/logout', logout)

exports.authroutes = authroutes