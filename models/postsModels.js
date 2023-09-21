const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title :{
        type :String,
        required : true
    },
    body :{
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    userName:{
        type : String,
        required : true
    },
    createdAt :{
        type : Date,
        default : Date.now()
    },
    likes :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    comments :[
        {
            comment : String,
            createdAt:{type : Date,default : Date.now()},
            commentor : {type : mongoose.Schema.ObjectId,ref : "User"}
        }
    ],
    numLikes :{
        type : Number,
        default : 0,
        min :0
    },
    numComments :{
        type : Number,
        default : 0,
        min : 0
    }


},{
    timestamps : true
})

module.exports= new mongoose.model("Post",postSchema)