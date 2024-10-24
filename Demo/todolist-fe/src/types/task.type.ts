import { StatusEnum } from "../enums/status.enum"

export type TaskType = {
  id: number
  title: string
  description: string
  status: StatusEnum
  tag: string
  created_at: string
  updated_at: string
}

export type TaskCreateType = {
  title: string
  description: string
  status: StatusEnum
  tag: string
}
