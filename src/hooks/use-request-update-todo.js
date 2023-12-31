import { useState } from 'react'

export const useRequestUpdateTodo = refreshTodos => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodo = () => {
		setIsUpdating(true)
		fetch('http://localhost:3005/todos/11', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'Купить продукты',
				completed: false,
			}),
		})
			.then(rawRes => rawRes.json())
			.then(res => {
				console.log('Todo updated', res)
				refreshTodos()
			})
			.finally(() => setIsUpdating(false))
	}

	return {
		isUpdating,
		requestUpdateTodo,
	}
}
