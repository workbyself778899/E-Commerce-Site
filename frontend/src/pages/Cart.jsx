import React, { useEffect, useState } from "react";
import SecondHeader from "../component/Header/SecondHeader";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("uid");
  // Format price
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US").format(price);

  // Fetch cart
  const getCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3900/user/get-cart/${userId}`
      );
      setCart(res.data.cart || []);
    } catch (err) {
      console.log("Fetch Cart Error:", err.message);
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3900/user/remove-from-cart/${userId}/${productId}`
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
    (sum, item) =>
      sum + Number(item.productId.price) * Number(item.quantity),
    0
  );

  return (
    <div>
      <SecondHeader text="Cart" />

      <div className="flex justify-around my-14">

        {/* Cart Table */}
        <div>
          <table className="lg:min-w-[817px]">
            <thead>
              <tr className="bg-[#FFF9E5]">
                <th className="py-3 text-[16px] font-medium">Product</th>
                <th className="py-3 text-[16px] font-medium">Price</th>
                <th className="py-3 text-[16px] font-medium">Quantity</th>
                <th className="py-3 text-[16px] font-medium">Subtotal</th>
                <th className="py-3 text-[16px] font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    Your cart is empty
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={item.productId._id}>
                    <td className="flex items-center justify-start gap-2 text-center py-3 text-[#9F9F9F]">
                      <img
                        src={item.productId.photo}
                        alt={item.productId.name}
                        className="w-[60px] h-[60px] rounded-xl bg-[#FBEBB5] p-1 object-contain"
                      />
                      {item.productId.name}
                    </td>

                    <td className="px-1 py-3 text-[#9F9F9F] text-center">
                      Rs. {formatPrice(item.productId.price)}
                    </td>

                    <td className="px-1 py-3 text-center">
                      {item.quantity}
                    </td>

                    <td className="px-1 py-3 text-center">
                      Rs.{" "}
                      {formatPrice(
                        item.quantity * item.productId.price
                      )}
                    </td>

                    <td className="text-center">
                      <MdDelete
                        size={30}
                        color="#B88E2F"
                        className="cursor-pointer"
                        onClick={() => removeItem(item.productId._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Total Box */}
        <div className="w-[393px] max-h-[390px] bg-[#FFF9E5] rounded-xl">
          <h2 className="text-center font-semibold pt-3 mb-4 text-[32px]">
            Cart Totals
          </h2>

          <div className="flex items-center justify-around px-5 mb-10">
            <p className="text-[16px] font-medium">Total</p>
            <p className="text-[#B88E2F] text-[20px] font-medium">
              Rs. {formatPrice(total)}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="flex items-center justify-center mb-10">
            <Link to="/checkout">
              <button className="px-8 py-3 border-2 rounded-2xl">
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
