import { push, ref } from 'firebase/database'
import { useState } from 'react'
import { db } from '../firebase'

export const useRequestAddTodo = () => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodo = () => {
		setIsCreating(true)

		const todosDbRef = ref(db, 'todos')

		push(todosDbRef, {
			title: 'Новая задача',
			completed: false,
		})
			.then(res => {
				console.log('todo created, res: ', res)
			})
			.finally(() => setIsCreating(false))
	}

	return { isCreating, requestAddTodo }
}
