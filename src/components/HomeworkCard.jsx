/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import formatDate from "../utils/formatDate"


function HomeworkCard({el,openEdit, homeworkApi,reFetch}) {
  
  const hdlDelete =async e => {
    try {
      e.stopPropagation()
      if(!confirm("Delete this homework?")) {
        return
      }
      const rs = await homeworkApi.delete(`/${el.id}`)
      reFetch()
    }catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div className="card bg-base-100 w-4/5 mx-auto max-w-[900px] shadow-xl">
    <div className="card-body gap-4" onClick={()=>openEdit(el)}>
      <div className="flex justify-between">
        <h2 className="card-title">{el.subject.title}
          <div className={`badge  badge-outline ${el.published? 'badge-primary' : '' }`}>
            {el.published? '':'un-'}published
          </div>
        </h2>
        <button className="btn  btn-outline btn-error h-6 min-h-6" 
          onClick={hdlDelete}
        >delete</button>
      </div>
      <div className="flex justify-between">
        <div>{formatDate(new Date(el.startdate))}</div>
        <div>{formatDate(new Date(el.duedate))}</div>
      </div>
      <h2 className="text-2xl">{el.question}</h2>
    </div>
  </div>
  )
}

export default HomeworkCard