import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    role: "user",
    secretKey: "", // only for admin
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin authentication check
    if (credentials.role === "admin" && credentials.secretKey !== "admin123") {
      alert("Invalid admin secret key");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid details");
      } else {
        alert("Move to Already user");
      }
    } catch (error) {
      console.log("Error submitting the form:", error);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div>
      <h1>Signup Page</h1>

      {/* 🚀 Role Selection Outside Form */}
      <div className="container mb-4">
        <label className="form-label">Select Role:</label>
        <div>
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={credentials.role === "admin"}
            onChange={(e) =>
              setCredentials({ ...credentials, role: e.target.value })
            }
            className="d-none"
          />
          <label
            htmlFor="admin"
            className={`btn ${
              credentials.role === "admin" ? "btn-primary" : "btn-outline-primary"
            } mx-2`}
          >
            Admin
          </label>

          <input
            type="radio"
            id="user"
            name="role"
            value="user"
            checked={credentials.role === "user"}
            onChange={(e) =>
              setCredentials({ ...credentials, role: e.target.value })
            }
            className="d-none"
          />
          <label
            htmlFor="user"
            className={`btn ${
              credentials.role === "user" ? "btn-primary" : "btn-outline-primary"
            } mx-2`}
          >
            User
          </label>
        </div>
      </div>

      {/* 📄 Signup Form */}
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
              required
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password.."
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location.."
              name="location"
              value={credentials.location}
              onChange={onChange}
              required
            />
          </div>

          {/* Secret Key Field (only for Admin) */}
          {credentials.role === "admin" && (
            <div className="form-group">
              <label htmlFor="secretKey">Secret Key (Admin Only)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter admin secret key"
                name="secretKey"
                value={credentials.secretKey}
                onChange={onChange}
                required
              />
            </div>
          )}

          <div className="form-group form-check my-2">
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
            Already a User/admin
          </Link>
        </form>
      </div>
    </div>
  );
}
