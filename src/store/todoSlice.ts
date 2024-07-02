import { createSlice } from "@reduxjs/toolkit";
import { ulid } from "ulid";


export type TodoItem = {
  id: string,
  text: string,
  isChecked: boolean
}


export const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoList: <TodoItem[]>[],
    sortedList: <TodoItem[]>[]
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
    filterByChecked: (state, action )=> {
      if(action.payload === 'active') {
        state.sortedList = state.todoList.filter(todo => todo.isChecked === false)
      } else if(action.payload === 'completed') {
        state.sortedList = state.todoList.filter(todo => todo.isChecked === true)
      } else  {
       state.todoList
      }
    }
  }
})

export const { addTask, deleteTask, updateTask, filterByChecked } = todoSlice.actions
