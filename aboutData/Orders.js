import mongoose from "mongoose";

const Schema = mongoose.Schema;

let orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  userDetail: {
    type: Object,
    required: true,
  },
  productDetail: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Order-Placed",
  },
});

export default mongoose.models.Orders || mongoose.model("Orders", orderSchema);
