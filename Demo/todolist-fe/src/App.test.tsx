import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import App from "./App"
import TaskService from "./apis/task"
import { StatusEnum } from "./enums/status.enum"

// Mock API call
vi.spyOn(TaskService, "getTasks").mockResolvedValue({
  success: true,
  data: [
    {
      id: 1,
      created_at: "2024-10-04T17:18:02+07:00",
      updated_at: "2024-10-04T17:29:49+07:00",
      title: "Future Marketing Strategist",
      description: "Reiciendis nulla repudiandae repudiandae molestiae officiis nulla a explicabo quia.",
      status: StatusEnum.TODO,
      tag: "High"
    }
  ],
  paging: {
    page: 1,
    limit: 20,
    total: 14
  },
  filter: {
    status: ""
  }
})

describe("App Component", () => {
  it('should set document title to "Todo List" after rendering', async () => {
    render(<App />)

    expect(
      screen.getByRole("heading", {
        level: 1
      })
    ).toHaveTextContent("Todo List")
  })

  it("should call TaskService.getTasks when the component is rendered", async () => {
    render(<App />)

    expect(TaskService.getTasks).toHaveBeenCalled()
  })
})
