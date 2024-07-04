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
		}
	})
})

const useHomework = create(homeworkStore) 

export {useHomework}