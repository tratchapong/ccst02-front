/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import HomeworkCard from "../componects/HomeworkCard";

const homeworkApi = axios.create({
  baseURL: "http://localhost:8888/homework",
});

function TeacherHome() {
  homeworkApi.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
  });

  const [homeworks, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const el = homeworks[0]

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const rs = await homeworkApi.get("/");
        setHomework(rs.data.homeworks);
      } catch (err) {
        console.log(err.message);
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
    <h1 className="text-3xl text-center">Teacher Home</h1>

    { homeworks.map( el => (
      <HomeworkCard key={el.id} el={el} />
    ))

    }
    </>
  );
}

export default TeacherHome;
