import { ref, remove } from 'firebase/database'
import { useState } from 'react'
import { db } from '../firebase'

export const useRequestDeleteTodo = refreshTodos => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = () => {
		setIsDeleting(true)

		const todoDbRef = ref(db, 'todos/3')

		remove(todoDbRef)
			.then(res => {
				console.log('Todo deleted', res)
				refreshTodos()
			})
			.finally(() => setIsDeleting(false))
	}

	return {
		isDeleting,
		requestDeleteTodo,
	}
}
