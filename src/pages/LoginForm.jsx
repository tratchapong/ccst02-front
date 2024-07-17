import axios from 'axios'
import { useState } from 'react'
import { toast } from "@/components/ui/use-toast"

import useAuth from '../hooks/useAuth'
import { authApi, addToken } from '../api/homeworkApi'
import { cn } from '@/lib/utils'


function LoginForm() {
  // const { toast } = useToast()
  const {setUser} = useAuth()
  const [input, setInput] = useState({
    code : '', password : ''
  })


  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name] : e.target.value }))
  }
  
  const hdlSubmit = async (e) => {
    try{
      e.preventDefault()
      let codeFor = input.code.toLocaleLowerCase().startsWith('t') ? 't_code' : 's_code'
      const body = { [codeFor] : input.code , password : input.password }
      const rs = await authApi.post('/login', body)
      localStorage.setItem('token', rs.data)
      const rs2 = await authApi.get('/me', addToken())
      setUser(rs2.data.user)

    }catch(err) {
      // alert(err.response?.data?.error)
      toast({
        // variant: "destructive",
        title : err.response?.data?.error,
        duration: 2000,
        className : 'top-0 right-0 max-w-[420px] fixed bg-pink-300 text-2xl',
        textProp: 'text-2xl text-white'
      })
       
      // console.log(err)
    }
  }
  return (
    <div>
    <h1 className="text-2xl text-center my-4">Login Form</h1>
    <form className="flex flex-col gap-2 w-[600px] border mx-auto rounded-md p-4"
      onSubmit={hdlSubmit}
    >
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Your Code</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full "
          name="code"
          value={input.code}
          onChange={hdlChange}
          required
          pattern="^[sStT]\d{3}$"
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          className="input input-bordered w-full "
          name="password"
          value={input.password}
          onChange={hdlChange}
          required
        />
      </label>

      <button className="btn btn-outline btn-primary mt-6">Login</button>
    </form>
  </div>
  )
}

export default LoginForm