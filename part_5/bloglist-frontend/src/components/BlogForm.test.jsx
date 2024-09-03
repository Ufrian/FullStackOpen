import { render, screen } from "@testing-library/react"
import BlogFrom from "./BlogForm"
import userEvent from "@testing-library/user-event"
import { expect } from "vitest"

describe("<BlogForm />", () => {
  test("New Blog can be created with right credentials", async () => {
    const mockFn = vi.fn()
    const user = userEvent.setup()

    render(<BlogFrom createBlog={mockFn} />)

    const titleInput = screen.getByTestId("title")
    await user.type(titleInput, "Blog the Test")

    const authorInput = screen.getByTestId("author")
    await user.type(authorInput, "UniTest")

    const urlInput = screen.getByTestId("url")
    await user.type(urlInput, "www.thisisatest.com")

    const createBtn = screen.getByText("create")
    await user.click(createBtn)

    expect(mockFn.mock.calls[0][0]).toBe("Blog the Test")
    expect(mockFn.mock.calls[0][1]).toBe("UniTest")
    expect(mockFn.mock.calls[0][2]).toBe("www.thisisatest.com")
  })
})