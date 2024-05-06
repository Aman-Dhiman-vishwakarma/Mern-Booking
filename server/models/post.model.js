const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,   //type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    text:{
        type: String,
    },
    img:{
        type: String
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",  
        }
    ],
    comments:[
        {
            text:{
                type: String,
                required: true
            },
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
        }
    ]
}, {timestamps: true})

exports.Post = mongoose.model("Post", postSchema);