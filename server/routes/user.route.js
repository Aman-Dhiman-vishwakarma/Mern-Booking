const express = require('express');
const { protectRoute } = require('../middlewere/protectRoute');
const { getUserProfile, followUnfollowUser, getSuggestedUser, updateuser } = require('../controllers/user.controller');

const userroutes = express.Router();

userroutes.get('/profile/:username', protectRoute, getUserProfile)
.get('/suggested', protectRoute, getSuggestedUser)
.post('/follow/:id', protectRoute, followUnfollowUser)
.post('/update', protectRoute, updateuser)

exports.userroutes = userroutes