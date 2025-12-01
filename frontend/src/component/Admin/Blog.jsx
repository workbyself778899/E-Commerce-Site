import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const AdminBlog = () => {
  const token = localStorage.getItem('u-token');
  const [preview, setPreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://e-commerce-site-5h4d.vercel.app/blog/read');
      const data = res.data.getBlog || res.data;
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs', err.message);
    }
  };

  React.useEffect(() => { fetchBlogs() }, []);

  const selectedFile = watch('image');
  React.useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      setPreview(URL.createObjectURL(selectedFile[0]));
    }
  }, [selectedFile]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('contain', data.contain);
      formData.append('categories', data.categories);
      if (data.image && data.image.length > 0) formData.append('image', data.image[0]);

      let res;
      if (editing) {
        res = await axios.put(`https://e-commerce-site-5h4d.vercel.app/blog/edit/${editing}`, formData, {
          headers: { 'auth-token': token, 'Content-Type': 'multipart/form-data' }
        });
        toast.success(res.data.message || 'Blog updated');
        setEditing(null);
      } else {
        res = await axios.post('https://e-commerce-site-5h4d.vercel.app/blog/create', formData, {
          headers: { 'auth-token': token, 'Content-Type': 'multipart/form-data' }
        });
        toast.success(res.data.message || 'Blog created');
      }

      reset();
      setPreview(null);
      fetchBlogs();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (b) => {
    setEditing(b._id);
    reset({ title: b.title, contain: b.contain, categories: b.categories });
    setPreview(b.image || null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      const res = await axios.delete(`https://e-commerce-site-5h4d.vercel.app/blog/delete/${id}`, {
        headers: { 'auth-token': token }
      });
      toast.success(res.data.message || 'Deleted');
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6">Manage Blogs</h1>

      <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Title</label>
            <input type="text" {...register('title', { required: 'Title is required' })} className="px-3 py-2 border rounded-lg" />
            {errors.title && <p className='text-red-600'>{errors.title.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Content</label>
            <textarea {...register('contain', { required: 'Content is required' })} rows={6} className="px-3 py-2 border rounded-lg" />
            {errors.contain && <p className='text-red-600'>{errors.contain.message}</p>}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="font-medium mb-1">Category</label>
              <select {...register('categories')} className="px-3 py-2 border rounded-lg w-full">
                <option value="Interior">Interior</option>
                <option value="Crafts">Crafts</option>
                <option value="Design">Design</option>
                <option value="Handmade">Handmade</option>
                <option value="Wood">Wood</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="font-medium mb-1">Image (optional)</label>
              <input type="file" accept="image/*" {...register('image')} className="border p-2 rounded-lg" />
            </div>
          </div>

          {preview && <img src={preview} alt="preview" className="w-48 mt-2 rounded" />}

          <div className="flex justify-end">
            {editing && (
              <button type="button" onClick={() => { setEditing(null); reset(); setPreview(null); }} className="px-4 py-2 rounded-lg border mr-3">Cancel</button>
            )}
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg">{isSubmitting ? (editing ? 'Updating...' : 'Processing...') : (editing ? 'Update Blog' : 'Add Blog')}</button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
        <div className="space-y-4">
          {blogs.length === 0 ? <div className="text-gray-600">No blogs found</div> : (
            blogs.map(b => (
              <div key={b._id} className="bg-white p-4 rounded shadow flex justify-between items-start gap-4">
                <div>
                  <div className="font-medium">{b.title}</div>
                  <div className="text-sm text-gray-600">{b.categories}</div>
                  <div className="text-sm mt-2 text-gray-700">{b.contain?.slice(0,200)}{b.contain && b.contain.length>200?'...':''}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleEdit(b)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                  <button onClick={() => handleDelete(b._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
