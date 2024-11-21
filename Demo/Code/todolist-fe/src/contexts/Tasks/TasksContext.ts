import { createContext } from "react"
import { TaskCreateType, TaskType } from "../../types/task.type"

export type TasksContextType = {
  tasks: TaskType[]
  isFetching: boolean
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
  getTask: (id: number) => Promise<TaskType | undefined>
  createTask: (task: TaskCreateType) => Promise<boolean>
  updateTask: (id: number, task: TaskCreateType) => Promise<boolean>
  deleteTask: (id: number) => Promise<boolean>
}

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  isFetching: false,
  setTasks: () => {},
  getTask: () => Promise.resolve(undefined),
  createTask: () => Promise.resolve(false),
  updateTask: () => Promise.resolve(false),
  deleteTask: () => Promise.resolve(false)
})

export default TasksContext
