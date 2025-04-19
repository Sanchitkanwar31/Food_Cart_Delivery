import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All"); // Filter state

  const loadData = async () => {
    let response = await fetch("http://localhost:3000/api/foodData", {
      method: "POST",//since POST is more secure and data from this is not publicly available ,
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setCategories(response[0]); // Categories
    setFoodItems(response[1]); // Food items
  };

  const deleteCat = async (id) => {
    let response = await fetch(`http://localhost:3000/api/deleteCategory?id=${id}`, {
      method: "DELETE",
    });
  
    response = await response.json();
    console.log(response);
  };
  

  useEffect(() => {
    loadData();
  }, []);

  const filteredFoodItems = foodItems.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || food.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div
      style={{
        background: "linear-gradient(to right , black, purple)",
        minHeight: "300vh",
        color: "white",
      }}
    >
      <Navbar />
      <Carousel />
      
      <div className="container">
        {/* Search and Filter Section */}
        <div className="d-flex justify-content-center my-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className="d-flex justify-content-center my-3">
          <button
            className={`btn ${filterType === "All" ? "btn-primary" : "btn-outline-primary"} mx-2`}
            onClick={() => setFilterType("All")}
          >
            All
          </button>
          <button
            className={`btn ${filterType === "veg" ? "btn-success" : "btn-outline-success"} mx-2`}
            onClick={() => setFilterType("veg")}
          >
            Veg
          </button>
          <button
            className={`btn ${filterType === "Non-Veg" ? "btn-danger" : "btn-outline-danger"} mx-2`}
            onClick={() => setFilterType("Non-Veg")}
          >
            Non-Veg
          </button>
        </div>

        {/* Display Categories and Filtered Food Items */}
        {categories.map((category) => {
          const itemsInCategory = filteredFoodItems.filter(
            (item) => item.CategoryName === category.name
          );

          return (
            <div key={category._id} className="category-section mb-5">
            <h2 className="fs-2 m-3">
              {category.name}
              <div className="tw-ml-72" onClick={() => deleteCat(category._id)}>
                <MdDelete />
              </div>
            </h2>

              {itemsInCategory.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                  {itemsInCategory.map((food) => (
                    <div key={food._id} className="col">
                      <Card foodIt={food} options={food.options[0]} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items found for "{search}"</p>
              )}
              <hr />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import Navbar from "../components/navbar";
// import Footer from "../components/Footer";
// import Card from "../components/Card";
// import Carousel from "../components/Carousel";  // Import Carousel

// export default function Home() {
//   const [categories, setCategories] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("All"); // Filter state

//   const loadData = async () => {
//     let response = await fetch("http://localhost:3000/api/foodData", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     response = await response.json();
//     setCategories(response[0]); // Categories
//     setFoodItems(response[1]); // Food items
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const filteredFoodItems = foodItems.filter((food) => {
//     const matchesSearch =
//       food.name.toLowerCase().includes(search.toLowerCase()) ||
//       food.description.toLowerCase().includes(search.toLowerCase());
//     const matchesType = filterType === "All" || food.type === filterType;
//     return matchesSearch && matchesType;
//   });

//   return (
//     <div style={{ background: "linear-gradient(to right , black, purple)", minHeight: "300vh", color: "white" }}>
//       <Navbar />
//       <Carousel /> {/* Added Carousel Component */}

//       <div className="container">
//         {/* Search and Filter Section */}
//         <div className="d-flex justify-content-center my-3">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ maxWidth: "400px" }}
//           />
//         </div>
//         <div className="d-flex justify-content-center my-3">
//           <button
//             className={`btn ${filterType === "All" ? "btn-primary" : "btn-outline-primary"} mx-2`}
//             onClick={() => setFilterType("All")}
//           >
//             All
//           </button>
//           <button
//             className={`btn ${filterType === "veg" ? "btn-success" : "btn-outline-success"} mx-2`}
//             onClick={() => setFilterType("veg")}
//           >
//             Veg
//           </button>
//           <button
//             className={`btn ${filterType === "Non-Veg" ? "btn-danger" : "btn-outline-danger"} mx-2`}
//             onClick={() => setFilterType("Non-Veg")}
//           >
//             Non-Veg
//           </button>
//         </div>

//         {/* Display Categories and Filtered Food Items */}
//         {categories.map((category) => {
//           const itemsInCategory = filteredFoodItems.filter(
//             (item) => item.CategoryName === category.name
//           );

//           return (
//             <div key={category._id} className="category-section mb-5">
//               <h2 className="fs-2 m-3">{category.name}</h2>
//               {itemsInCategory.length > 0 ? (
//                 <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
//                   {itemsInCategory.map((food) => (
//                     <div key={food._id} className="col">
//                       <Card foodIt={food} options={food.options[0]} />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No items found for "{search}"</p>
//               )}
//               <hr />
//             </div>
//           );
//         })}
//       </div>
//       <Footer />
//     </div>
//   );
// }
