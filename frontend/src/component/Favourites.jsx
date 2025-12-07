import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Favourites = ({ setShowFav, showFav }) => {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("uid");

  // REMOVE FROM FAV
  const removeFav = async (productId) => {
    try {
      const res = await axios.delete(
        `https://e-commerce-site-three-kappa.vercel.app/user/remove-from-fav/${userId}/${productId}`
      );

      toast.warn(res.data.message);

      // Update state instantly
      setProducts((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  // GET FAVOURITES
  const getFav = async () => {
    try {
      const res = await axios.get(
        `https://e-commerce-site-three-kappa.vercel.app/user/get-fav-products/${userId}`
      );

      console.log("Fav Data:", res.data.favourites);
      setProducts(res.data.favourites); // Always an array
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getFav();
  }, []);

  return (
    <div className="max-h-[746px] w-[417px] py-10">
      <ToastContainer />

      {/* Title */}
      <div className="flex items-center justify-between mb-4 px-3">
        <div className="font-semibold text-[24px]">Favourites</div>
        <div onClick={() => setShowFav(!showFav)}>
          <CgCloseR size={28} />
        </div>
      </div>

      {/* Line */}
      <div className="px-3">
        <hr className="pb-4 w-[287px] text-[#D9D9D9]" />
      </div>

      {/* List */}
      <div className="space-y-4 px-3 overflow-y-auto max-h-[550px]">
        {products.length > 0 ? (
          products.map((data) => (
            <div
              key={data._id}
              className="flex items-center justify-between bg-[#f9f9f9] p-3 rounded-lg"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <img
                  src={data.productId.photo}
                  className="h-[70px] w-[70px] object-contain rounded-md bg-white"
                  alt=""
                />
                <div>
                  <p className="font-semibold">{data.productId.name}</p>
                  <p className="text-sm text-gray-600">
                    Rs {data.productId.price}
                  </p>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFav(data.productId._id)}
                className="text-red-500 hover:text-red-700"
              >
                <IoMdCloseCircle size={28} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No favourites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
