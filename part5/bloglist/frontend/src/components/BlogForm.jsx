import { useState } from "react"

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const createBlog = (e) => {
    e.preventDefault()

    const blog = {
      title,
      author,
      url
    }

    addBlog(blog)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return(
    <>
      <h2>create new</h2>
      
      <form onSubmit={createBlog}>
        <label>
          title
          <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        </label>
        <br></br>
        <label>
          author
          <input value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </label>
        <br></br>
        <label>
          url
          <input value={url} onChange={(e) => setUrl(e.target.value)}/>
        </label>
        <br></br>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm