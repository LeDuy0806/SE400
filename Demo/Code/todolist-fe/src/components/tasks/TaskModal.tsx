import * as Popover from "@radix-ui/react-popover"
import React, { useContext } from "react"
import { IoClose, IoEyeSharp } from "react-icons/io5"
import TasksContext from "~/contexts/Tasks/TasksContext"
import { TaskType } from "~/types/task.type"
import Tag from "./Tag"

type TaskModalProps = {
  id: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskModal: React.FC<TaskModalProps> = ({ id, open, setOpen }) => {
  const { getTask } = useContext(TasksContext)

  const [task, setTask] = React.useState<TaskType | undefined>(undefined)

  React.useEffect(() => {
    if (open) {
      getTask(id).then((data) => {
        if (!data) {
          return setOpen(false)
        }
        setTask(data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open])

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal>
      <Popover.Trigger
        className='flex items-center justify-center rounded-full bg-lime-500 p-2 text-white hover:bg-lime-600'
        aria-label='View Task'
      >
        <IoEyeSharp />
      </Popover.Trigger>
      {task && (
        <Popover.Content
          sideOffset={5}
          side='top'
          alignOffset={5}
          align='center'
          className='min-w-sm flex max-w-sm flex-col items-center justify-center space-y-2 rounded-md border border-gray-300 bg-white px-6 py-4 shadow-md'
        >
          <div className='flex w-full items-center justify-between border-b border-gray-300 pb-2'>
            <h1 className='text-xl font-bold text-gray-600'>Task Detail</h1>
            <Popover.Close className='size-6 text-gray-400 hover:text-gray-600'>
              <IoClose className='size-6' />
            </Popover.Close>
          </div>
          <div className='mt-4 space-y-2'>
            <h1 className='text-lg font-bold'>{task.title}</h1>
            <p className='text-base text-gray-500'>{task.description}</p>
            <div className='flex flex-wrap'>{task.tag != "" && <Tag tagName={task.tag} selected />}</div>
            <p>
              Created:{" "}
              {new Date(task.created_at).toLocaleString("en-US", {
                timeZone: "Asia/Ho_Chi_Minh"
              })}
            </p>
          </div>
          <Popover.Close className='h-10 w-20 rounded-md bg-gray-300 p-2 text-black hover:bg-gray-400'>
            Close
          </Popover.Close>
        </Popover.Content>
      )}
    </Popover.Root>
  )
}
export default TaskModal
