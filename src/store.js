// store.js
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { START_LOADING, STOP_LOADING, UPDATE_TODOS } from './actionsTypes'

const initialState = {
	todos: {},
	isLoading: true,
}

const todosReducer = (state = initialState.todos, action) => {
	switch (action.type) {
		case UPDATE_TODOS:
			return action.payload.todos
		default:
			return state
	}
}

const loadingReducer = (state = initialState.isLoading, action) => {
	switch (action.type) {
		case START_LOADING:
			return true
		case STOP_LOADING:
			return false
		default:
			return state
	}
}

const rootReducer = combineReducers({
	todos: todosReducer,
	isLoading: loadingReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
