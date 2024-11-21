import React, { useContext, useMemo, useState } from "react"

import TasksContext from "~/contexts/Tasks/TasksContext"
import { StatusEnum } from "~/enums/status.enum"
import DropIndicator from "./DropIndicator"
import TaskCard from "./TaskCard"

interface TaskColumnProps {
  status: StatusEnum
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status }) => {
  const { tasks, setTasks, updateTask } = useContext(TasksContext)

  const filteredTasks = useMemo(() => tasks.filter((task) => task.status === status), [tasks, status])

  const [active, setActive] = useState(false)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("cardId", id.toString())
  }

  const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId")

    setActive(false)
    clearHighlights()

    const indicators = getIndicators()
    const { element } = getNearestIndicator(e, indicators)

    const before = element.dataset.before || "-1"

    if (before !== cardId) {
      let copy = [...tasks]

      let cardToTransfer = copy.find((c) => c.id === Number(cardId))

      if (!cardToTransfer) return

      cardToTransfer = { ...cardToTransfer, status }

      const isSuccessful = await updateTask(Number(cardId), cardToTransfer)

      if (!isSuccessful) return

      copy = copy.filter((c) => c.id !== Number(cardId))

      const moveToBack = before === "-1"

      if (moveToBack) {
        copy.push(cardToTransfer)
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === Number(before))
        if (insertAtIndex === -1) return

        copy.splice(insertAtIndex, 0, cardToTransfer)
      }

      setTasks(copy)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    highlightIndicator(e)
    setActive(true)
  }

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators()
    indicators.forEach((i) => {
      i.style.opacity = "0"
    })
  }

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators()
    clearHighlights(indicators)

    const el = getNearestIndicator(e, indicators)
    el.element.style.opacity = "1"
  }

  const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = e.clientY - (box.top + DISTANCE_OFFSET)

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1]
      }
    )

    return el
  }

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${status}"]`)) as HTMLElement[]
  }

  const handleDragLeave = () => {
    clearHighlights()
    setActive(false)
  }

  return (
    <div className='w-[456px] flex-1 shrink-0 space-y-4'>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? "bg-gray-300/50" : "bg-gray-300/0"}`}
      >
        {filteredTasks.map((task, index) => (
          <React.Fragment key={index}>
            <TaskCard key={`${task.id}-${index}`} {...task} handleDragStart={handleDragStart} />
          </React.Fragment>
        ))}
        <DropIndicator beforeId={null} column={status} />
      </div>
    </div>
  )
}

export default TaskColumn
