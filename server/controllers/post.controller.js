const { Notification } = require("../models/notification.model");
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const cloudinary = require("cloudinary").v2;

exports.createpost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ messege: "user note found" });

    if (!text && !img) {
      return res.status(400).json({ messege: "post must have text or img" });
    }

    if (img) {
      const upladedresponce = await cloudinary.uploader.upload(img);
      img = upladedresponce.secure_url;
    }
    const newpost = new Post({
      user: userId,
      text,
      img,
    });

    await newpost.save();
    return res.status(200).json(newpost);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletepost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ messege: "post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ messege: "you are not authorised to delete this post" });
    }
    if (post.img) {
      const imgId = await post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ messege: "post deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ messege: "text field is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ messege: "post not found" });
    }

    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ messege: "post not found" });
    }

    const userlikepost = post.likes.includes(userId);

    if (userlikepost) {
      //unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedposts: postId } });
      res.status(200).json({ messege: "post unlike successfully" });
    } else {
      //like post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedposts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();
      res.status(200).json({ messege: "post like successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (posts.length === 0) {
      res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getLikePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ messege: "user not found" });
    }

    const likedposts = await Post.find({ _id: { $in: user.likedposts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedposts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getFolloeingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ messege: "user not found" });
    }

    const following = user.following;
    const feedpost = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

      res.status(200).json(feedpost);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUserPosts = async (req, res) => {
    try {
       const {username} = req.params;
       const user = await User.findOne({username})
       if (!user) {
        return res.status(400).json({ messege: "user not found" });
       } 

       const posts = await Post.find({user: user._id}).sort({ createdAt: -1 })
       .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

      if(posts.length == 0){
        return res.status(400).json({messege: "have a no post create some post"});
      }
      res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}
