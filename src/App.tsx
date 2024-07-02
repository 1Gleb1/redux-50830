import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, deleteTask, filterByChecked, updateTask } from "./store/todoSlice"
import { TodoItem } from "./store/todoSlice"
import { AppStore } from "./store/store"

function App() {
  const dispatch = useDispatch()
  const [text, setText] = useState<string>("")
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>("all")

  const todoList: TodoItem[] = useSelector((state: ReturnType<AppStore['getState']>)  => state.todos.todoList)
  const sortedList: TodoItem[] = useSelector((state: ReturnType<AppStore['getState']>)  => state.todos.sortedList)
  
  const addTodo = (event : Event) => { 
      event.preventDefault()
      dispatch(addTask(text))
      setText("")
  }
  const deleteTodo = (id:number) => dispatch(deleteTask(id))
  const updateTodo = (id:number) =>  dispatch(updateTask(id))
  const filterTodo = (isChecked: boolean) => dispatch(filterByChecked(isChecked))

  const isList = filter === 'all' ? !todoList.length : !sortedList.length

  const update = (id) => {
    updateTodo(id)
    filterTodo(filter)
  }

  useEffect(() => {
    filterTodo(filter)
  }, [filter])
  
    
  return (
    <div className="h-[100vh] bg-slate-600"> 
      <div className="flex flex-col items-center gap-4 pt-[15%]">
        <form onSubmit={(event) => addTodo(event)} className="flex gap-8">
          <input className="border" type="text" value={text} onChange={e => setText(e.target.value)} />
          <button onClick={addTodo} disabled={text.length == 0}>Add</button>
        </form>

        <div className="flex gap-8">
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('all')}>All</button>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          {isList && <div className="text-center">No tasks</div>}
          {filter === 'all' ? todoList?.map((todo: TodoItem ) => (
            <div key={todo.id} className="w-80 bg-slate-400 flex justify-between items-center p-4 border-transparent rounded-md overflow-hidden">
              <span className="w-[50%]">{todo.text}</span>
              <input type="checkbox" checked={todo.isChecked} onChange={() => updateTodo(todo.id)} />
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))
          :
          sortedList?.map((todo: TodoItem ) => (
            <div key={todo.id} className="w-80 bg-slate-400 flex justify-between items-center p-4 border-transparent rounded-md overflow-hidden">
              <span className="w-[50%]">{todo.text}</span>
              <input type="checkbox" checked={todo.isChecked} onChange={() => update(todo.id)} />
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))
        } 
        </div>
      </div> 
    </div>
  )
}

export default App
