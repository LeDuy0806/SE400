import * as Popover from "@radix-ui/react-popover"
import { useContext, useState } from "react"
import { FaEdit } from "react-icons/fa"
import TasksContext from "~/contexts/Tasks/TasksContext"
import { StatusEnum } from "~/enums/status.enum"
import { TaskCreateType, TaskType } from "~/types/task.type"
import Tag from "./Tag"

type UpdateTaskPopoverProps = Omit<TaskType, "created_at" | "updated_at">

const UpdateTaskPopover: React.FC<UpdateTaskPopoverProps> = ({ id, title, tag, status, description }) => {
  const { updateTask, isFetching } = useContext(TasksContext)
  const [open, setOpen] = useState(false)

  const [taskData, setTaskData] = useState<TaskCreateType>({
    title,
    description,
    status,
    tag
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

    const result = await updateTask(id, taskData)

    if (result) {
      setTimeout(() => {
        setOpen(false)
      }, 200)
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        disabled={isFetching}
        className='flex size-8 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600'
        aria-label='Edit Task'
      >
        <FaEdit />
      </Popover.Trigger>
      <Popover.Content
        sideOffset={5}
        side='top'
        alignOffset={5}
        className='rounded-md border border-gray-300 bg-white px-6 py-4 shadow-md'
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold'>Update Task</h1>
        </div>
        <form onSubmit={handleSubmit} className='mt-2'>
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

          <div className='flex w-full items-center justify-between'>
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
            </div>
          </div>
          <div className='mt-4 flex w-full items-center justify-center gap-2'>
            <button
              type='submit'
              disabled={isFetching}
              className='h-10 w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600'
            >
              {isFetching ? "Updating..." : "Update"}
            </button>
            <Popover.Close className='h-10 w-full rounded-md bg-gray-300 p-2 text-black hover:bg-gray-400'>
              Cancel
            </Popover.Close>
          </div>
        </form>
      </Popover.Content>
    </Popover.Root>
  )
}
export default UpdateTaskPopover
