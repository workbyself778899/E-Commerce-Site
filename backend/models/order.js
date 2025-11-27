const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // optional to support guest checkout
      required: false,
    },

    customer: {
      fname: { type: String, required: true },
      lname: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      address: { type: String, required: true },
      zip_code: { type: String },
      company_name: { type: String },
      details: { type: String }, // User message / notes
    },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        name: String,
        price: Number,
        quantity: Number,
        photo: String,
      },
    ],

    total_cost: {
      type: Number,
      required: true,
    },

    order_status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },

    payment_status: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);