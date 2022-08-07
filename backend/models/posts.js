const mongoose=require("mongoose")

const post=new mongoose.Schema({
    imag:{type:String},
    postimag:{type:String},
    title:{type:String},
    creater:{type:String},
    author:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
    likes:{type:Number}
})




module.exports=mongoose.model("Post",post)
