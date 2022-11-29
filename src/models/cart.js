const mongoose=require('mongoose');
const cartSchema=mongoose.Schema
const Cart=new cartSchema({
      user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
      cartItem:[{
         product:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
         quantity:{type:Number ,default:1},
         price:{type:Number,required:true},
         productPicture:{type:String}
           


      }]

})

module.exports=mongoose.model('Cart',Cart)