import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    s_code : '', password : '', confirmPassword : '', firstname : '', email : ''
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name] : e.target.value }))
  }

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8888/auth/register', input)
      // console.log(rs)
      // alert(rs.data.msg)
      if(rs.status === 201) {
        alert('register ok')
        navigate('/')
      }
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div>
      <h1 className="text-2xl text-center my-4">Register Form</h1>
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
            name="s_code"
            value={input.s_code}
            onChange={hdlChange}
            required
            pattern="^s\d{3}$"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full "
            name="firstname"
            value={input.firstname}
            onChange={hdlChange}
            required
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full "
            name="email"
            value={input.email}
            onChange={hdlChange}
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
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full "
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
            required
          />
        </label>
        <button className="btn btn-outline btn-primary mt-6">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
