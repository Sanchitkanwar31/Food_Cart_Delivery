// import React from 'react';
// import { useCart, useDispatchCart } from '../components/ContextReducer';
// import { MdDelete } from "react-icons/md"; // ✅ Fixed missing import

// export default function Cart() {
//     let data = useCart();
//     let dispatch = useDispatchCart(); 

//     const handleCheckOut = async () => {
//         let userEmail = localStorage.getItem("userEmail");

//         let response = await fetch("http://localhost:5173/cart", { 
//             method: "POST",
//             headers: {
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify({
//                 order_data: data,
//                 email: userEmail,
//                 order_date: new Date().toDateString()
//             })     
//         });

//         console.log("JSON RESPONSE:::::", response.status);
//         if (response.status === 200) {
//             dispatch({ type: "DROP" });
//         }
//     }

//     // ✅ Check if the cart is empty
//     if (data.length === 0) {
//         return (
//             <div>
//                 <div className='m-5 w-100 text-center fs-3'>Cart is Empty!</div>
//             </div>
//         );
//     }
//      const handleRemove = (index)=>{
//     console.log(index)
//     dispatch({type:"REMOVE",index:index})
//   }

//     // ✅ Calculate total price
//     let totalPrice = data.reduce((total, food) => total + food.price * (food.qty || food.quantity), 0);

//     return (
//         <div>
//             <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
//                 <table className='table table-striped table-bordered'>
//                     <thead className='text-success fs-4'>
//                         <tr>
//                             <th scope='col'>S.No</th>
//                             <th scope='col'>Name</th>
//                             <th scope='col'>Quantity</th>
//                             <th scope='col'>Option</th>
//                             <th scope='col'>Amount</th>
//                             <th scope='col'>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((food, index) => (
//                             <tr key={index}>
//                                 <th scope='row'>{index + 1}</th>
//                                 <td>{food.name}</td>
//                                 <td>{food.qty || food.quantity}</td> 
//                                 <td>{food.size}</td>
//                                 <td>₹{food.price * (food.qty || food.quantity)}</td>
//                                 <td>
//                                     <button type="button" className="btn p-0" onClick={() => handleRemove(index)}>
//                                         <MdDelete size={24} color="red" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="text-end fs-4 mt-3">
//                     <strong>Total Price: ₹{totalPrice}</strong>
//                 </div>
//                 <div>
//                     <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { MdDelete } from "react-icons/md"; 

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
    
        if (!userEmail || data.length === 0 || !data) {
            console.error("User email or cart data is missing.");
            return;
        }
    
        let response = await fetch("http://localhost:3000/api/orderData", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: data,
                order_date: new Date().toDateString() 
            })     
        });
    
        let resJson = await response.json();

        if (response.status === 200 && resJson.success) {
            console.log("Order placed successfully:", resJson);
            dispatch({ type: "DROP" });
        } else {
            console.error("Failed to place order:", resJson);
        }
    };
    
    const handleRemove = (index) => {
        console.log("Removing item at index:", index);
        dispatch({ type: "REMOVE", index });
    };

    const handleUpdate = (index, newQty) => {
        if (newQty < 1) return; // Prevent negative values
        console.log(`Updating item at index ${index} to quantity:`, newQty);
        dispatch({ type: "UPDATE", index, newQty });
    };

    //  Reset the cart
    const handleResetCart = () => {
        dispatch({ type: "DROP" });
        console.log("🗑 Cart has been reset.");
    };

    if (data.length === 0) {
        return <div className='m-5 w-100 text-center fs-3'>Cart is Empty!</div>;
    }

    let totalPrice = data.reduce((total, food) => total + food.price * (food.qty || food.quantity), 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive'>
                <table className='table table-striped table-bordered'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>S.No</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>
                                <div className="d-flex align-items-center">
                                        <button className="btn btn-sm btn-outline-danger mx-1" 
                                            onClick={() => handleUpdate(index, (food.qty || food.quantity) - 1)}>
                                            ➖
                                        </button>
                                        <span className="mx-2">{food.qty || food.quantity}</span>
                                        <button className="btn btn-sm btn-outline-success mx-1" 
                                            onClick={() => handleUpdate(index, (food.qty || food.quantity) + 1)}>
                                            ➕
                                        </button>
                                    </div>
                                </td>
                                <td>{food.size}</td>
                                <td>₹{food.price * (food.qty || food.quantity)}</td>
                                <td>
                                    <button type="button" className="btn p-0" onClick={() => handleRemove(index)}>
                                        <MdDelete size={24} color="red" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-end fs-4 mt-3">
                    <strong>Total Price: ₹{totalPrice}</strong>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out 🗑️</button>
                </div>
            </div>

            <div className='d-flex justify-content-end btn mt-3 m-auto'>
                {/* Other Cart UI Elements */}

                <button onClick={handleResetCart} style={{ 
                    backgroundColor: "red", 
                    color: "white", 
                    padding: "10px 15px",

                    border: "none", 
                    cursor: "pointer",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    marginRight:"10px",
                }}>
                    Reset Cart
                </button>
            </div>
            
        </div>
    );
}


