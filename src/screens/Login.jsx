import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // } it will cause the error as  it parses the response JSON and checks for json.success or other error messages from the backend. Instead, it goes directly to the catch block.
      // rto use response we should add the json to be parsed inside thiss condtnm


      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Login successful. Redirecting...");
        //new email added on 7/2/25 below
        localStorage.setItem("userEmail", credentials.email);

        localStorage.setItem("authtoken", json.data);
        console.log(localStorage.getItem("authtoken"));
        // Add navigation logic here, e.g., redirect to a dashboard
        navigate("/");
      }
    } 
    
    catch (err) {
      console.error("Error during login:", err);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/Signup" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}
