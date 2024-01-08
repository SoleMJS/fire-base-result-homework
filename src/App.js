// App.js
import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import './App.css'
import {
	requestAddTodo,
	requestDeleteTodo,
	requestGetTodo,
	requestUpdateTodo,
} from './actions'
import store from './store'

const App = () => {
	const dispatch = useDispatch()
	const { todos, isLoading } = useSelector(state => state)

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

	useEffect(() => {
		dispatch(requestGetTodo())
	}, [dispatch])

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
						disabled={isLoading}
						className='btn btn-primary m-2'
						onClick={() => dispatch(requestAddTodo())}
					>
						Добавить задачу
					</button>
					<button
						className='btn btn-primary m-2'
						disabled={isLoading}
						onClick={() => dispatch(requestUpdateTodo())}
					>
						Обновить задачу
					</button>
					<button
						className='btn btn-danger m-2'
						disabled={isLoading}
						onClick={() => dispatch(requestDeleteTodo())}
					>
						Удалить задачу
					</button>
				</>
			)}
		</div>
	)
}

const AppWrapper = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}

export default AppWrapper
