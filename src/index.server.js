const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
require('dotenv').config()
const app=express()
const adminRoutes=require('../src/routes/admin')
const userRoutes=require('../src/routes/user.js')
const mongoose=require('mongoose')

const DBURI='mongodb+srv://nati:1234@cluster0.sskche6.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DBURI ,
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
app.use('/public',express.static('catagoryimg'))
app.use('/public',express.static('uploads'))

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server lisineng on port 3000`)
})