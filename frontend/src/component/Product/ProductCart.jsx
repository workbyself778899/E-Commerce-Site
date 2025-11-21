import React from "react";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = () => {
 const product = [
    {
      id: 1,
      title: "Wireless Headphone",
      description: "High quality sound with noise cancellation.",
      price: 2500,
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: 2,
      title: "Casual Shoes",
      description: "Comfortable, stylish, and durable.",
      price: 3200,
      image: "https://picsum.photos/300/200?random=2",
    },
    {
      id: 3,
      title: "Smart Watch",
      description: "Track your fitness and notifications.",
      price: 4500,
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 4,
      title: "Bluetooth Speaker",
      description: "Powerful bass and clear sound.",
      price: 1800,
      image: "https://picsum.photos/300/200?random=4",
    },
  ];

  return (
    <div className="w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      
      {/* Product Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full hover:scale-110 transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          {[...Array(product.rating)].map((_, i) => (
            <FaStar key={i} size={16} />
          ))}
        </div>

        <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          <FiShoppingCart size={20} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;