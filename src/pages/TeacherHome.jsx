import axios from "axios";
import { useState, useEffect } from "react";
import HomeworkCard from "../components/HomeworkCard";
import Modal from "../components/Modal";
import HomeworkForm from "./HomeworkForm";
import HomeworkEditForm from "../components/HomeworkEditForm";

const homeworkApi = axios.create({
  baseURL: "http://localhost:8888/homework",
});

// homeworkApi.interceptors.request.use((req) => {
//   console.log(req);
//   return req;
// });
// homeworkApi.interceptors.response.use((res) => {
//   console.log(res);
//   return res;
// });

function TeacherHome() {
  const [homeworks, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, SetEditData] = useState({});
  const [reload, setReload] = useState(false);

  homeworkApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const rs = await homeworkApi.get("/");
        setHomework(rs.data.homeworks);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [reload]);

  const openEdit = (el) => {
    console.log(el)
    SetEditData(el);
    document.getElementById("editform").showModal();
  };

  if (loading) {
    return <p className="text-xl">Loading...</p>;
  }
  return (
    <>
      <h1 className="text-3xl text-center">TeacherHome</h1>

      {homeworks.map((el) => (
        <HomeworkCard key={el.id} el={el} openEdit={openEdit} />
      ))}

      <Modal modal_id="editform" onClose={() => SetEditData({})}>
          <HomeworkEditForm
            el={editData}
            updateList={() => setReload((prv) => !prv)}
          />
      </Modal>
    </>
  );
}

export default TeacherHome;
