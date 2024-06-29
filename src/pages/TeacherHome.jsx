import axios from "axios";
import { useState, useEffect } from "react";

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

  homeworkApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  const el = homeworks[0]
  console.log('el=', el)
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
  }, []);

  if (loading) {
    return <p className="text-xl">Loading...</p>;
  }
  return (
    <>
      <div>TeacherHome</div>
      <hr />
      {homeworks.map((el) => (
        <p key={el.id}>{JSON.stringify(el)}</p>
      ))}

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
    </>
  );
}

export default TeacherHome;
