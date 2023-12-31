import { ref, set } from 'firebase/database'
import { useState } from 'react'
import { db } from '../firebase'

export const useRequestUpdateTodo = () => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodo = () => {
		setIsUpdating(true)

		const todoDbRef = ref(db, 'todos/2')

		set(todoDbRef, {
			title: 'Новая задача',
			completed: false,
		})
			.then(res => {
				console.log('Todo updated', res)
			})
			.finally(() => setIsUpdating(false))
	}

	return {
		isUpdating,
		requestUpdateTodo,
	}
}
