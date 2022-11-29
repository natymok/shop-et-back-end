const mongoose=require('mongoose')
const ctagagorySchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String
    },
    parentId:{
        type:String,
    }
},{timestamps:true})
module.exports=mongoose.model('catagory',ctagagorySchema)
