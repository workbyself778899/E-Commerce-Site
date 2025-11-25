import React, { useEffect, useState } from "react";
import SecondHeader from "../component/Header/SecondHeader";
import ProductCart from "../component/Product/ProductCart";
import axios from "axios";
import { Link } from "react-router-dom";

const Shop = () => { 
  const [products, setProducts] = useState([]); // all products
  const [showCount, setShowCount] = useState(4); // default show 4 items
  const [currentPage, setCurrentPage] = useState(1); // active page

  // Fetch all products
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get("http://localhost:3900/product/get-all");
        setProducts(res.data.getProduct);
        console.log(res.data.getProduct)
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  // Pagination Logic
  const lastIndex = currentPage * showCount;
  const firstIndex = lastIndex - showCount;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products.length / showCount);

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
      <div className="bg-[#FAF4F4] h-[100px] w-full my-10 flex items-center justify-around">
        {/* Show Count */}
        <div className="flex items-center gap-3">
          <div className="text-[20px]">Show</div>

          <select
            className="lg:w-[70px] lg:h-[55px] border bg-white text-[#444] text-center"
            value={showCount}
            onChange={(e) => {
              setShowCount(Number(e.target.value));
              setCurrentPage(1); // reset page
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
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