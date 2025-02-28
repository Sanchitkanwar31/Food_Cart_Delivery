// import React from "react";
// import { useDispatchCart,useCart } from "./ContextReducer";
// export default function Card(props) {
//   let option = props.options;
//   let priceoption = Object.keys(option);
//   let dispatch = useDispatchCart();
//   let foodIt = props.foodIt;

// const [qty, setqty] = useState(1)
// const [size, setsize] = useState("")


//   const handleaddtocart =() =>{
//     dispatch({type:"ADD", id:props.foodIt.id,price:props.foodIt.price,qty: qty,size: size})  
//   }

//   return (
//     <div>
//       <div>
//         {/* BURGER card */}
//         <div
//           className="card mt-2"
//           style={{ width: "20rem", maxHeight: "380px" }}
//         >
//           <img
//             // src={props.foodimage} since use global context so names of map of Home not use
//             src={props.foodIt.img}
//             className="card-img-top"
//             alt="..."
//             style={{ height: "150px", objectFit: "cover" }}
//           />
//           <div className="card-body">
//             {/* <h5 className="card-title">{props.foodname}</h5>
//             <p className="card-text">{props.details}</p> */}

            
//             <h5 className="card-title">{props.foodIt.name}</h5>
//             {/* <p className="card-text">{props.foodIt.description}</p> */}

//             <div className="container ">
//               {/* Quantity Select */}
//               <div className="d-inline-block ">
//                 {/* Quantity: */}
//                 <select className="h-100 w-40 bg-success me-5">
//                   {Array.from(Array(6), (e, i) => {
//                     return (
//                       <option key={i + 1} value={i + 1}>
//                         {i + 1}
//                       </option>
//                     );
//                   })}
//                 </select>

                
//               </div>

//               {/* Flavour Select */}
//               <div className="d-inline-block ">
//                   {/* Size: */}
//                 <select className="h-8 w-8 bg-success rounded ">
//                   {/* Linking price = datbase Option */}
//                   {priceoption.map((price) => (
//                     <option key={price} value={price}>
//                       {price}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <hr></hr>
//               <button className="btn-success justify-start" onClick={handleaddtocart}>Add to Eat</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ___________________________________________________________
import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";  // Ensure correct import

export default function Card(props) {
  const { foodIt, options } = props;
  const priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceref = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || "");

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

  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  return (
    <div  className="card mt-2"
           style={{ width: "20rem", maxHeight: "400px" }}>
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


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import React, { useState } from "react";

// export default function Card(props) {
//   let option = props.options;
//   let priceoption = Object.keys(option);
//   let foodIt = props.foodIt;

//   const dispatch = useDispatcher();

//   const handleaddtocart = () => {
//     const item = {
//       id: foodIt.id,
//       name: foodIt.name,
//       quantity: 1,
//       size: priceoption[0],
//       price: option[priceoption[0]],
//     };

//     dispatch({ type: "ADD_TO_CART", payload: item });
//   };

//   return (
//     <div>
//       <div>
//         <div
//           className="card mt-2"
//           style={{ width: "20rem", maxHeight: "380px" }}
//         >
//           <img
//             src={props.foodIt.img}
//             className="card-img-top"
//             alt="..."
//             style={{ height: "150px", objectFit: "cover" }}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{props.foodIt.name}</h5>
//             <div className="container">
//               <div className="d-inline-block me-5">
//                 <select className="h-100 w-40 bg-success">
//                   {Array.from(Array(6), (e, i) => {
//                     return (
//                       <option key={i + 1} value={i + 1}>
//                         {i + 1}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div className="d-inline-block">
//                 <select className="h-8 w-8 bg-success rounded">
//                   {priceoption.map((price) => (
//                     <option key={price} value={price}>
//                       {price}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <hr />
//               <button
//                 className="btn-success justify-start"
//                 onClick={handleaddtocart}
//               >
//                 Add to Eat
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
