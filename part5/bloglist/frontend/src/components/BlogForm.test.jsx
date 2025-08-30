import BlogForm from "./BlogForm";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('BlogForm calls addBlog with the right details', async () => {
  const user = userEvent.setup()

  const addBlog = vi.fn()
  render(<BlogForm addBlog={addBlog}/>)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  await user.type(titleInput, '1984')
  await user.type(authorInput, 'George Orwell')
  await user.type(urlInput, 'www.1984go.com')

  const button = screen.getByRole('button', { name: 'create' })
  await user.click(button)

  expect(addBlog).toHaveBeenCalledTimes(1)
  expect(addBlog.mock.calls[0][0].author).toBe('George Orwell')
})