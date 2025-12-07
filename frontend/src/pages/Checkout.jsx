import React, { useEffect, useState } from "react";
import SecondHeader from "../component/Header/SecondHeader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  console.log(cartItems)
  const userId = localStorage.getItem("uid");
  const nav= useNavigate();
  const formatCurrency = (num) => num.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});

  // Fetch cart
  const getCart = async (userId) => {
    try {
      const res = await axios.get(`https://e-commerce-site-three-kappa.vercel.app//user/get-cart/${userId}`);
      setCart(res.data.cart || []);
    } catch (err) {
      console.log("Fetch Cart Error:", err.message);
    }
  };

  useEffect(() => {
    getCart(userId);
  }, []);

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + Number(item.productId.price) * Number(item.quantity),
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Submit order
  const onSubmit = async (data) => {
    try {
      const orderData = {
        ...data,
        products: cart,
        total_cost: total,
        userId: userId || undefined,
      };
      console.log("data",data)
      const res = await axios.post("https://e-commerce-site-three-kappa.vercel.app//order/add", orderData);
      toast.success("Order placed successfully!");
      reset();
      nav('/')
      console.log(res.data);
    } catch (err) {
      toast.error("Failed to place order");
      console.log(err);
    }
  };



  return (
    <div>
      <SecondHeader text="Checkout" />
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4 my-8">
        {/* LEFT SIDE — Billing Details and RIGHT SIDE — Order Summary stack on small screens */}
        <form className="flex flex-col md:flex-row md:items-start md:gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full md:w-2/3 p-2">
            <h2 className="text-2xl md:text-[36px] font-semibold mb-6">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="font-medium pb-2">First Name</label>
                <input
                  {...register("fname", { required: true })}
                  className="border px-3 h-12 md:h-[75px] rounded-lg"
                />
                {errors.fname && <p className="text-red-500">Required</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium pb-2">Last Name</label>
                <input
                  {...register("lname", { required: true })}
                  className="border px-3 h-12 md:h-[75px] rounded-lg"
                />
                {errors.lname && <p className="text-red-500">Required</p>}
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-medium pb-2">Company Name (Optional)</label>
              <input {...register("company_name")} className="border px-3 h-12 md:h-[75px] rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col mb-4">
                <label className="font-medium pb-2">Country / Region</label>
                <select {...register("country", { required: true })} className="border px-3 h-12 md:h-[75px] rounded-lg">
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                </select>
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-medium pb-2">Province</label>
                <select {...register("province", { required: true })} className="border px-3 h-12 md:h-[75px] rounded-lg">
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Lumbini">Lumbini</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-medium pb-2">Street Address</label>
              <input {...register("address", { required: true })} className="border px-3 h-12 md:h-[75px] rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col mb-4">
                <label className="font-medium pb-2">Town / City</label>
                <input {...register("city", { required: true })} className="border px-3 h-12 md:h-[75px] rounded-lg" />
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-medium pb-2">Zip Code</label>
                <input {...register("zip_code")} className="border px-3 h-12 md:h-[75px] rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col mb-4">
                <label className="font-medium pb-2">Phone</label>
                <input
                  {...register("phone", { required: true })}
                  className="border px-3 h-12 md:h-[75px] rounded-lg"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-medium pb-2">Email Address</label>
                <input
                  {...register("email", { required: true })}
                  className="border px-3 h-12 md:h-[75px] rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-medium pb-2">Additional Information</label>
              <input
                {...register("details")}
                className="border px-3 h-12 md:h-[75px] rounded-lg"
                placeholder="Optional"
              />
            </div>
          </div>

          {/* RIGHT SIDE — Order Summary */}
          <div className="w-full md:w-1/3 p-2 mt-6 md:mt-0">
            <h2 className="text-xl md:text-[28px] font-semibold mb-4">Order Summary</h2>

            <div className="w-full border rounded p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 font-medium text-[16px]">Product</th>
                    <th className="text-right py-2 font-medium text-[16px]">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item.productId._id}>
                      <td className="py-2">
                        <div className="text-sm md:text-base">{item.productId.name}</div>
                        <div className="text-gray-600 text-xs">× {item.quantity}</div>
                      </td>
                      <td className="text-right py-2">
                        Rs. {formatCurrency(item.productId.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4">
                <span className="font-normal text-[14px]">Total</span>
                <span className="text-[#B88E2F] text-[20px] font-bold">Rs. {formatCurrency(total)}</span>
              </div>

              <hr className="my-4" />

              <div className="my-4 text-sm text-gray-700">
                <p className="flex items-center gap-3">
                  <FaCircle /> Direct Bank Transfer (Not available)
                </p>
                <p className="text-[#9F9F9F] mt-2">Make your payment directly into our bank account...</p>
              </div>

              <div className="flex gap-3 my-2 items-center">
                <input type="radio" value="bank" {...register("payment")} />
                <label className="text-sm">Direct Bank Transfer</label>
              </div>

              <div className="flex gap-3 mb-4 items-center">
                <input type="radio" value="cod" {...register("payment")} />
                <label className="text-sm">Cash On Delivery</label>
              </div>

              <div className="flex justify-center py-2">
                <button
                  type="submit"
                  className="text-[16px] px-6 py-2 border rounded-2xl hover:bg-[#55f5909e]"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
