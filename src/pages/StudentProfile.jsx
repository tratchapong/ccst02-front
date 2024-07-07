import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import reactLogo from '../assets/react.svg'

function StudentProfile() {
  const [input, setInput] =useState({
    file: '',
    firstname : '',
    email: ''
  })
  const [file, setFile] = useState('')

  const {user} = useAuth()

  useEffect( ()=> {
    setInput( { firstname: user.firstname, email: user.email})
  },[])
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSelectFile = e => {
    // console.dir(e.target.files[0])
    // setInput(prv => ({...prv, file: e.target.files[0]}))
    // let imgSrc = URL.createObjectURL(e.target.files[0])
    setFile(e.target.files[0])
    // console.log(imgSrc)
  }
  const hdlSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="border w-4/6 min-w-[600px] flex flex-col gap-3 mx-auto p-3">
      <h1 className="text-2xl">Your Profile</h1>
      {/* {file && <img src={file} alt="" />} */}
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <div className="flex justify-center items-center gap-4">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={file ? URL.createObjectURL(file) : reactLogo} />
              {/* <img src={reactLogo} /> */}
            </div>
          </div>
          <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" 
            accept="image/png, image/jpeg"
            onChange={hdlSelectFile}
          />
        </div>
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
            required
          />
        </label>
        <button className="btn btn-outline btn-primary mt-6">Update</button>

      </form>
    </div>
  );
}

export default StudentProfile;
