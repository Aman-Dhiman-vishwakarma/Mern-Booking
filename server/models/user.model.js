const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true  
    },
    fullname:{
        type: String,
        required: true, 
    },
    password:{
        type: String,
        required: true,
        minLength: 6 
    },
    email:{
        type: String,
        required: true,
        unique: true  
    },
    followers:[
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following:[
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    profileImg:{
        type: String,
        default: ""
    },
    coverImg:{
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    },
    link:{
        type: String,
        default: ""
    },
    likedposts:[
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }
    ],
}, {timestamps: true})

exports.User = mongoose.model("user", userSchema)