import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true /*, unique: true*/ },
    restaurant_id: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String },
    price: { type: Number, required: true },
    category: {type: String, required: true}
  },
  { timestamps: true }
)

export default mongoose.model("Menu", ProductSchema)
