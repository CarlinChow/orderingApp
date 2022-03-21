import {useState, useEffect} from 'react'

const Clock = ({type}) => {
  const [time, setTime] = useState()

  useEffect(()=> {
    setInterval(()=>{
      const date = new Date()
      if(type === 'date'){
        setTime(date.toLocaleDateString())
      } else if(type === 'time'){
        setTime(date.toLocaleTimeString())
      } else{
        setTime(date.toLocaleString())
      }
    }, 1000)
  }, [])

  return (
    <div className='clock'>
      {time}
    </div>
  )
}

export default Clock