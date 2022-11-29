const Products=require('../models/Products')
exports.searchProduct=(req,res,next)=>{
   
    const name=req.query
    Products.find(name)
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