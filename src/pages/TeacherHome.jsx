import axios from 'axios'
import {useState, useEffect} from 'react'

function TeacherHome() {
  const [homeworks,setHomework] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( ()=> {
    const run = async () => {
      try{
        setLoading(true)
        const token = localStorage.getItem('token')
        const rs = await axios.get('http://localhost:8888/homework', {
          headers : { Authorization : `Bearer ${token}` }
        })
        setHomework(rs.data.homeworks)
      }catch(err) {
        console.log(err.message)
      }finally {
        setLoading(false)
      }
    }
    run()
  },[])

  if(loading) {
    return <p className='text-xl'>Loading...</p>
  }
  return (
    <>
      <div>TeacherHome</div>
      <hr />
      {homeworks.map(el=>(
        <p key={el.id}>{JSON.stringify(el)}</p>
      ))}
    </>
  )
}

export default TeacherHome