import { onValue, push, ref, remove, set } from 'firebase/database'
import { START_LOADING, STOP_LOADING, UPDATE_TODOS } from './actionsTypes'
import { db } from './firebase'

export const startLoading = () => ({
	type: START_LOADING,
})

export const stopLoading = () => ({
	type: STOP_LOADING,
})

export const updateTodos = todos => ({
	type: UPDATE_TODOS,
	payload: {
		todos,
	},
})

export const requestAddTodo = () => {
	return dispatch => {
		dispatch(startLoading())

		const todosDbRef = ref(db, 'todos')

		push(todosDbRef, {
			title: 'Новая задача',
			completed: false,
		})
			.then(() => dispatch(requestGetTodo()))
			.finally(() => dispatch(stopLoading()))
	}
}

export const requestUpdateTodo = () => {
	return dispatch => {
		dispatch(startLoading())

		const todoDbRef = ref(db, 'todos/2')

		set(todoDbRef, {
			title: 'Новая задача',
			completed: false,
		})
			.then(() => dispatch(requestGetTodo()))
			.finally(() => dispatch(stopLoading()))
	}
}

export const requestDeleteTodo = () => {
	return dispatch => {
		dispatch(startLoading())

		const todoDbRef = ref(db, 'todos/3')

		remove(todoDbRef)
			.then(() => dispatch(requestGetTodo()))
			.finally(() => dispatch(stopLoading()))
	}
}

export const requestGetTodo = () => {
	return dispatch => {
		dispatch(startLoading())

		const todosDbRef = ref(db, 'todos')

		return onValue(todosDbRef, snapshot => {
			const loadedTodos = snapshot.val()

			dispatch(updateTodos(loadedTodos))
			dispatch(stopLoading())
		})
	}
}
