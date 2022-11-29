import React from 'react'
import Bulletien from '../Bulletin/Bulletin'
import billboard from '../../img/chris.webp'
import banks  from '../../img/bank.jpg'
import {useStateValue} from '../../Context/StateProvider'
import {MdShoppingBasket}from 'react-icons/md'
import{motion} from 'framer-motion'
import axiosinstance from '../../Axios/Axios'
import { useHistory } from 'react-router-dom'
function Home() {
  const history=useHistory()
  const [{token,product,catagories,cart},dispatch]=useStateValue()
   
    product && product.sort(()=> 0.5 - Math.random()) 
    product && console.log(product.length)
    product && product.splice(0,product.length-8)
    const addcart=(_product,quantity,price,productPicture)=>{
      let cartItem={product:_product,quantity:quantity,price:price,productPicture:productPicture}
      if(!token)
      {
        history.push('/signin')
      }
      else{
      axiosinstance.post('/addTocart',{cartItem:cartItem})
      .then((res)=>{
        
        dispatch({
          type:'addcart',
          cart:res.data.cart.cartItem
        })
      })

      .catch((err)=>{
        console.log(err)
      })
      }


    }
    const searchByCatagory=(catagory)=>{
      axiosinstance.get('/search/products',
     
      {
         params: {
          catagory: catagory
         }
       } 
      
      
     )
     .then((res)=>{
       if(res.status == '200')
       {
          dispatch({
           type:'getProduct',
           product:res.data.message
          })
       }
     })
     .catch((err)=>{
       console.log('something went wrong')
     })

    }
   

  return (
    <div className='bg-gray-200 p-1 flex flex-col gap-7   w-full'>
            <p className='mx-auto hidden md:block font-serif font-semibold'>ከ 2,500 ብር በላይ ይገብዩና እቃዎን በነፃ በ አ.አ ያሉበት ድረስ እናድርስልዎ Free delivery in A.A for purchases of ETB 2,500 and above</p>
         <Bulletien img={banks} className=''></Bulletien>
         <div className='flex flex-wrap  md:justify-evenly  w-[full]  p-1 gap-2 md:w-[full]'>
         {product && product.map((item)=>(
            <div key={item._id} className='bg-white border-2 border-gray-300 flex  justify-between items-center w-[45%] md:w-[310px]  '>
               {item.productPicture && item.productPicture.map((pic)=>(
                    
                <div key={pic._id} className='flex flex-col justify-between h-[350px] items-center p-3 '>
                             
                 <motion.img whileHover={{scale:1.24}} src={`http://localhost:3000/public/${pic.img}`} className='w-[70%]'/>
                 <p className='m-3 font-serif font-medium'>{item.Description}</p>
                 <div className='flex justify-between w-full items-center'>
                  <p className=' font-thin font-serif text-sm'>BUY NOW</p>
                  <p className='font-medium font-serif'>{item.price}ETB</p>
                  </div>
                  <div className=' flex flex-col md:flex-row items-center w-full justify-between  '>
                   <div className='flex'>
                   <p>Qty</p>
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                   </div>
                    <div className='border-1 border-gray-300 bg-orange-400 hover:bg-orange-600 text-white font-serif flex p-1 w-full md:w-[50%] md:p-3 cursor-pointer' onClick={()=>{addcart(item._id,item.quantity,item.price,item.productPicture[0].img)}}>
                      <MdShoppingBasket></MdShoppingBasket>
                      <motion.p whileTap={{scale:1.2}}>Add to Cart</motion.p>
                    </div>
                  </div>
                 
                 

                </div>
                        
                     
                     
                    
               ))}
               
              
               
               

            </div>
          ))}
         </div>
         <h1 className='text-serif font-bold text-2xl'>Categories</h1>
         <div className=' flex flex-wrap gap-1 justify-evenly'>
            {catagories && catagories.map((cat)=>(
              <motion.div onClick={()=>{searchByCatagory(cat._id)}} whileHover={{scale:1.11}}  key={cat._id} className='bg-white border-2 border-gray-400 w-[45%] md:w-[300px]  flex flex-col items-center justify-between'>
              <div className='text-serif text-medium text-xl border-1 border-gray-400 r bg-orange-400 w-full flex justify-center hover:bg-orange-600 cursor-pointer'>
              <p className='py-2'>{cat.name}</p>

              </div>
                <img className='w-[90%]' src={cat.img}/>


              </motion.div>
              
            ))}
          
          
          </div> 
        
          <Bulletien img={billboard} className=''></Bulletien>

      
         
      </div>
  )
}

export default Home