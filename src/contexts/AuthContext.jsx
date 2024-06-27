import axios from 'axios'
import {createContext, useState, useEffect} from 'react'

const AuthContext = createContext()

function AuthContextProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
    const run = async () => {
      try {
        setLoading(true)
        let token = localStorage.getItem('token')
        if(!token) {
          return setLoading(false)
        }
        const rs =  await axios.get('http://localhost:8888/auth/me', {
          headers : {Authorization : `Bearer ${token}`}
        })
        setUser(rs.data.user)
      } catch(err) {
        alert(err.response.data?.error)
      } finally {
        setLoading(false)
      }
    }
    run()
  },[])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, setUser, loading, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContextProvider}
export default AuthContext