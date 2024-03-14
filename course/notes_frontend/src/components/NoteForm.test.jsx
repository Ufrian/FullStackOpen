import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  // const input = screen.getByRole('textbox')
  // const inputs = screen.getAllByRole('textbox')
  const input = screen.getByPlaceholderText('write note content here')

  const sendButton = screen.getByText('save')

  // await user.type(inputs[0], 'testing a form...')
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})