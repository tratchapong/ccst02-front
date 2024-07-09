/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import {  useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useHomework } from "../stores/store";
import { SelectList } from "./SelectList";
import { SelectSubject } from "./SelectSubject";

function HomeworkEditForm({ input, setInput }) {
  // const subject = useHomework((state) => state.subject);
  // const getSubject = useHomework((state) => state.getSubject);
  const updateData = useHomework((state) => state.updateData);

  // useEffect(() => {
  //   getSubject();
  // }, []);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateData(input.id, input);
      // document.getElementById('editform').close()
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="border w-4/6 min-w-[600px] flex flex-col gap-3 mx-auto p-3">
      <h1 className="text-2xl">Edit Homework</h1>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        {/* <label className="form-control w-full max-w-xs">
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
          { subject.map( el => (
            <option key={el.id} value={el.id}>{el.title}</option>
          ))}
        </select>
      </label> */}
        <SelectSubject
          value={input.subject_id}
          onChange={(val) => setInput((prv) => ({ ...prv, subject_id: val }))}
        />
        {/* <SelectList
          list={subject}
          onChange={(val) => setInput((prv) => ({ ...prv, subject_id: val }))}
        /> */}
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
              onChange={(e) =>
                setInput((prv) => ({ ...prv, published: e.target.checked }))
              }
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
              onChange={(date) =>
                setInput((prv) => ({ ...prv, startdate: date }))
              }
            />
          </div>
          <div className="flex gap-4">
            <label>Due date: </label>
            <DatePicker
              className="cursor-pointer bg-violet-300"
              dateFormat="dd/MM/yyyy"
              selected={input.duedate}
              onChange={(date) =>
                setInput((prv) => ({ ...prv, duedate: date }))
              }
            />
          </div>
        </div>

        <button className="btn btn-outline btn-secondary mt-40">
          Update Homework
        </button>
      </form>
    </div>
  );
}

export default HomeworkEditForm;
