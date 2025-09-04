import axios from "axios";
import React, { useState } from 'react'
import { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        sku: "",
        category_id: "",
        brand_id: "",
        unit_id: "Kg",
        hsn_code: "",
        tax_rate_id: "18%",
        mrp: "",
        purchase_price: "",
        sale_price: "",
        min_stock: "",
        barcode: "",
        is_batch_tracked: false,
        is_serial_tracked: false,
        status: false,
    });
     useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value});
        
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/products", form);
      setProducts([...products, res.data]);
        setForm({
            name: "",
            sku: "",
            category_id: "",
            brand_id: "",
            unit_id: "Kg",
            hsn_code: "",
            tax_rate_id: "18%",
            mrp: "",
            purchase_price: "",
            sale_price: "",
            min_stock: "",
            barcode: "",
            is_batch_tracked: false,
            is_serial_tracked: false,
            status: false,
        });
        setForm(existingProduct)
        
     } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
    const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase()) ||
            p.category_id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4 bg-gradient-warning">
            <h2 className="mb-4"><span  className="text-success"><MdProductionQuantityLimits />  </span><b>PRODUCT MASTER</b></h2>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label className="form-label ">Product Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control bg-light" name="name" value={form.name} onChange={handleChange}  required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">SKU / Item Code <span className="text-danger">*</span></label>
                    <input type="text" className="form-control bg-light" name="sku" value={form.sku} onChange={handleChange} required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Category <span className="text-danger">*</span></label>
                    <select className="form-select bg-light" name="category_id" value={form.category_id} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option>Electronics</option>
                        <option>Grocery</option>
                        <option>Pharmacy</option>
                        <option>Clothing</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Brand (Optional)</label>
                    <select className="form-select bg-light" name="brand_id" value={form.brand_id} onChange={handleChange}>
                        <option value="">Select Brand</option>
                        <option>Generic</option>
                        <option>Acme</option>
                        <option>Contoso</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Unit of Measure <span className="text-danger">*</span></label>
                    <select className="form-select bg-light" name="unit_id" value={form.unit_id} onChange={handleChange} >
                        <option>Kg</option>
                        <option>Litre</option>
                        <option>Piece</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">HSN Code (Optional)</label>
                    <input type="text" className="form-control bg-light" name="hsn_code" value={form.hsn_code} onChange={handleChange}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Tax Rate <span className="text-danger">*</span></label>
                    <select className="form-select bg-light" name="tax_rate_id" value={form.tax_rate_id} onChange={handleChange}>
                        <option>0%</option>
                        <option>5%</option>
                        <option>12%</option>
                        <option>18%</option>
                        <option>28%</option>
                    </select>
                </div> 
                <div className="col-md-6">
                    <label className="form-label">MRP <span className="text-danger">*</span></label>
                    <input type="number" step="0.01" className="form-control bg-light" name="mrp" value={form.mrp} onChange={handleChange} required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Purchase Price <span className="text-danger">*</span></label>
                    <input type="number" className="form-control bg-light" name="purchase_price" value={form.purchase_price} onChange={handleChange}  required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Sale Price <span className="text-danger">*</span></label>
                    <input type="number" step="0.01" className="form-control bg-light" name="sale_price" value={form.sale_price} onChange={handleChange} required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Min Stock / Reorder Level <span className="text-danger">*</span></label>
                    <input type="number" className="form-control bg-light" name="min_stock" value={form.min_stock} onChange={handleChange} required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Barcode (Optional)</label>
                    <input type="text" className="form-control bg-light" name="barcode" value={form.barcode}onChange={handleChange}/> 
                </div>
                <div className="col-md-4 form-check">
                    <input type="checkbox" className="form-check-input " name="is_batch_tracked" checked={form.is_batch_tracked} onChange={handleChange}  />
                    <label className="form-check-label ">Batch Tracking</label>
                </div>
                <div className="col-md-4 form-check">
                    <input type="checkbox" className="form-check-input " name="is_serial_tracked" checked={form.is_serial_tracked} onChange={handleChange}/>
                    <label className="form-check-label">Serial Tracking</label>
                </div>
               <div className="col-md-4 form-check">
                    <input type="checkbox" className="form-check-input " name="status" checked={form.status} onChange={handleChange}/>
                    <label className="form-check-label">Active Status</label>
                </div>
                <div className="col-12">
                    
                    <button type="submit" className="btn btn-primary"> 
                        <span className="text-warning">
                            <FaCartPlus />
                            </span>
                        Add Product
                    </button>
                </div>
            </form>
            <div className="mt-4 mb-2 input-group">
                <input type="text" className="form-control" placeholder="Search by Name, SKU, Category" value={search} onChange={(e) => setSearch(e.target.value)}   />
                <span className="input-group-text"><FaSearch /></span>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    
                    <tr>
                        <th className="fw-bold">SKU</th>
                        <th className="fw-bold">Name</th>
                        <th className="fw-bold">Category</th>
                        <th className="fw-bold">Brand</th>
                        <th className="fw-bold">UoM</th>
                        <th className="fw-bold">Tax</th>
                        <th className="fw-bold">MRP</th>
                        <th className="fw-bold">Purchase</th>
                        <th className="fw-bold">Sale</th>
                        <th className="fw-bold">Status</th>
                        <th className="fw-bold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length === 0 ? (
                        <tr>
                            <td colSpan="11" className="text-center">
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        filteredProducts.map((p) => (
                            <tr key={p.id}>
                                <td>{p.sku}</td>
                                <td>{p.name}</td>
                                <td>{p.category_id}</td>
                                <td>{p.brand_id}</td>
                                <td>{p.unit_id}</td>
                                <td>{p.tax_rate_id}</td>
                                <td>{p.mrp}</td>
                                <td>{p.purchase_price}</td>
                                <td>{p.sale_price}</td>
                                <td className={p.status ? "text-success" : "text-danger"}>{p.status ? "Active" : "Inactive"}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)} >
                                        <span className="text-warning">
                                        <MdDeleteForever />
                                        </span>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Product