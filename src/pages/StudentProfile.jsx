import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {addToken, authApi, userApi} from '../api/homeworkApi'
import { toast } from "@/components/ui/use-toast";
import reactLogo from '../assets/react.svg'
import Avatar from "../components/Avatar";

function StudentProfile() {
  const [input, setInput] =useState({
    file: '',
    firstname : '',
    email: ''
  })
  const [file, setFile] = useState('')

  const {user, setUser} = useAuth()

  useEffect( ()=> {
    setInput( { firstname: user.firstname, email: user.email})
  },[])
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSelectFile = e => {
    setFile(e.target.files[0])
  }
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation input
      const formData = new FormData()
      if(file) {
        formData.append('picture', file)
      }
      formData.append('firstname', input.firstname)
      formData.append('email', input.email)
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
      await userApi.put('/', formData, addToken())
      const rs = await authApi.get('/me', addToken())
      setUser(rs.data.user)
    }catch(err) {
      toast({title : err.message})
    }

  };
  return (
    <div className="border w-4/6 min-w-[600px] flex flex-col gap-3 mx-auto p-3">
      <h1 className="text-2xl">Your Profile</h1>
      {/* {file && <img src={file} alt="" />} */}
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <div className="flex justify-center items-center gap-4">
          {/* <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={file ? URL.createObjectURL(file) : user.imgUrl ?? reactLogo} />

            </div>
          </div> */}
          { file 
            ? <Avatar imgUrl={ URL.createObjectURL(file) } />
            : <Avatar imgUrl={ user.imgUrl}/>
          }
          
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
