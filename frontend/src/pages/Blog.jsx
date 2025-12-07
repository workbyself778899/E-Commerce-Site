import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 3

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://e-commerce-site-three-kappa.vercel.app//blog/read')
        const data = res.data.getBlog || res.data
        if (Array.isArray(data)) {
          setBlogs(data.reverse())
          const cats = Array.from(new Set(data.map(b => b.categories).filter(Boolean)))
          setCategories(cats)
        }
      } catch (err) {
        console.error('Failed to load blogs', err.message)
      }
    }
    fetch()
  }, [])

  const filtered = blogs.filter(b => filter === 'all' ? true : b.categories === filter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  useEffect(() => { if (page > totalPages) setPage(1) }, [filter, totalPages])

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <div className="flex items-center gap-3">
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1) }} className="px-3 py-2 border rounded">
            <option value="all">All categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="flex  flex-col ">
        {pageItems.map(b => (
          <div key={b._id} className="bg-white rounded shadow my-19 p-4">
            {b.image && <img src={b.image} alt={b.title} className="w-full h-full object-contain rounded mb-3" />}
            <div className="text-lg font-semibold mb-1">{b.title}</div>
            <div className="text-sm text-gray-600 mb-2">{b.categories}</div>
            <div className="text-sm text-gray-700 mb-3">{b.contain?.slice(0,120)}{b.contain && b.contain.length > 120 ? '...' : ''}</div>
            <div className="flex justify-between items-center">
              <Link to={`/blog/${b._id}`} className="text-blue-600">Read more</Link>
              <div className="text-sm text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-4 py-2 border rounded disabled:opacity-50">Previous</button>
        <div>Page {page} / {totalPages}</div>
        <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-4 py-2 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  )
}

export default Blog