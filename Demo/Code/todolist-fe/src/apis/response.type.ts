export type SuccessResponse<T> = {
  success: true
  data: T
}

export type SuccessResponseList<T> = SuccessResponse<T[]> & {
  paging: {
    total: number
    page: number
    limit: number
  }
  filter: {
    status: string
  }
}

export type ErrorResponse = {
  success: false
  error_key: string
  log: string
  message: string
  status_code: number
}
