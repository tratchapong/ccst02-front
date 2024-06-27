import React from "react";

function HomeworkForm() {
  return (
    <div className="min-w-[600px] w-4/6 flex flex-col gap-3 border mx-auto p-3">
      <h1 className="text-4xl">New Homework</h1>
      <form className="flex flex-col gap-2">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Subject</span>
          </div>
          <select className="select select-bordered" defaultValue={'Harry Potter'} onChange={ e=>console.log(e.target.value)}>
            <option disabled value='' >
              Pick one
            </option>
            <option value={1}>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <textarea
          className="textarea textarea-info"
          placeholder="Question"
        ></textarea>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <span className="label-text">Published</span>
            <input type="checkbox" className="toggle toggle-accent" />
          </label>
        </div>
        <div className="form-control flex-row items-baseline gap-5">
          <label className="label-text">Start date:</label>
          <input type="date" className="border" onChange={e=>console.log(e.target.value)} value={'2024-06-09'}/>
        </div>
      </form>
    </div>
  );
}

export default HomeworkForm;
