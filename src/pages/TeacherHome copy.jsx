/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import HomeworkCard from "../components/HomeworkCard";
import Modal from "../components/Modal";
import HomeworkEditForm from "../components/HomeworkEditForm";
import { homeworkApi, addTokenAllReq } from "../api/homeworkApi";


const initEditData = {
  question: "",
  startdate: new Date(),
  duedate: new Date(),
  published: false,
  subject_id: "",
}

function TeacherHome() {

  addTokenAllReq()

  const [homeworks, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditdata] = useState(initEditData)
  const [reload, setReload] = useState(false)


  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const rs = await homeworkApi.get("/");
        setHomework(rs.data.homeworks);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [reload]);

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
      <h1 className="text-3xl text-center">Teacher Home</h1>

      {homeworks.map((el) => (
        <HomeworkCard key={el.id} el={el} openEdit={openEdit}
          homeworkApi={homeworkApi}
          reFetch={reFetch}
        />
      ))}

      <Modal modal_id={'editform'} onClose={()=> setEditdata(initEditData)}>
        <HomeworkEditForm input={editData} setInput={setEditdata} reFetch={reFetch} />
      </Modal>
    </>
  );
}

export default TeacherHome;
