import { TaskCreateType, TaskType } from "~/types/task.type"
import axiosInstance from "./axios"
import { SuccessResponse, SuccessResponseList } from "./response.type"

class TaskService {
  static async getTasks() {
    return (await axiosInstance.get<SuccessResponseList<TaskType>>("/items")).data
  }

  static async getTask(id: number) {
    return (await axiosInstance.get<SuccessResponse<TaskType>>(`/items/${id}`)).data
  }

  static async createTask(task: TaskCreateType) {
    return (await axiosInstance.post<SuccessResponse<number>>("/items", task)).data
  }

  static async updateTask(id: number, task: TaskCreateType) {
    return (await axiosInstance.put<SuccessResponse<boolean>>(`/items/${id}`, task)).data
  }

  static async deleteTask(id: number) {
    return (await axiosInstance.delete<SuccessResponse<boolean>>(`/items/${id}`)).data
  }
}

export default TaskService
