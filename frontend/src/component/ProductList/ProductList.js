import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../slices/ProductSlice';
import ProductForm from '../ProductForm/ProductForm';
import './ProductList.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddClick = () => {
        setEditProduct(null);
        setShowForm(true);
    };

    const handleEditClick = (product) => {
        setEditProduct(product);
        setShowForm(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`);
            dispatch(fetchProducts());
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditProduct(null);
    };

    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!products || products.length === 0) return <p>No products available</p>;

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <button onClick={handleAddClick} className="btn-add">Add Product</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.product_name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>{product.discount ? `${product.discount}%` : "No Discount"}</td>
                            <td>
                                <button onClick={() => handleEditClick(product)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDeleteClick(product.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (
                <ProductForm 
                    product={editProduct} 
                    isOpen={showForm} 
                    onClose={handleFormClose} 
                    refreshData={() => dispatch(fetchProducts())} 
                />
            )}
        </div>
    );
};

export default ProductList;
