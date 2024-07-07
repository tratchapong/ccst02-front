import axios from "axios"

const homeworkApi = axios.create({
  baseURL : 'http://localhost:8888/homework'
})

const subjectApi = axios.create({
  baseURL : 'http://localhost:8888/subject'
})

const authApi = axios.create({
  baseURL : 'http://localhost:8888/auth'
})

const userApi = axios.create({
  baseURL : 'http://localhost:8888/user'
})

const addTokenAllReq = () => {
  homeworkApi.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
  });
}

const addToken = () => ( {
  headers: { Authorization : `Bearer ${localStorage.getItem("token")}`}
} )

export {homeworkApi, subjectApi, authApi, addTokenAllReq, addToken}