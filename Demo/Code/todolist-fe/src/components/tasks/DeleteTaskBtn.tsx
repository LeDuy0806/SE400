import * as Popover from "@radix-ui/react-popover"
import { useContext } from "react"
import { FiTrash2 } from "react-icons/fi"
import TasksContext from "~/contexts/Tasks/TasksContext"

type DeleteTaskBtnProps = {
  id: number
}

const DeleteTaskBtn: React.FC<DeleteTaskBtnProps> = ({ id }) => {
  const { deleteTask, isFetching } = useContext(TasksContext)

  const onSubmit = async () => {
    await deleteTask(id)
  }
  return (
    <Popover.Root>
      <Popover.Trigger
        disabled={isFetching}
        className='flex size-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600'
        aria-label='Delete Task'
      >
        <FiTrash2 />
      </Popover.Trigger>
      <Popover.Content
        sideOffset={5}
        side='top'
        alignOffset={5}
        className='rounded-md border border-gray-300 bg-white px-6 py-4 shadow-md'
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold'>Delete Task</h1>
        </div>
        <p className='mt-2 text-gray-500'>Are you sure you want to delete this task?</p>

        <div className='mt-4 flex w-full items-center justify-center gap-2'>
          <button
            onClick={onSubmit}
            disabled={isFetching}
            className='h-10 w-full rounded-md bg-red-500 p-2 text-white hover:bg-red-600'
          >
            {isFetching ? "Deleting..." : "Delete"}
          </button>

          <Popover.Close className='h-10 w-full rounded-md bg-gray-300 p-2 text-black hover:bg-gray-400'>
            Cancel
          </Popover.Close>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
export default DeleteTaskBtn
