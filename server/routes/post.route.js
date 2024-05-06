const express = require("express");
const { protectRoute } = require("../middlewere/protectRoute");
const { createpost, deletepost, commentOnPost, likeUnlikePost, getAllPost, getLikePosts, getFolloeingPosts, getUserPosts } = require("../controllers/post.controller");
const postroutes = express.Router();

postroutes.get("/allposts", protectRoute, getAllPost)
.get("/followingposts", protectRoute, getFolloeingPosts)
.get("/likepost/:id", protectRoute, getLikePosts)
.get("/user/:username", protectRoute, getUserPosts)
.post("/create", protectRoute, createpost)
.post("/like/:id", protectRoute, likeUnlikePost)
.post("/comment/:id", protectRoute, commentOnPost)
.delete("/delete/:id", protectRoute, deletepost)

exports.postroutes = postroutes