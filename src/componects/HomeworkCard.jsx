/* eslint-disable react/prop-types */


function HomeworkCard({el}) {
  
  return (
    <div className="card bg-base-100 w-4/5 mx-auto max-w-[900px] shadow-xl">
    <div className="card-body gap-4">
      <div className="flex justify-between">
        <h2 className="card-title">{el.subject.title}
          <div className={`badge  badge-outline ${el.published? 'badge-primary' : '' }`}>
            {el.published? '':'un-'}published
          </div>
        </h2>
        <button className="btn  btn-outline btn-error h-6 min-h-6">delete</button>
      </div>
      <div className="flex justify-between">
        <div>{new Date(el.startdate).toDateString()}</div>
        <div>{new Date(el.duedate).toDateString()}</div>
      </div>
      <h2 className="text-2xl">{el.question}</h2>
    </div>
  </div>
  )
}

export default HomeworkCard