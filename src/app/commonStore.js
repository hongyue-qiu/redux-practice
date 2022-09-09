import { createStore, combineReducers } from 'redux'
import { todoReducer } from '../reducer/todoReducer/todoCommonReducer'
import { counterReducer } from '../reducer/counterReducer/counterCommonReducer'
import { initialCounterState } from '../type/counter'
import { initialTodoState } from '../type/todo'

const rootReducer = combineReducers({ todo: todoReducer, counter: counterReducer })

export const store = createStore(
  rootReducer,
  {
    counter: initialCounterState,
    todo: initialTodoState
  }
)