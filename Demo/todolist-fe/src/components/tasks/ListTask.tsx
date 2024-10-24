import { useContext, useMemo } from "react"
import doneIcon from "~/assets/check-mark-button.png"
import todoIcon from "~/assets/direct-hit.png"
import doingIcon from "~/assets/glowing-star.png"
import TasksContext from "~/contexts/Tasks/TasksContext"
import { StatusEnum } from "~/enums/status.enum"
import TaskColumn from "./TaskColumn"

interface TaskColumn {
  title: string
  icon: string
  status: StatusEnum
}

const ListTask: React.FC = () => {
  const { tasks } = useContext(TasksContext)

  const countTasks: { [key in StatusEnum]: number } = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      },
      {} as { [key in StatusEnum]: number }
    )
  }, [tasks])

  const TaskColumns: TaskColumn[] = [
    {
      title: "To do",
      icon: todoIcon,
      status: StatusEnum.TODO
    },
    {
      title: "Doing",
      icon: doingIcon,
      status: StatusEnum.DOING
    },
    {
      title: "Done",
      icon: doneIcon,
      status: StatusEnum.DONE
    }
  ]
  return (
    <main className='h-[70vh] px-16 py-4'>
      <div className='flex h-16 w-full gap-4'>
        {TaskColumns.map((column, index) => (
          <h2 key={index} className='mb-4 flex w-1/3 items-center justify-between rounded-md bg-gray-200 p-2'>
            <span className='flex items-center text-xl font-bold'>
              <img className='mr-2 w-7' src={column.icon} alt='' />
              {column.title}
            </span>
            <span className='text-xl font-bold'>{countTasks[column.status]}</span>
          </h2>
        ))}
      </div>
      <div className='no-scrollbar h-[calc(100%-64px)] overflow-auto'>
        <div className='flex w-full gap-4'>
          <TaskColumn status={StatusEnum.TODO} />
          <TaskColumn status={StatusEnum.DOING} />
          <TaskColumn status={StatusEnum.DONE} />
        </div>
      </div>
    </main>
  )
}
export default ListTask
