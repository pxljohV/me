import React,{ useState, useEffect, useRef} from 'react'


export default function NewsSlide() {
   
    const [x , setX] = useState(100);//init
    
    const reduceX=()=>{
        setX(x - 0.2);
    }
    const reset=()=>{
        setX(100)                   //init
    }

    const moveLeft={
        
        marginLeft:x+"%",
    }
        
    useEffect(() => {
        let id = window.setInterval(() => {
          if (x > 0) {
            reduceX()
          }
  
      //clearIntervel here
          if(x <= 0){
              reset()
          }
  
          // this line keep executing even it timeout reach 0
          console.log( x);
        }, 1000/60)
    
        return () => {
          window.clearInterval(id);
        }
      }, [x])
    
    
  return (
    <div className='w-100 ba relative'>
        <h1  className="w-50 " style={moveLeft}>THIS IS THE REF</h1>
    </div>
  )
}
