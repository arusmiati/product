import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./ProductForm.css";

Modal.setAppElement("#root");

const ProductForm = ({ product = null, isOpen, onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    price: "",
    discount: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name || "",
        category: product.category || "",
        price: product.price || "",
        discount: product.discount || "",
      });
    } else {
      setFormData({
        product_name: "",
        category: "",
        price: "",
        discount: "",
      });
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const submitData = {
      product_name: formData.product_name,
      category: formData.category,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount) || 0,
    };
  
    console.log('Submitting Data:', submitData);
  
    try {
      if (product && product.id) {
        const response = await axios.put(
          `http://localhost:8000/api/products/${product.id}`,
          submitData
        );
        console.log('Update Response:', response.data);
      } else {
        const response = await axios.post(`http://localhost:8000/api/products`, submitData);
        console.log('Create Response:', response.data);
      }
  
      refreshData();
      onClose();
    } catch (error) {
      console.log('Error:', error.response ? error.response.data : error.message);
      setError(`Failed to save product: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Discount:
          <input
            type="number"
            step="0.01"
            name="discount"
            placeholder="Discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn">Save</button>
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ProductForm;
