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
      const res = await axios.get(`http://localhost:3900/user/get-cart/${userId}`);
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
      const res = await axios.post("http://localhost:3900/order/add", orderData);
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
      <div className="flex justify-around my-10">
        {/* LEFT SIDE — Billing Details */}
        <div className="w-[608px] p-2 ">


          <form className="flex items-start gap-20 justify-center " onSubmit={handleSubmit(onSubmit)}>
            {/* Left Part  */}
            <div className="">
              <h2 className="text-[36px] font-semibold mb-10">Billing Details</h2>
              {/* First & Last Name */}
              <div className="flex gap-6 mb-10">
                <div className="flex flex-col">
                  <label className="font-medium pb-4">First Name</label>
                  <input
                    {...register("fname", { required: true })}
                    className="border px-3 h-[75px] rounded-lg"
                  />
                  {errors.fname && <p className="text-red-500">Required</p>}
                </div>

                <div className="flex flex-col">
                  <label className="font-medium pb-4">Last Name</label>
                  <input
                    {...register("lname", { required: true })}
                    className="border px-3 h-[75px] rounded-lg"
                  />
                  {errors.lname && <p className="text-red-500">Required</p>}
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Company Name (Optional)</label>
                <input {...register("company_name")} className="border px-3 h-[75px] rounded-lg" />
              </div>

              {/* Country */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Country / Region</label>
                <select {...register("country", { required: true })} className="border px-3 h-[75px] rounded-lg">
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                </select>
              </div>

              {/* Address */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Street Address</label>
                <input {...register("address", { required: true })} className="border px-3 h-[75px] rounded-lg" />
              </div>

              {/* City */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Town / City</label>
                <input {...register("city", { required: true })} className="border px-3 h-[75px] rounded-lg" />
              </div>

              {/* Province */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Province</label>
                <select {...register("province", { required: true })} className="border px-3 h-[75px] rounded-lg">
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Lumbini">Lumbini</option>
                </select>
              </div>

              {/* Zip */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Zip Code</label>
                <input {...register("zip_code")} className="border px-3 h-[75px] rounded-lg" />
              </div>

              {/* Phone */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Phone</label>
                <input
                  {...register("phone", { required: true })}
                  className="border px-3 h-[75px] rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Email Address</label>
                <input
                  {...register("email", { required: true })}
                  className="border px-3 h-[75px] rounded-lg"
                />
              </div>

              {/* Additional Info */}
              <div className="flex flex-col mb-10">
                <label className="font-medium pb-4">Additional Information</label>
                <input
                  {...register("details")}
                  className="border px-3 h-[75px] rounded-lg"
                  placeholder="Optional"
                />
              </div>
            </div>
            {/* RIGHT SIDE — Order Summary */}
            <div className="w-[533px]">

              <h2 className="text-[28px] font-semibold mb-5">Order Summary</h2>

              <table className="w-[533px] border-collapse">
                <thead>
                  <tr className="">
                    <th className="text-left py-3 font-medium text-[24px]">Product</th>
                    <th className="text-right py-3 font-medium text-[24px]">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item.productId._id} className="">
                      <td className="py-3">
                        {item.productId.name}
                        <span className="text-gray-600"> × {item.quantity}</span>
                      </td>
                      <td className="text-right py-3">
                        Rs. {formatCurrency(item.productId.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total */}
              <div className="flex justify-between items-center mt-6 ">
                <span className="font-normal text-[16px]" >Total</span>
                <span className="text-[#B88E2F] text-[24px] font-bold ">Rs. {formatCurrency(total)}</span>
              </div>

              <hr className="my-6" />

              {/* Payment Method */}
              <div className="my-6">
                <p className="flex items-center gap-3">
                  <FaCircle /> Direct Bank Transfer (Not available)
                </p>
                <p className="text-[#9F9F9F] mt-4">
                  Make your payment directly into our bank account...
                </p>
              </div>

              <div className="flex gap-3 my-3">
                <input type="radio" value="bank" {...register("payment")} />
                <label>Direct Bank Transfer</label>
              </div>

              <div className="flex gap-3 mb-6">
                <input type="radio" value="cod" {...register("payment",)} />
                <label>Cash On Delivery</label>
              </div>

              {/* Place Order */}
              <div className="flex justify-center py-6">
                <button
                  type="submit"
                  className="text-[20px] px-18 py-2 border rounded-2xl hover:bg-[#55f5909e]"
                >
                  Place order
                </button>
              </div>

            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