// import React from "react";
// import { useCart, useDispatchCart } from "../components/ContextReducer";
// import { MdDelete } from "react-icons/md"; 

// export default function Cart() {
//     let data = useCart();
//     let dispatch = useDispatchCart();

//     const handleCheckOut = async () => {
//         let userEmail = localStorage.getItem("userEmail");

//         let response = await fetch("http://localhost:5173/cart/orderData", { 
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 order_data: data, 
//                 email: userEmail
//             })     
//         });

//         console.log("📡 Response Status:", response.status); // Debugging line

//         let result = await response.json();
//         console.log("📡 Response JSON:", result); // Debugging line

//         if (response.status === 200 && result.success) {
//             dispatch({ type: "DROP" }); // Clear the cart after successful order
//         }
//     };

//     const handleRemove = (index) => {
//         console.log("🗑 Removing item at index:", index);
//         dispatch({ type: "REMOVE", index });
//     };

//     const handleUpdate = (index, newQty) => {
//         if (newQty < 1) return; // Prevent negative values
//         console.log(`🔄 Updating item at index ${index} to quantity:`, newQty);
//         dispatch({ type: "UPDATE", index, newQty });
//     };

//     if (data.length === 0) {
//         return <div className="m-5 w-100 text-center fs-3">🛒 Cart is Empty!</div>;
//     }

//     let totalPrice = data.reduce((total, food) => total + food.price * (food.qty || food.quantity), 0);

//     return (
//         <div>
//             <div className="container m-auto mt-5 table-responsive">
//                 <table className="table table-striped table-bordered">
//                     <thead className="text-success fs-4">
//                         <tr>
//                             <th scope="col">S.No</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Quantity</th>
//                             <th scope="col">Option</th>
//                             <th scope="col">Amount</th>
//                             <th scope="col">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((food, index) => (
//                             <tr key={index}>
//                                 <th scope="row">{index + 1}</th>
//                                 <td>{food.name}</td>
//                                 <td>
//                                     <div className="d-flex align-items-center">
//                                         <button className="btn btn-sm btn-outline-danger mx-1" 
//                                             onClick={() => handleUpdate(index, (food.qty || food.quantity) - 1)}>
//                                             ➖
//                                         </button>
//                                         <span className="mx-2">{food.qty || food.quantity}</span>
//                                         <button className="btn btn-sm btn-outline-success mx-1" 
//                                             onClick={() => handleUpdate(index, (food.qty || food.quantity) + 1)}>
//                                             ➕
//                                         </button>
//                                     </div>
//                                 </td>
//                                 <td>{food.size}</td>
//                                 <td>₹{food.price * (food.qty || food.quantity)}</td>
//                                 <td>
//                                     <button type="button" className="btn p-0" onClick={() => handleRemove(index)}>
//                                         <MdDelete size={24} color="red" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="text-end fs-4 mt-3">
//                     <strong>Total Price: ₹{totalPrice}</strong>
//                 </div>
//                 <div>
//                     <button className="btn bg-success mt-5" onClick={handleCheckOut}>🛒 Check Out</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
