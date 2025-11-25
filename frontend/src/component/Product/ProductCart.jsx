import React from "react";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({name, price, image}) => {

  return (
    <div className="flex flex-col items-center justify-between w-[287px] h-[397px] bg-white rounded-xl  overflow-hidden hover:shadow-xl transition-all duration-300">
      
      {/* Product Image */}
      <div className=" flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt="Image Not Found"
          className="object-contain object-center w-[287px] h-[287px] hover:scale-110 transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="">
        <h3 className="text-lg ">
          {name}
        </h3>
        <p className="text-[24px] font-medium mt-2">
          Rs. {Number(price).toLocaleString("en", { minimumFractionDigits: 2 })}
        </p>

      </div>
    </div>
  );
};

export default ProductCard;