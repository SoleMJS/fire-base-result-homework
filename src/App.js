import { useState } from 'react'
import './App.css'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodo,
	useRequestUpdateTodo,
} from './hooks'

function App() {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag)

	const { isLoading, todos } = useRequestGetTodo()
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos)
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos)
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos)

	const [searchTerm, setSearchTerm] = useState('')
	const [sortBy, setSortBy] = useState('')

	const filteredTodos = Object.values(todos).filter(todo =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const sortedTodos = [...filteredTodos].sort((a, b) => {
		if (sortBy === 'asc') {
			return a.title.localeCompare(b.title)
		} else if (sortBy === 'desc') {
			return b.title.localeCompare(a.title)
		}
		return 0
	})

	return (
		<div className='container mt-4'>
			<h1>Todo List</h1>
			{isLoading ? (
				<div className='loader'></div>
			) : (
				<>
					<div className='d-flex justify-content-between align-items-center mb-3'>
						<div>
							<label htmlFor='search'>Поиск:</label>
							<input
								type='text'
								id='search'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='form-control'
							/>
						</div>
						<div>
							<label htmlFor='sort'>Сортировка:</label>
							<select
								id='sort'
								value={sortBy}
								onChange={e => setSortBy(e.target.value)}
								className='form-control'
							>
								<option value=''>Без сортировки</option>
								<option value='asc'>По возрастанию</option>
								<option value='desc'>По убыванию</option>
							</select>
						</div>
					</div>

					<ul className='list-group'>
						{sortedTodos.map(({ id, title }) => (
							<li key={id} className='list-group-item'>
								{title}
							</li>
						))}
					</ul>

					<button
						disabled={isCreating}
						className='btn btn-primary m-2'
						onClick={requestAddTodo}
					>
						Добавить задачу
					</button>
					<button
						className='btn btn-primary m-2'
						disabled={isUpdating}
						onClick={requestUpdateTodo}
					>
						Обновить задачу
					</button>
					<button
						className='btn btn-danger m-2'
						disabled={isDeleting}
						onClick={requestDeleteTodo}
					>
						Удалить задачу
					</button>
				</>
			)}
		</div>
	)
}

export default App
