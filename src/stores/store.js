import {create} from 'zustand'
import {homeworkApi, subjectApi, addTokenAllReq, addToken} from '../api/homeworkApi'
import { toast } from '@/components/ui/use-toast'

const homeworkStore = (set,get) => ({
	loading : false,
	homeworks : [],
	subject : [],
	fetchData : async ()=> {
		try {
			set(state => ({...state, loading:true}))
			const rs = await homeworkApi.get('/',addToken())
			set( state => ({...state, homeworks: rs.data.homeworks }))
		}catch(err) {
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})			
		}finally {
			set(state => ({...state , loading: false}))	
			get(state => state.fetchData())		
		}
	},

	deleteData : async (id)=>{
		try {
			const rs = await homeworkApi.delete(`/${id}`, addToken())
			get().fetchData()
			return rs
		}catch(err){
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}
	},
	updateData : async (id, body)=> {
		try {
			const rs = await homeworkApi.put(`/${id}`,body, addToken())
			toast({title: 'update...'})
			get().fetchData()
			return rs
		}catch(err){
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}
	},
	createData : async (body) => {
		try {
			const rs = await homeworkApi.post(`/`,body, addToken())
			get().fetchData()
			return rs
		}catch(err){
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}
	},
	getSubject : async () => {
		try {
			const rs = await subjectApi.get('/')
			set( state => ({...state, subject : rs.data.subject}))
		}catch(err) {
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}
	}
})

const useHomework = create(homeworkStore) 

export {useHomework}