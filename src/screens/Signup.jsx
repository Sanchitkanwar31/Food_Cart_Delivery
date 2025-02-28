import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: credentials.name,email:credentials.email,password:credentials.password,location:credentials.location}), 
      });

      const json = await response.json();
      console.log(json);
      if(!json.success){
        alert("Enter valid")
      }
      else{
        alert("Move to Already user")
      }
    } catch (error) {
      console.log("Error submitting the form:", error);
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name.."
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email.."
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password.."
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location.."
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Completed
            </label>
          </div>
          <button type="reset" className="m-2 btn btn-danger">
            Reset Form 
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
}
