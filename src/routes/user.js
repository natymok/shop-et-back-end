const express=require('express')
const {getCatagory}=require('../controller/admin/addCatagory')
const {searchProduct} =require('../controller/Search')
const {getCart}=require('../controller/cart')
const {isValidatedRequest,validateRequest, validatesigninRequest ,required,isAdmin}=require('../controller/vlaidate')
const router=express.Router()
const {addtoCart,removefromCart}=require('../controller/cart')
const { signup ,signin, profile} = require('../controller/user')
router.post('/signin',validatesigninRequest,isValidatedRequest, signin)
router.post('/signup',validateRequest,isValidatedRequest,signup)
router.get('/getCatagories', getCatagory)
router.get('/search/products', searchProduct)
router.post('/addTocart',required,addtoCart)
router.get('/getcart',required,getCart)
router.put('/removefromCart',required,removefromCart)
router.get('/test',((req,res)=>{
    res.status(200).json({
        message:"hello naty"
    })
}))
module.exports=router