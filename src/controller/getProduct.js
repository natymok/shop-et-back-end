const product=require('../models/Products')
exports.getProduct=(req,res)=>{
  const page=req.query.p || 0
  const productperpage=24
    product.find()
       .sort({ _id: -1 })
       .skip(page*productperpage)
       .limit(productperpage)
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