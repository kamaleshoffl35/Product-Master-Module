const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category_id: { type: String, ref: "Category", required: true },
    brand_id: { type: String, ref: "Brand" },
    unit_id: { type: String, ref: "Unit", required: true }, 
    hsn_code: { type: String },
    tax_rate_id: { type: String, ref: "TaxRate", required: true },
    mrp: { type: Number, required: true },
    purchase_price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    min_stock: { type: Number, default: 0 },
    barcode: { type: String },
    is_batch_tracked: { type: Boolean, default: false },
    is_serial_tracked: { type: Boolean, default: false },
    status: { type: Boolean, enum: ["active", "inactive"], default: "active" },
    created_by: { type: String },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Product", productSchema);
