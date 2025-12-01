import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';

const Product = () => { 
  const token = localStorage.getItem('u-token');
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null) // product id when editing
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("type", data.type);
      formData.append("body", data.body);
      if (data.photo && data.photo.length > 0) formData.append("photo", data.photo[0]); // optional on edit

      let res
      if (editing) {
        // edit existing product
        res = await axios.put(`https://e-commerce-site-three-kappa.vercel.app/product/edit/${editing}`, formData, {
          headers: {
            'auth-token': token,
            "Content-Type": "multipart/form-data"
          }
        })
        toast.success(res.data.message || 'Product updated')
        setEditing(null)
      } else {
        // add new
        res = await axios.post("https://e-commerce-site-three-kappa.vercel.app/product/add", formData, {
          headers: {
            'auth-token': token,
            "Content-Type": "multipart/form-data"
          }
        });
        toast.success(res.data.message || 'Product added')
      }

      reset();
      setPreview(null);
      // refresh product list
      fetchProducts()

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Preview image on file select
  const selectedFile = watch("photo");
  React.useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      setPreview(URL.createObjectURL(selectedFile[0]));
    }
  }, [selectedFile]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://e-commerce-site-three-kappa.vercel.app/product/get-all')
      // backend returns {message, getAll?} let's inspect res.data
      // Expect an array in res.data.getProduct or res.data.products or res.data
      const data = res.data.getProduct || res.data.products || res.data;
      // if data is an object with message, try res.data
      if (Array.isArray(data)) setProducts(data)
      else if (Array.isArray(res.data)) setProducts(res.data)
    } catch (err) {
      console.error('Failed to fetch products', err.message)
    }
  }

  React.useEffect(() => { fetchProducts() }, [])

  const handleEdit = (product) => {
    // set form values and go into editing mode
    setEditing(product._id)
    reset({ name: product.name, price: product.price, type: product.type, body: product.body })
    setPreview(product.photo)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      const res = await axios.delete(`https://e-commerce-site-three-kappa.vercel.app/product/delete/${id}`, {
        headers: { 'auth-token': token }
      })
      toast.success(res.data.message || 'Deleted')
      fetchProducts()
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || err.message)
    }
  }

  const addToFeatured = async (section, productId) => {
    try {
      const res = await axios.post('https://e-commerce-site-three-kappa.vercel.app/featured/add', { section, productId }, { headers: { 'auth-token': token } })
      toast.success(res.data.message || 'Added to featured')
    } catch (err) {
      console.error('Failed to add to featured', err)
      toast.error(err.response?.data?.message || 'Failed to add to featured')
    }
  }

  const filteredProducts = products.filter(p => {
    const q = search.trim().toLowerCase()
    const matchSearch = !q || (p.name && p.name.toLowerCase().includes(q)) || (p._id && p._id.toLowerCase().includes(q))
    const matchType = filterType === 'all' || (p.type === filterType)
    return matchSearch && matchType
  })

  return (
    <div className="p-6">
      <ToastContainer/>
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor='name'>Product Name</label>
            <input
              type="text"
              {...register("name",{required:"Name of product is required"})}
              className="px-3 py-2 border rounded-lg"
              placeholder="Enter product name"
            />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor='price'>Price</label>
            <input
              type="number"
              {...register("price",{required:"Price of product is required"})}
              className="px-3 py-2 border rounded-lg"
              placeholder="Enter product price"
            />
            {errors.price && <p className='text-red-600'>{errors.price.message}</p>}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor='type'>Category</label>
            <select {...register('type')} className="px-3 py-2 border rounded-lg">
              <option value="Hybrid">Hybrid</option>
              <option value="Table">Table</option>
              <option value="Chair">Chair</option>
              <option value="Sofa">Sofa</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium mb-1" htmlFor='body'>Description</label>
            <textarea
              {...register("body",{required:"Product details/info is required"})}
              rows="4"
              className="px-3 py-2 border rounded-lg"
              placeholder="Write product description..."
            ></textarea>
            {errors.body && <p className='text-red-600'>{errors.body.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium mb-1">Upload Product Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('photo', editing ? {} : {required:"Product photo is required"})}
              className="border p-2 rounded-lg cursor-pointer"
            />
            {errors.photo && <p className='text-red-600'>{errors.photo.message}</p>}

            {/* Preview */}
            {preview && <img src={preview} alt="preview" className="w-40 mt-2 rounded" />}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-between items-center">
            {editing && (
              <div>
                <button
                  type="button"
                  onClick={() => { setEditing(null); reset(); setPreview(null); }}
                  className="px-4 py-2 rounded-lg border mr-3"
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="ml-auto">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                {isSubmitting ? (editing ? "Updating..." : "Processing...") : (editing ? "Update Product" : "Add Product")}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Products List + Search */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or id..."
              className="px-3 py-2 border rounded w-64"
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border rounded">
              <option value="all">All types</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Table">Table</option>
              <option value="Chair">Chair</option>
              <option value="Sofa">Sofa</option>
            </select>
            <div className="text-sm text-gray-600">Showing {filteredProducts.length} / {products.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-600">No products match your search.</div>
          ) : (
            filteredProducts.map((p) => (
              <div key={p._id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={p.photo} alt={p.name} className="w-20 h-20 object-contain rounded" />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-500">Rs. {p.price}</div>
                    <div className="text-sm text-gray-400">{p.type}</div>
                    <div className="text-xs text-gray-400">ID: {p._id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                  <button onClick={() => addToFeatured('topPicks', p._id)} className="px-3 py-1 bg-blue-400 text-white rounded">Add TopPick</button>
                  <button onClick={() => addToFeatured('hereTable', p._id)} className="px-3 py-1 bg-indigo-400 text-white rounded">Add HereTable</button>
                  <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
