import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // use react-router-dom

const Small = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products by type
  const fetchProducts = async (type) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3900/product/type/${type}`);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(type);
  }, [type]);

  // Limit displayed products to 6
  const displayedProducts = products.slice(0, 6);

  return (
    <div className=" mb-3">
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {displayedProducts.map((product) => (
            <Link
              key={product._id}
              to={`/single-product/${product._id}`}
              className=" mx-3 flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Small Product Image */}
              <img
                src={product.photo}
                alt={product.name}
                className=" object-contain object-center max-w-[76px] h-[85px] p-1 bg-amber-100 "
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Small;
