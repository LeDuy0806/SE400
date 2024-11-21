import React, { useContext, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import TasksContext from "~/contexts/Tasks/TasksContext"
import { StatusEnum } from "../../enums/status.enum"
import { TaskCreateType } from "../../types/task.type"
import Tag from "./Tag"

const TaskForm: React.FC = () => {
  const { createTask, isFetching } = useContext(TasksContext)

  const [taskData, setTaskData] = useState<TaskCreateType>({
    title: "",
    description: "",
    status: StatusEnum.TODO,
    tag: "High"
  })

  const checkTag = (tag: string) => {
    return taskData.tag === tag
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTaskData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!taskData.title || !taskData.description) return

    await createTask(taskData)

    setTaskData({
      title: "",
      description: "",
      status: StatusEnum.TODO,
      tag: "High"
    })
  }

  return (
    <header className='flex h-[24vh] items-center justify-center border-b border-gray-300 py-2'>
      <form onSubmit={handleSubmit} className='w-2/3'>
        <input
          type='text'
          name='title'
          value={taskData.title}
          className='mb-3 w-full rounded-md border border-gray-400 bg-gray-100 p-2 text-lg font-medium text-black'
          placeholder='Enter your task'
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={taskData.description}
          className='mb-3 w-full rounded-md border border-gray-400 bg-gray-100 p-2 text-lg font-medium text-black'
          placeholder='Enter your task description'
          onChange={handleChange}
        />

        <div className='flex items-center justify-between'>
          <div>
            {["High", "Medium", "Low"].map((tag) => (
              <Tag
                key={tag}
                tagName={tag}
                selectTag={(tagName) => {
                  setTaskData((prev) => ({
                    ...prev,
                    tag: tagName
                  }))
                }}
                selected={checkTag(tag)}
              />
            ))}
          </div>

          <div className='flex items-center'>
            <select
              name='status'
              value={taskData.status}
              className='h-10 w-32 rounded-md border border-gray-600 px-2 text-base font-medium'
              onChange={handleChange}
              aria-labelledby='status'
              aria-label="Task's status"
            >
              {Object.values(StatusEnum).map((status: string) => (
                <option key={status} value={status}>
                  {status
                    .toLocaleLowerCase()
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              ))}
            </select>
            <button
              type='submit'
              className='ml-2 flex h-10 w-32 items-center justify-center rounded-md bg-indigo-600 px-4 text-base font-medium text-white'
            >
              {isFetching ? <AiOutlineLoading3Quarters className='animate-spin text-lg text-blue-500' /> : "+ Add Task"}
            </button>
          </div>
        </div>
      </form>
    </header>
  )
}

export default TaskForm
