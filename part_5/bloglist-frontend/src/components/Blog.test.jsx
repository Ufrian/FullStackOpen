import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"
import { useDeferredValue } from "react"
import { expect, test } from "vitest"


describe("<Blog />", () => {
  let container
  let mockFn

  beforeEach(() => {
    const blog = {
      title: "Foobar the blog",
      author: "J.R.R Martin",
      url: "www.google.com.br",
      likes: 10,
      user: {
        name: "Wolfgang"
      }
    }
    mockFn = vi.fn()
    container = render(<Blog blog={ blog } updateBlog={ mockFn }/>).container
  })

  test("renders title and author by default but dont likes and url", () => {
    const div = container.querySelector(".blog-header")

    expect(div).toHaveTextContent("Foobar the blog")
    expect(div).toHaveTextContent("J.R.R Martin")
    expect(div).not.toHaveTextContent("www.google.com.br")
    expect(div).not.toHaveTextContent("likes", { exact: false })
  })

  test("Numbers of likes and url are shown after button is clicked", async () => {
    const user = userEvent.setup()
    const btn = screen.getByText("view")

    await user.click(btn)

    const div = container.querySelector(".blog-view")

    expect(div).toHaveTextContent("www.google.com.br")
    expect(div).toHaveTextContent("likes: 10")
  })

  test("Like button is called twice", async () => {
    const user = userEvent.setup()
    const likeBtn = screen.getByText("like")

    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(mockFn.mock.calls).toHaveLength(2)
  })
})

