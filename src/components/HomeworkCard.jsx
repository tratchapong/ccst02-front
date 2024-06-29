import React from 'react'

function HomeworkCard({el}) {
  return (
    <div className="card bg-base-100 w-4/5 max-w-[900px] mx-auto shadow-xl">
    <div className="card-body gap-4">
      <div className="flex justify-between">
        <h2 className="card-title">{el.subject.title} 
          <div className={`badge badge-outline ${el.published? 'badge-primary' : ''} p-2`}>{el.published? '':'un-'}published</div>
        </h2>
        <button className="btn btn-error btn-outline h-6 min-h-0 ">delete</button>
      </div>
      <div className="flex justify-between">
        <p className="flex-grow-0">Start date : {new Date(el.startdate).toDateString()}</p>
        <p className="flex-grow-0">Due date : {new Date(el.duedate).toDateString()}</p>
      </div>
      <h2 className="text-2xl">{el.question}</h2>
    </div>
  </div>
  )
}

export default HomeworkCard