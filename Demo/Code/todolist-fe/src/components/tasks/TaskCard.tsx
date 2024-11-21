import { motion } from "framer-motion"
import React from "react"
import { TaskType } from "~/types/task.type"
import DeleteTaskBtn from "./DeleteTaskBtn"
import DropIndicator from "./DropIndicator"
import Tag from "./Tag"
import TaskModal from "./TaskModal"
import UpdateTaskPopover from "./UpdateTaskPopover"

type TaskCardProps = TaskType & {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, tag, status, description, handleDragStart }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <DropIndicator beforeId={id.toString()} column={status} />
      <motion.div
        className='mb-4 min-h-[100px] w-full max-w-[456px] cursor-grab rounded-md border border-gray-300 p-4 hover:border-blue-600 hover:bg-gray-200 active:cursor-grabbing'
        draggable
        layout
        layoutId={id.toString()}
        onDragStart={(e: unknown) => handleDragStart(e as React.DragEvent<HTMLDivElement>, id)}
      >
        <p className='mb-1 line-clamp-2 truncate text-lg font-bold'>{title}</p>
        <p className='mb-4 truncate text-ellipsis text-base'>{description}</p>

        <div className='flex items-center justify-between'>
          <div className='flex flex-wrap'>{tag != "" && <Tag tagName={tag} selected />}</div>
          <div className='flex gap-2'>
            <TaskModal id={id} open={isModalOpen} setOpen={setIsModalOpen} />
            <UpdateTaskPopover id={id} title={title} description={description} status={status} tag={tag} />
            <DeleteTaskBtn id={id} />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default TaskCard
