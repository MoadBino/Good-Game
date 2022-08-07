const mongoose=require("mongoose")

const newslist=new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description: { type: String }
})



module.exports=mongoose.model("newslist",newslist)
