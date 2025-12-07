import React, { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const CardSlideBar = ({ setshowCart, showCart, userId }) => {
  const [cart, setCart] = useState([]);

  // Format price in EN format
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US").format(price);

  // Fetch cart data
  const getCart = async () => {
    try {
      const res = await axios.get(`https://e-commerce-site-three-kappa.vercel.app//user/get-cart/${userId}`);
      setCart(res.data.cart || []);
    } catch (err) {
      console.log("Cart Fetch Error:", err.message);
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `https://e-commerce-site-three-kappa.vercel.app//user/remove-from-cart/${userId}/${productId}`
      );
      setCart((prev) => prev.filter((i) => i.productId._id !== productId));
    } catch (err) {
      console.log("Remove Error:", err.message);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + Number(item.productId.price) * Number(item.quantity),
    0
  );

  return (
    <div className="max-h-[746px] w-[417px] pt-5 overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-3">
        <h2 className="text-[24px] font-semibold">Shopping Cart</h2>
        <CgCloseR size={28} onClick={() => setshowCart(!showCart)} className="cursor-pointer" />
      </div>

      <hr className="w-[287px] mx-3 mb-4" />

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p className="px-3">Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.productId._id}
            className="flex justify-start gap-5 px-3 mb-5 items-center"
          >
            {/* Image (same size always) */}
          <div className="">
              <img
              src={item.productId.photo}
              alt={item.productId.name}
              className="
                w-[108px] 
                h-[108px] 
                object-contain 
                rounded-2xl 
                bg-[#FBEBB5]
                p-2
              "
            />
          </div>

         <div className="flex items-center justify-start gap-4">
             {/* Name & Price */}
            <div className="flex flex-col w-[200px] items-start ">
              <h6 className="font-medium ">{item.productId.name}</h6>

              <div className="flex  gap-2 mt-1">
                <span>{item.quantity}</span>
                <span>X</span>
                <span className="text-[#B88E2F] font-semibold">
                  Rs. {formatPrice(item.productId.price)}
                </span>
              </div>
            </div>

            {/* Remove */}
          <div className="">
               <IoMdCloseCircle
              size={25}
              color="#9F9F9F"
              onClick={() => removeItem(item.productId._id)}
              className="cursor-pointer"
            />
          </div>
         </div>

          </div>
        ))
      )}

      {/* Total */}
      <div className="flex justify-between px-3 my-8">
        <h6 className="font-medium">Total</h6>
        <p className="text-[#B88E2F] font-semibold">
          Rs. {formatPrice(total)}
        </p>
      </div>

      {/* Buttons */}
      <div className="border-t flex justify-center gap-5 py-8">
        <Link to="/cart">
          <button className="px-8 border rounded-4xl py-3">View Cart</button>
        </Link>

        <Link to="/checkout">
          <button className="px-8 border rounded-4xl py-3">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CardSlideBar;
