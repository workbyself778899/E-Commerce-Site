import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const SingleBlog = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://e-commerce-site-5h4d.vercel.app/blog/read/${id}`)
        const data = res.data.getBlog || res.data
        setBlog(data)
      } catch (err) {
        console.error('Failed to load blog', err.message)
      }
    }
    if (id) fetch()
  }, [id])

  if (!blog) return <div className="max-w-4xl mx-auto py-12 px-4">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-6">
        <Link to="/blog" className="text-blue-600">← Back to blogs</Link>
      </div>

      <div className="bg-white rounded shadow p-6">
        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover rounded mb-4" />}
        <h1 className="text-2xl font-semibold mb-2">{blog.title}</h1>
        <div className="text-sm text-gray-600 mb-4">{blog.categories} • {new Date(blog.createdAt).toLocaleDateString()}</div>
        <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: blog.contain }} />
      </div>
    </div>
  )
}

export default SingleBlog
