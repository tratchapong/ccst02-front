import axios from "axios"

const homeworkApi = axios.create({
  baseURL : 'http://localhost:8888/homework'
})

export default homeworkApi