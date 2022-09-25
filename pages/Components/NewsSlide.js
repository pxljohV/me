import React,{ useState, useEffect, useRef} from 'react'


export default function NewsSlide() {
   
    const [x , setX] = useState(100);//init
    
    const reduceX=()=>{
        setX(x - 0.1);
    }
    const reset=()=>{
        setX(100)                   //init
    }

    const moveLeft={
        
        marginLeft:x+"%",
    }
        
    useEffect(() => {
        let id = window.setInterval(() => {
          if (x > -100) {
            reduceX()
          }
  
      //clearIntervel here
          if(x <= -50){
              reset()
          }
  
          // this line keep executing even it timeout reach 0
          //console.log(x);
        }, 1000/60)
    
        return () => {
          window.clearInterval(id);
        }
      }, [x])
    
    
  return (
    <div className='w-100 ba relative overflow-hidden bg-white'>
        <p  className="w-50  f6 black-90 b" style={moveLeft}>Fema no sirve: Dicen adlfjsoiefj o sefl.</p>
    </div>
  )
}
