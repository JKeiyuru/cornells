import mongoose from "mongoose";
const CartSchema = mongoose.Schema(
  {
    quantity: { type: Number, require: true},
    total: {
      type: Number,
      require: true,
    },
    products: {
      type: Array,
      require: true,
    },
    userId: {
        type: String,
        require: true,
      },
  },

  { timestamps: true }
);
const cart = mongoose.model("Cart", CartSchema);
export default cart;
