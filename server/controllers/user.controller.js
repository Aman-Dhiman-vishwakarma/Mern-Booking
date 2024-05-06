const { Notification } = require("../models/notification.model");
const bcrypt = require("bcryptjs")
const cloudinary = require('cloudinary').v2;
const { User } = require("../models/user.model");

exports.getUserProfile =  async (req, res) => {
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select('-password')
        if(!user){
           return res.status(400).json({messege: "user not found"});
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)

        if(id == req.user._id){
            res.status(400).json({messege: "you can't folloe/unfollow yourself"}); 
        }
        
        if(!userToModify || !currentUser){
            res.status(400).json({messege: "user not found"}); 
        }

        const isFollowing = currentUser.following.includes(id);
        
        if(isFollowing){
        //unfollow user
        await User.findByIdAndUpdate(id, {$pull: { followers: req.user._id}})
        await User.findByIdAndUpdate(req.user._id, {$pull: { following: id}}) 
        res.status(200).json({messege: "user unfollow successgully"}); 
        }else{
        //follow user
         await User.findByIdAndUpdate(id, {$push: { followers: req.user._id}})
         await User.findByIdAndUpdate(req.user._id, {$push: { following: id}})
        //send notification to the user
        const newnotification = new Notification({
            type: "follow",
            from: req.user._id,
            to: userToModify._id
        }) 
        await newnotification.save();
         res.status(200).json({messege: "user followed successgully"}); 
       
        }
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.getSuggestedUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const userfollowedbyme = await User.findById(userId).select("following")
        const users = await User.aggregate([
            {
                $match:{
                    _id: {$ne:userId}
                }
            },
            {$sample:{size:10}}
        ])

        const filterdusers = users.filter(user=>!userfollowedbyme.following.includes(user._id))
        const suggesteduser = filterdusers.slice(0, 4)
        suggesteduser.forEach(user=>user.password=null)
        res.status(200).json(suggesteduser);

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.updateuser = async (req, res) => {
    const {fullname, email, username, currentpassword, newpassword, bio, link} = req.body;
    let {profileImg, coverImg} = req.body;

    const userId = req.user._id;

    try {
        let user = await User.findById(userId)
        if(!user) return  res.status(400).json({messege: "user not found"});

        if((!newpassword && currentpassword) || (!currentpassword && newpassword)){
            return  res.status(400).json({messege: "please enter both password"});
        }

        if(currentpassword && newpassword){
            const ismatch = await bcrypt.compare(currentpassword, user.password)
            if(!ismatch) return  res.status(400).json({messege: "currentpassword is invalid"});
            if(newpassword.length < 6){
                return  res.status(400).json({messege: "password must be atlest 6 charactar"});
            } 

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newpassword, salt)
        }
          
        if(profileImg){

            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
            }

         const uplodedresponce = await cloudinary.uploader.upload(profileImg);
         profileImg = uplodedresponce.secure_url;
        }
        
        if(coverImg){

            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0])
            }

            const uplodedresponce = await cloudinary.uploader.upload(coverImg);
            coverImg = uplodedresponce.secure_url;
        }

        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link; 
        user.profileImg = profileImg || user.profileImg;  
        user.coverImg = coverImg || user.coverImg; 
        
        user = await user.save();
        user.password = null;
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}