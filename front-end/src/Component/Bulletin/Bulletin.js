import React from 'react'
function Bulletin({img}) {
  return (
    <div className='w-[100%] h-[250px] hidden md:flex  md:justify-center object-cover py-5 rounded-lg'>
          <img className='w-[90%] object-cover' src={img}/>
      
      
      </div>
  )
}

export default Bulletin