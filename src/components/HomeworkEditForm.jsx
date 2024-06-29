/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const subjectApi = axios.create({
  baseURL: 'http://localhost:8888/subject'
})
const homeworkApi = axios.create({
  baseURL: 'http://localhost:8888/homework'
})

function HomeworkEditForm({el}) {

  homeworkApi.interceptors.request.use( config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  })

  const navigate = useNavigate()
  const [input, setInput] = useState({
    question: el.question,
    startdate: el.startdate,
    duedate: el.duedate,
    published: el.published,
    subject_id: el.subject_id,
  });
  const [subjects,setSubjects] = useState([])

  useEffect( ()=>{
    const run = async () => {
      try{
        const rs = await subjectApi.get('/')
        setSubjects(rs.data.subjects)
      }catch(err) {
        console.log(err.message)
      }
    }
    run()
  },[] )

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e =>{
    try {
      e.preventDefault()
      const rs = await homeworkApi.put(`/${el.id}`, input)
      // console.log(rs)
      // alert('Homework updated')
      navigate('/')
    }catch(err) {
      console.log(err.message)
    }

  }

  return (
    <div className="border w-4/6 min-w-[600px] flex flex-col gap-3 mx-auto p-3">
    <h1 className="text-2xl">Edit Homework</h1>
      <div>{JSON.stringify(el)}</div>
      <hr />
    <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Subject</span>
        </div>
        <select
          className="select select-bordered"
          name="subject_id"
          value={input.subject_id}
          onChange={hdlChange}
        >
          <option disabled value={""}>
            Pick one
          </option>
          { subjects?.map( el=> (
            <option key={el.id} value={el.id}>{el.title}</option>
          ))}
        </select>
      </label>
      <textarea
        className="textarea textarea-info"
        placeholder="Question"
        name="question"
        value={input.question}
        onChange={hdlChange}
      ></textarea>
      <div className="form-control w-52">
        <label className="label cursor-pointer">
          <span className="label-text">Published :</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={input.published}
            onChange={(e) => setInput((prv) => ({ ...prv, published: e.target.checked }))}
          />
        </label>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <label>Start date: </label>
          <DatePicker
            className="cursor-pointer bg-pink-300"
            dateFormat="dd/MM/yyyy"
            selected={input.startdate}
            onChange={(date) => setInput((prv) => ({ ...prv, startdate: date }))}
          />
        </div>
        <div className="flex gap-4">
          <label>Due date: </label>
          <DatePicker
            className="cursor-pointer bg-violet-300"
            dateFormat="dd/MM/yyyy"
            selected={input.duedate}
            onChange={(date) => setInput((prv) => ({ ...prv, duedate: date }))}
          />
        </div>
      </div>

      <button className="btn btn-outline btn-secondary mt-40">Update Homework</button>
    </form>
  </div>

  )
}

export default HomeworkEditForm