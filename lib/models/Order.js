import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  id: String,
  sku: String,
  name: String,
  subtitle: String,
  size: String,
  price: Number,
  quantity: Number,
  batchCode: String,
  image: String,
});

const TimelineStepSchema = new mongoose.Schema({
  status: String,
  title: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, default: "" },
      pincode: { type: String, required: true },
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["razorpay", "cod"], default: "razorpay" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    orderStatus: {
      type: String,
      enum: ["placed", "harvest_allocated", "inspected", "dispatched", "delivered", "cancelled"],
      default: "placed",
    },
    carrier: { type: String, default: "BlueDart Apiary Cold-Chain" },
    trackingNumber: { type: String, default: "" },
    estimatedDelivery: { type: String, default: "3-5 business days" },
    dispatchNotes: { type: String, default: "Insulated eco-pack with neem-wood dipper" },
    timeline: [TimelineStepSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
