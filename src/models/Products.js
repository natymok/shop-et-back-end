const mongoose=require('mongoose')
const schema=mongoose.Schema;
const productSchema=new schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    productPicture:[
        {  img:{type:String}
    }],
    Description:{
        type:String,
        required:true,
        trim:true

    },
    quantity:{
        type:Number,
        default:1
    },
    reviews:[{  
    userId:{type :mongoose.Schema.Types.ObjectId,ref:'user'},
    review:String
    }]
      ,

    
    catagory:{
        type:mongoose.Schema.Types.ObjectId,ref:'catagory'

    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:'user'

    },
    updatedAt:Date,
        

    
},{timestamps:true})
module.exports=mongoose.model('product',productSchema)