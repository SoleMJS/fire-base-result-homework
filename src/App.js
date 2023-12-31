import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then(json => setTodos(json))
		setIsLoading(false)
	}, [])

	return (
		<div className='container mt-4'>
			<h1>Todo List</h1>
			<ul className='list-group'>
				{isLoading ? (
					<div className='loader'></div>
				) : (
					todos.map(({ id, title }) => (
						<li key={id} className='list-group-item'>
							{title}
						</li>
					))
				)}
			</ul>
		</div>
	)
}

export default App
