import React, { useEffect, useState } from 'react';
import ProductCard from './Product/ProductCart';
import axios from 'axios';
import { Link } from 'react-router';

const RelatedProduct = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false); // state to toggle view more

  // Fetch products by type
  const fetchProducts = async () => {
      setLoading(true);
    try {
      const res = await axios.get(`https://e-commerce-site-three-kappa.vercel.app/product/type/${type}`);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(type);
    setShowAll(false); // reset when type changes
  }, [type]);

  // Decide which products to display
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className="flex flex-col items-center justify-between border-t-2 border-[#D9D9D9]">
      <h3 className="font-medium text-[36px] text-center py-9">Related Products</h3>

      {/* Products Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found for {type}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
             <Link to={`/single-product/${product?._id}`}>
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.photo}
              />
             </Link>
            ))}
          </div>

          {/* View More Button */}
          {products.length > 4 && !showAll && (
            <button
              className="my-9 px-6 py-2 border-b-2 font-medium "
              onClick={() => setShowAll(true)}
            >
              View More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RelatedProduct;
