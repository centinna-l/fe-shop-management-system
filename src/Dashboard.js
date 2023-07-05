// Import necessary dependencies
import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Dashboard.css";
import { Link } from "react-router-dom";

// Dashboard component
const Dashboard = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/product/admin",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log("Data", response.data);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // return (
  //   <div>
  //     <h2>Dashboard</h2>
  //     <ul>
  //       {products.map((product) => (
  //         <li key={product.id}>{product.product_name}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.product_picture}
              alt={product.product_name}
              className="product-image"
              style={{ maxWidth: "250px", maxHeight: "250px" }}
            />
            <h3>{product.product_name}</h3>
            <p>{`${product.product_price} ${product.product_currency}`}</p>
            {/* Render additional product details */}
          </div>
        ))}
      </div>
      <Link to="/add-product">
        <button className="add-button">+</button>
      </Link>
    </div>
  );
};

export default Dashboard;
