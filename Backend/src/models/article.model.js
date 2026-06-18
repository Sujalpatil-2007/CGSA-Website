const mongoose = require("mongoose");

const articleSchama = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true});

// export default mongoose.model("Article",articleSchama);
const articleModel = mongoose.model("Article",articleSchama)

module.exports = articleModel;