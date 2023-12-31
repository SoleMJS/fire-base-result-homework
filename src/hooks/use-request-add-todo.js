import { useState } from 'react'

export const useRequestAddTodo = refreshTodos => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodo = () => {
		setIsCreating(true)
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'Новая задача',
				completed: false,
			}),
		})
			.then(rawRes => rawRes.json())
			.then(res => {
				console.log('todo created, res: ', res)
				refreshTodos()
			})
			.finally(() => setIsCreating(false))
	}

	return { isCreating, requestAddTodo }
}
