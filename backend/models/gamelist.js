const mongoose=require("mongoose")

const gamelist=new mongoose.Schema({
    image:{type:String},
    gamename:{type:String},
    genres:{type:mongoose.Schema.Types.Mixed},
    playtime:{type:Number},
    rate:{type:String},
    released:{type:String},
    wherefound:{type:mongoose.Schema.Types.Mixed }
})



module.exports=mongoose.model("gamelist",gamelist)
