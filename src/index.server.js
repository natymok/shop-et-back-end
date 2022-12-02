const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const path=require('path')
require('dotenv').config()
const app=express()
const adminRoutes=require('./routes/admin')
const userRoutes=require('./routes/user.js')
const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URI ,
    {   useNewUrlParser:true,
    useUnifiedTopology:true,
    
     }
    )
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})
const bodyParser=require('body-parser')
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())
app.use('/api',userRoutes)
app.use('/api',adminRoutes)
app.use(express.static('catagoryimg'));
app.use(express.static('uploads'));
if(process.env.NODE_ENV=='production')
{   console.log('production mode active')
   
}
else{
    console.log('devv mode')
    app.get('/',((req,res)=>{
        res.send('api running')
    }))
}

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server lisineng on port${process.env.PORT || 3000}`)
})