import React, { useEffect, useState } from "react";
import SecondHeader from "../component/Header/SecondHeader";
import ProductCart from "../component/Product/ProductCart";
import axios from "axios";
import { Link } from "react-router-dom";

const Shop = () => { 
  const [products, setProducts] = useState([]); // all products
  const [showCount, setShowCount] = useState(4); // default show 4 items
  const [currentPage, setCurrentPage] = useState(1); // active page
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('') // '', 'price-asc','price-desc','name-asc','name-desc','latest'
  const [typeFilter, setTypeFilter] = useState('all')

  // Fetch all products
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get("https://e-commerce-site-5h4d.vercel.app/product/get-all");
        setProducts(res.data.getProduct);
        console.log(res.data.getProduct)
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  // derive types for filter
  const types = Array.from(new Set((products || []).map(p => p.type).filter(Boolean)))

  // apply search, type filter
  const filtered = products.filter(p => {
    const q = search.trim().toLowerCase()
    const matchesSearch = !q || (p.name && p.name.toLowerCase().includes(q))
    const matchesType = typeFilter === 'all' || p.type === typeFilter
    return matchesSearch && matchesType
  })

  // apply sorting
  const sorted = [...filtered].sort((a,b) => {
    if (!sortBy) return 0
    if (sortBy === 'price-asc') return Number(a.price) - Number(b.price)
    if (sortBy === 'price-desc') return Number(b.price) - Number(a.price)
    if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '')
    if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '')
    if (sortBy === 'latest') return new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0)
    return 0
  })

  const lastIndex = currentPage * showCount;
  const firstIndex = lastIndex - showCount;
  const currentProducts = sorted.slice(firstIndex, lastIndex);

  const totalPages = Math.max(1, Math.ceil(sorted.length / showCount));

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="">
      <SecondHeader text="Shop" />

      {/* Filter Bar */}
      <div className="bg-[#FAF4F4] w-full my-10 p-4 rounded">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div className="flex items-center gap-3">
            <div className="text-[16px] hidden md:block">Show</div>
            <select
              className="w-20 h-10 border bg-white text-[#444] text-center"
              value={showCount}
              onChange={(e) => {
                setShowCount(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }} placeholder="Search by name" className="px-3 py-2 border rounded w-full md:w-64" />
            <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1) }} className="px-3 py-2 border rounded">
              <option value="all">All types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border rounded">
              <option value="">Sort</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-9 items-center">
        {currentProducts.length > 0 ? (
          currentProducts.map((data) => (
             <Link to={`/single-product/${data._id}`}  >
            <div key={data._id} className="flex" >
            
            
               <ProductCart
                name={data.name}
                price={data.price}
                image={data.photo}
              />          
           
            </div>
              </Link>
          ))
        ) : (
          <p className="text-center">No Products Found</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center gap-5 mt-10 mb-20">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100"
        >
          ← Prev
        </button>

        <span className="text-xl font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Shop;