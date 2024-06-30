import formatDate from "../utils/formatDate"

function HomeworkCard({el, openEdit, homeworkApi, updateList}) {

  const hdlDelete = async (e) => {
    e.stopPropagation()
    try {
      if(!confirm(`Delete Question :${el.question}`)) {
        return
      }
      const rs = await homeworkApi.delete(`/${el.id}`)
      updateList()
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div className="card bg-base-100 w-4/5 max-w-[900px] mx-auto shadow-xl">
    <div className="card-body gap-4" onClick={()=>openEdit(el)}>
      <div className="flex justify-between">
        <h2 className="card-title">{el.subject.title} 
          <div className={`badge badge-outline ${el.published? 'badge-primary' : ''} p-2`}>{el.published? '':'un-'}published</div>
        </h2>
        <button 
          className="btn btn-error btn-outline h-6 min-h-0 "
          onClick={hdlDelete}  
        >delete</button>
      </div>
      <div className="flex justify-between">
        <p className="flex-grow-0">Start date : {formatDate(new Date(el.startdate))}</p>
        <p className="flex-grow-0">Due date : {formatDate(new Date(el.duedate))}</p>
      </div>
      <h2 className="text-2xl">{el.question}</h2>
    </div>
  </div>
  )
}

export default HomeworkCard