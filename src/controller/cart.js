
const cart=require('../models/cart')
exports.addtoCart=(req,res,next)=>{
   cart.findOne({user:req.user.id})
   .then((user)=>{
       if(user){
        
        const isitem=user.cartItem.find((item)=>(
            
            item.product.toString()==req.body.cartItem.product.toString()
        ))
    
        if(isitem){
            let quantity
            if(req.body.cartItem.quantity){
                
             quantity=req.body.cartItem.quantity

            }
            else{
                quantity=1

            }
            cart.findOneAndUpdate({user:req.user.id,"cartItem.product":req.body.cartItem.product},{
                "$set":{
                    "cartItem.$":{...req.body.cartItem,
                    quantity:isitem.quantity + quantity
                }
                }
            })
            .then((cart)=>{
                res.status(200).json({
                    cart:cart
                })
            })
            .catch((err)=>{
                res.status(400).json({
                    error:err
                })
            })
    
        }
        else{
              cart.findOneAndUpdate({user:req.user.id},{
                "$push":{
                    "cartItem":req.body.cartItem
                }
            })
            .then((cart)=>{
                res.status(200).json({
                    cart:cart
                })
            })
            .catch((err)=>{
                res.status(400).json({
                    error:err
                })
            })
    

        }

        }
    else{

        
        const Cart=new cart({

            user:req.user.id,
            cartItem:[req.body.cartItem]
         
         })
    Cart.save()
        .then((cart)=>{
            res.status(200).json({
                message:cart
            })
        })
    .catch((err)=>{
            res.status(400).json({
                message:err
            })
        })


       }
       
    })
    
       
   }
   exports.getCart=(req,res,next)=>{
        cart.find({user:req.user.id})
        .then((data)=>{
            res.status(200).json({
                message:data
            })
        })
        .catch((err)=>{
            res.status(400).json({
                error:err
            })
        })

   }
   exports.removefromCart=(req,res,next)=>{
    const filter={user:req.user.id}
    const update=req.body
    cart.findOneAndUpdate(filter,update,{
        new: true,
        upsert: true,
        rawResult: true 
    })
    .then((data)=>{
        res.status(200).json({
         message:data

        })
    })
    .catch((err)=>{
        res.status(400).json({
            error:err
        })
    })
      

   }
 
       

 

 
    

