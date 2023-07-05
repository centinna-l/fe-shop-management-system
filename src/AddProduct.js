import React, { useState } from "react";
import storage from "./firebase"; // Import the Firebase storage instance
import axios from "axios";
import "./AddProduct.css";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_picture: null,
    product_description: "",
    product_currency: "",
    product_qty: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setProduct((prevState) => ({
      ...prevState,
      product_picture: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const file = product.product_picture;
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // Upload the image file to Firebase Storage
      await fileRef.put(file);

      // Get the download URL of the uploaded image
      const downloadURL = await fileRef.getDownloadURL();

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_price", product.product_price);
      formData.append("product_picture", downloadURL);
      formData.append("product_description", product.product_description);
      formData.append("product_currency", product.product_currency);
      formData.append("product_qty", product.product_qty);
      // Send the newProduct object to the API
      const response = await axios.post(
        "http://localhost:8000/api/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );

      console.log(response.message);
      setMessage(response.message);
      // Handle successful product addition
    } catch (error) {
      // Handle error

      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="add-product-containe">
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        {/* Add input fields for product details */}
        {previewImage && (
          <img
            src={previewImage}
            alt="Product Preview"
            className="image-preview-container"
            style={{ maxWidth: "250px", maxHeight: "250px" }}
          />
        )}
        {/* Add other input fields for product details */}
        <input type="file" onChange={handleImageChange} />
        <div className="input-container">
          <label>Name</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
        </div>
        <div className="input-container">
          <label>Price</label>
          <input
            type="text"
            name="product_price"
            value={product.product_price}
            onChange={handleInputChange}
            placeholder="Product Price"
          />
        </div>

        <div className="input-container">
          <label>Description</label>
          <input
            type="text"
            name="product_description"
            value={product.product_description}
            onChange={handleInputChange}
            placeholder="Product Description"
          />
        </div>
        <div className="input-container">
          <label>Currency</label>
          <input
            type="text"
            name="product_currency"
            value={product.product_currency}
            onChange={handleInputChange}
            placeholder="Product Currency"
          />
        </div>
        <div className="input-container">
          <lable>QTY</lable>
          <input
            type="number"
            name="product_qty"
            value={product.product_qty}
            onChange={handleInputChange}
            placeholder="Product Qty"
          />
        </div>
        <div className="submit-button-container">
          <button type="submit">Add Product</button>
        </div>
      </form>
      {message && (
        <div className="message-box success">
          <p>{message}</p>
          <button onClick={() => setMessage("")}>OK</button>
        </div>
      )}
      {error && (
        <div className="message-box error">
          <p>{error}</p>
          <button onClick={() => setError("")}>OK</button>
        </div>
      )}
    </div>
  );
};

export default AddProductPage;
