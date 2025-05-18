import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true /*, unique: true*/ },
    name: { type: String, required: true },
    address: { type: String, required:true},
    phone: { type: Number, required: true },
    opening_hours: {type: String, required: true}
  },
  { timestamps: true }
)

export default mongoose.model("Restaurant", ProductSchema)
