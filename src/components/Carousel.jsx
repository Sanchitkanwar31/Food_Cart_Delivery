// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// export default function Carousel() {

//   const [search, setsearch] = useState('')

//   return (
//     <div className="carousel-container position-relative">
//       {/* Carousel Container */}
//       <div id="carouselExampleInterval" className="carousel slide m-2 p-2" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           {/* First Slide */}
//           <div className="carousel-item active" data-bs-interval="5000">
//             <img 
//               src="https://people.com/thmb/J7mMPxWT0MhdrKuy0FqxXsL2HiE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/pizza-hut-2-d194594b6b594e27912d5174c2fe8e06.jpg" 
//               className="d-block w-100" 
//               alt="Delicious Pizza" 
//               style={{ height: "300px", objectFit: "cover", filter: "brightness(30%)" }}
//             />
//           </div>
//           {/* Second Slide */}
//           <div className="carousel-item" data-bs-interval="100">
//             <img 
//               src="https://img.delicious.com.au/9d27SNl7/del/2022/10/p89-salt-and-vinegar-crumbed-chicken-burger-176377-1.png" 
//               className="d-block w-100" 
//               alt="Tasty Burger" 
//               style={{ height: "300px", objectFit: "cover", filter: "brightness(30%)" }}
//             />
//           </div>
//           {/* Third Slide */}
//           <div className="carousel-item">
//             <img 
//               src="https://wallpapercave.com/wp/wp9199764.jpg" 
//               className="d-block w-100" 
//               alt="Chole Bhature" 
//               style={{ height: "300px", objectFit: "cover", filter: "brightness(40%)" }}
//             />
//           </div>
//         </div>

//         {/* Carousel Controls */}
//         <button 
//           className="carousel-control-prev" 
//           type="button" 
//           data-bs-target="#carouselExampleInterval" 
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button 
//           className="carousel-control-next" 
//           type="button" 
//           data-bs-target="#carouselExampleInterval" 
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>

//       {/* Search Bar (Positioned Inside the Carousel Container) */}
//       <div className="position-absolute top-0 start-50 translate-middle-x p-3 w-75 z-index-10">
//         <div className="d-flex justify-content-center">
//           <input 
//             className="form-control me-2" 
//             type="search" 
//             placeholder="Search" 
//             aria-label="Search" 
//             value={search}
//             onChange={(e) => {e.setSearch(e.target.value)}}
//           />
//           <button className="btn btn-outline-success text-white ng-sucsess" type="submit">Search</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is loaded

export default function Carousel() {
  const [search, setSearch] = useState("");

  return (
    <div className="carousel-container position-relative">
      {/* Carousel Container */}
      <div id="carouselExampleInterval" className="carousel slide m-2 p-2" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* First Slide */}
          <div className="carousel-item active" data-bs-interval="5000">
            <img 
              src="https://people.com/thmb/J7mMPxWT0MhdrKuy0FqxXsL2HiE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/pizza-hut-2-d194594b6b594e27912d5174c2fe8e06.jpg" 
              className="d-block w-100" 
              alt="Delicious Pizza" 
              style={{ height: "300px", objectFit: "cover", filter: "brightness(30%)" }}
            />
          </div>
          {/* Second Slide */}
          <div className="carousel-item" data-bs-interval="5000">
            <img 
              src="https://img.delicious.com.au/9d27SNl7/del/2022/10/p89-salt-and-vinegar-crumbed-chicken-burger-176377-1.png" 
              className="d-block w-100" 
              alt="Tasty Burger" 
              style={{ height: "300px", objectFit: "cover", filter: "brightness(30%)" }}
            />
          </div>
          {/* Third Slide */}
          <div className="carousel-item" data-bs-interval="5000">
            <img 
              src="https://wallpapercave.com/wp/wp9199764.jpg" 
              className="d-block w-100" 
              alt="Chole Bhature" 
              style={{ height: "300px", objectFit: "cover", filter: "brightness(40%)" }}
            />
          </div>
        </div>

        {/* Carousel Controls */}
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#carouselExampleInterval" 
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#carouselExampleInterval" 
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Search Bar (Positioned Inside the Carousel Container) */}
      {/* <div className="position-absolute top-50 start-50 translate-middle w-75">
        <div className="d-flex justify-content-center">
          <input 
            className="form-control me-2" 
            type="search" 
            placeholder="Search" 
            aria-label="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Fixed handler
          />
          <button className="btn btn-outline-success text-white" type="submit">
            Search
          </button>
        </div>
      </div> */}
    </div>
  );
}
