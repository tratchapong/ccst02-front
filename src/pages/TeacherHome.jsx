/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import HomeworkCard from "../components/HomeworkCard";
import Modal from "../components/Modal";
import HomeworkEditForm from "../components/HomeworkEditForm";
import { useHomework } from "../stores/store";


const initEditData = {
  question: "",
  startdate: new Date(),
  duedate: new Date(),
  published: false,
  subject_id: "",
}

function TeacherHome() {

  // addTokenAllReq()

  // const [homeworks, setHomework] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [editData, setEditdata] = useState(initEditData)
  // const [reload, setReload] = useState(false) 

  const homeworks = useHomework( state => state.homeworks)
  const loading = useHomework( state => state.loading)
  const fetchData = useHomework( state => state.fetchData)

  useEffect(() => {
    fetchData()
  }, []);

  const openEdit = (el) => {
    setEditdata(el)
    document.getElementById('editform').showModal()
  }

  const reFetch = () => setReload(prv=>!prv)

  if (loading) {
    return <p className="text-xl">Loading...</p>;
  }
  return (
    <>
      {/* {JSON.stringify(homeworks)} */}
      <h1 className="text-3xl text-center">Teacher Home</h1>

      {homeworks.map((el) => (
        <HomeworkCard key={el.id} el={el} openEdit={openEdit} />
      ))}

      <Modal modal_id={'editform'} onClose={()=> setEditdata(initEditData)}>
        <HomeworkEditForm input={editData} setInput={setEditdata} />
      </Modal>
    </>
  );
}

export default TeacherHome;
