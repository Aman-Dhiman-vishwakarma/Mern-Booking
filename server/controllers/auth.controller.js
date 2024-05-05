const { generateTokenAndSetCookie } = require("../lib/utils/generateToken");
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs")

exports.signup = async (req, res) => {
    
    try {
        const {fullname, username, email, password} = req.body;

        const existinguser = await User.findOne({ username })
        if(existinguser){
            return res.status(400).json({error: "username is allready taken"});
        }
        
        const existingemail = await User.findOne({ email })
        if(existingemail){
            return res.status(400).json({error: "email is allready taken"});
        }

        if(password.length < 6){
            return res.status(400).json({error: "Password must be atlest  6 charactars"});
        }


        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            username, 
            email,
            password:hashedpassword
        })
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            
            res.status(200).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email:newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            });
        }else{
            res.status(400).json({error: "Invalid user data"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        const ispasswordcorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !ispasswordcorrect){
            return res.status(400).json({error: "Invalid username or pssword"});  
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email:user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        });

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({messege:"Logged Out Successfully"});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getme = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}