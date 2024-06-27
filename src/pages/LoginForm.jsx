import axios from 'axios'
import { useState } from 'react'

function LoginForm() {

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
      const rs = await axios.post('http://localhost:8888/auth/login', body)
      if(rs.status === 200) {
        alert(`Token = ${rs.data}`)
        console.log(rs)
      }
      localStorage.setItem('token', rs.data)
    }catch(err) {
      alert(err.response.data?.error)
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
          <span className="label-text">Student Code</span>
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