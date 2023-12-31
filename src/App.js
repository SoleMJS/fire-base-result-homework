import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [todos, setTodos] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then(json => setTodos(json))
	}, [])

	return (
		<div className='container mt-4'>
			<h1>Todo List</h1>
			<ul className='list-group'>
				{todos.map(todo => (
					<li key={todo.id} className='list-group-item'>
						{todo.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
