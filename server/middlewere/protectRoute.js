const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
          return  res.status(400).json({messege:"Unauthorised"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        if(!decoded){
           return res.status(400).json({messege:"Unauthorised"});
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(400).json({messege:"user not found"});
         }

         req.user = user;
         next();
    } catch (error) {
        res.status(500).json(error);
    }
}