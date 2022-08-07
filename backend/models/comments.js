const mongoose=require("mongoose")


const comments=new mongoose.Schema({
    imag:{type:String},
    commenterName:{type:String},
    comment:{type:String},
    postId:{ type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})


module.exports=mongoose.model("Comments",comments)

