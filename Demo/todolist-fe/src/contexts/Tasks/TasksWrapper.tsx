import { PropsWithChildren, useEffect, useState } from "react"
import TaskService from "~/apis/task"
import { TaskCreateType, TaskType } from "~/types/task.type"
import TasksContext from "./TasksContext"

// const sleep = (delay: number = 1000) => new Promise((resolve) => setTimeout(resolve, delay))

const TasksWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const getTasks = async () => {
    setIsFetching(true)
    const result = await TaskService.getTasks()

    setIsFetching(false)
    if (!result.success) return

    setTasks(result.data)
  }

  const getTask = async (id: number) => {
    setIsFetching(true)
    const result = await TaskService.getTask(id)

    setIsFetching(false)
    if (!result.success) return

    return result.data
  }

  const createTask = async (task: TaskCreateType) => {
    setIsFetching(true)
    const result = await TaskService.createTask(task)

    if (!result.success) return false

    await getTasks()
    setIsFetching(false)

    return true
  }

  const updateTask = async (id: number, task: TaskCreateType) => {
    setIsFetching(true)

    const result = await TaskService.updateTask(id, task)

    setIsFetching(false)

    if (!result.success) return false

    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...task } : t)))
    return true
  }

  const deleteTask = async (id: number) => {
    setIsFetching(true)

    const result = await TaskService.deleteTask(id)

    if (!result.success) return false

    setIsFetching(false)

    setTasks((prev) => prev.filter((t) => t.id !== id))
    return true
  }

  // console.log(tasks.map((task) => `${task.id} - ${task.status}`))

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <TasksContext.Provider value={{ tasks, isFetching, setTasks, getTask, updateTask, createTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  )
}
export default TasksWrapper
