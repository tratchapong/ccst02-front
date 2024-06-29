import axios from 'axios'
import {useState, useEffect} from 'react'

const homeworkApi = axios.create({
  baseURL : 'http://localhost:8888/homework'
})

homeworkApi.interceptors.request.use( req => {
  console.log(req)
  return req
})
homeworkApi.interceptors.response.use( res => {
  console.log(res)
  return res
})

function TeacherHome() {
  const [homeworks,setHomework] = useState([])
  const [loading, setLoading] = useState(true)

  homeworkApi.interceptors.request.use( config=> {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  })

  useEffect( ()=> {
    const run = async () => {
      try{
        setLoading(true)
        // const token = localStorage.getItem('token')
        // const rs = await axios.get('http://localhost:8888/homework', {
        //   headers : { Authorization : `Bearer ${token}` }
        // })
        const rs = await homeworkApi.get('/')
        setHomework(rs.data.homeworks)
      }catch(err) {
        console.log(err)
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