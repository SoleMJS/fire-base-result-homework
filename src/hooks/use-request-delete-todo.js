import { useState } from 'react'

export const useRequestDeleteTodo = refreshTodos => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = () => {
		setIsDeleting(true)
		fetch('http://localhost:3005/todos/11', {
			method: 'DELETE',
		})
			.then(rawRes => rawRes.json())
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
