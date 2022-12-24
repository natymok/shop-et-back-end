const product=require('../models/Products')
exports.getProduct=(req,res)=>{

    product.find()
       .sort({ _id: -1 })
       .limit(8)
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