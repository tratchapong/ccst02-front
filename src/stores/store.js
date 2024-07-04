import {create} from 'zustand'
import {homeworkApi, subjectApi, addTokenAllReq, addToken} from '../api/homeworkApi'
import { toast } from '@/components/ui/use-toast'

const homeworkStore = (set,get) => ({
	loading : false,
	homeworks : [],
	fetchData : () => set( async state => {
		try {
			// console.log(first)
			set(state => ({...state , loading: true}))
			const rs = await homeworkApi.get('/', addToken())
			set(state => ({...state, homeworks: rs.data.homeworks }))
		}catch(err) {
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}finally {
			set(state => ({...state , loading: false}))	
			get(state => state.fetchData())
		}
	}),
	deleteData : (id)=> set( async (state)=>{
		try {
			const rs = await homeworkApi.delete(`/${id}`, addToken())
			get().fetchData()
		}catch(err){
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}
	}),
	updateData : (id, body)=> set( async (state)=>{
		try {
			const rs = await homeworkApi.put(`/${id}`,body, addToken())
			get().fetchData()
		}catch(err){
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}
	}),
	createData : (body)=> set( async (state)=>{
		try {
			const rs = await homeworkApi.post(`/`,body, addToken())
			get().fetchData()
		}catch(err){
			toast({
				title: err.message,
				className: 'bg-red-500 text-white'
			})
		}
	})
})

const useHomework = create(homeworkStore) 

export {useHomework}