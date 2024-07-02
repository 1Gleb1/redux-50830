import { createSlice } from "@reduxjs/toolkit";
import { ulid } from "ulid";


export type TodoItem = {
  id: string,
  text: string,
  isChecked: boolean
}

export type TFilter = 'all' | 'active' | 'completed'

export const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoList: <TodoItem[]>[],
    filter: <TFilter>'all',
  },
  reducers: {
    addTask: (state, action )=> {
      state.todoList.push({id: ulid(), text: action.payload, isChecked: false})
    },
    deleteTask: (state, action )=> {
      state.todoList = state.todoList.filter(todo => todo.id!== action.payload)
    },
    updateTask: (state, action )=> {
      state.todoList = state.todoList.map(todo => todo.id === action.payload ? {...todo, isChecked:!todo.isChecked} : todo)
    },
    setFilter: (state, action )=> {
      state.filter = action.payload
    }
  }
})

export const filterByChecked = (state: any) => {
  switch (state.todos.filter) {
    case 'all':
      return state.todos.todoList
    case 'completed':
      return state.todos.todoList.filter((todo:TodoItem) => todo.isChecked)
    case 'active':
      return state.todos.todoList.filter((todo:TodoItem) =>!todo.isChecked)
    default:
      return state.todos.todoList
  }
}

export const { addTask, deleteTask, updateTask, setFilter} = todoSlice.actions
