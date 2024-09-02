import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"
import { useDeferredValue } from "react"
import { expect } from "vitest"


describe("<Blog />", () => {
  let container

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
    container = render(<Blog blog={ blog } />).container
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
})

