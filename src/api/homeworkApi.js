import axios from "axios"

const homeworkApi = axios.create({
  baseURL : 'http://localhost:8888/homework'
})

const subjectApi = axios.create({
  baseURL : 'http://localhost:8888/subject'
})

const reqAddToken = () => {
  homeworkApi.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
  });
}


export { homeworkApi, subjectApi, reqAddToken }