// ___________________________________________________________
import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";  // Ensure correct import
import { MdDelete } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';


export default function Card(props) {
  const { foodIt, options } = props;
  // const priceOptions = Object.keys(options);
  const priceOptions = Object.keys(options).filter((key) => key !== "_id");

  const dispatch = useDispatchCart();
  const data = useCart();
  const priceref = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || "");

  const navigate = useNavigate();


  const handleAddToCart = async () => {
    const selectedPrice = options[size]; // Price for selected size
    console.log("Adding to cart:", {
      id: foodIt._id, // Ensure this is not undefined
      name: foodIt.name,
      price: selectedPrice,
      qty: qty,
      size: size,
    });

    
    await dispatch({
      type: "ADD",
      id: foodIt._id,
      name: foodIt.name,
      price: selectedPrice,
      qty: qty,
      size: size,
      img: foodIt.img,
    });

    console.log(data)
  };

  // Calculate the final price based on selected size and quantity
  const finalPrice = qty * parseInt(options[size]);
  
  const deleteFood = async () => {
    let response = await fetch(`http://localhost:3000/api/deleteFood?id=${foodIt._id}`, {
      method: "DELETE",
    });
  
    response = await response.json();
    console.log(response);
  };

  const handleClick = () => {
    navigate("/editFood", { replace: true, state: { foodIt } });
  };

  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  return (
    <div  className="card mt-2"
           style={{ width: "20rem", maxHeight: "400px" }}>
    <div className="d-flex align-items-center justify-content-between">
    <button onClick={handleClick}>
      <LiaEditSolid className="mr-2" />
    </button>
      <MdDelete className="cursor-pointer" onClick={deleteFood} />
    </div>
      <img
        src={foodIt.img}
        className="card-img-top"
        alt={foodIt.name}
        style={{ height: "150px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="card-title">{foodIt.name}</h5>
        <p className="card-text">{foodIt.description}</p>
        <div className="container">
          <div className="d-inline-block">
            <select
              className="h-100 w-40 bg-success me-5"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}//in this it will set quantity as per the value selected on page
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="d-inline-block">
            <select
              className="h-8 w-8 bg-success rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              ref={priceref}
            >
              
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}



            </select>
          </div>
          <hr />
          <div className="">
            {/* Display the price for the selected size */}
            Price: ₹{finalPrice}
            <button
            className="btn btn-success justify-end"
            onClick={handleAddToCart}
            style={{ marginLeft: "10px" }}
          >
            Add to Cart
          </button>
            
          </div>
          
          {/* <button
            className="btn btn-success justify-start"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
}

