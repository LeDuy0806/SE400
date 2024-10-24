import React from "react"

import ListTask from "./components/tasks/ListTask"
import TaskForm from "./components/tasks/TaskForm"
import TasksWrapper from "./contexts/Tasks/TasksWrapper"

const App: React.FC = () => {
  return (
    <div className='h-dvh'>
      <TasksWrapper>
        <h1 className='h-[6vh] pt-1 text-center text-3xl font-bold'>Todo List</h1>
        <TaskForm />
        <ListTask />
      </TasksWrapper>
    </div>
  )
}

export default App
