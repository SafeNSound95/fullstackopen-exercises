import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const blog = {
    title:'test blog',
    author:'tester',
    likes:1,
    url:'www.testing.com',
  }

  render(<Blog blog ={blog}/>)

  expect(screen.getByText(/test blog/)).toBeInTheDocument()
  expect(screen.getByText(/tester/)).toBeInTheDocument()

  expect(screen.queryByText(/www.testing.com/)).not.toBeInTheDocument()
  expect(screen.queryByText(/likes 1/)).not.toBeInTheDocument()
})

test('url and likes are rendered after button click', async () => {
  const blog = {
    title:'test blog',
    author:'tester',
    likes:1,
    url:'www.testing.com',
  }

  const user = userEvent.setup()
  render(<Blog blog ={blog}/>)

  const button = screen.getByRole('button', { name: 'show' })
  await user.click(button)

  expect(screen.getByText(/likes 1/)).toBeInTheDocument()
  expect(screen.getByText(/www.testing.com/)).toBeInTheDocument()

})

test('addLike is called twice', async () => {
  const addLike = vi.fn()

  const blog = {
    title:'test blog',
    author:'testser',
    likes:1,
    url:'www.testing.com',
  }

  const user = userEvent.setup()
  render(<Blog blog ={blog} addLike={addLike}/>)

  const showButton = screen.getByRole('button', { name: 'show' })
  await user.click(showButton)

  const likeButton = screen.getByRole('button', { name : 'like' })
  await user.click(likeButton)
  await user.click(likeButton)

  expect(addLike).toHaveBeenCalledTimes(2)

})