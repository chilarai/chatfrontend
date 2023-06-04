import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from 'jwt-decode';
import coachkenbest from "../img/coachkenbest.png";
import LazyLoad from "react-lazyload";

export default function Settings() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const getUserId = () => {
    // Get the JWT token from your storage (e.g., localStorage or sessionStorage)
    const token = localStorage.getItem('token'); // Replace 'token' with your token key

    if (token) {
      // Decode the token to access the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;

      return userId;
    }

    return null;
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    try {
      const isValid = handleValidation();
      // Assuming you have a validation function

      if (isValid) {
        // Get the user ID and new password from your form inputs or state
        const userId = getUserId(); // Replace with your own logic to get the user ID
        const password = values.password

        // Send the change password request
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/change-password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, password }),
        });

        // Check the response status
        if (response.ok) {
          // Password change successful
          toast.error("Password change successful", toastOptions);
          // Perform any necessary actions after password change
        } else {
          // Password change failed
          const errorData = await response.json();
          toast.error(errorData.error, toastOptions);
        }
      }
    } catch (error) {
      toast.error("Password change failed", toastOptions);
    }
  };



  const handleLogOut = () => {
    navigate("/login");
  };



  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handlePasswordChange(event)}>
        <div className="logoInnerAlign">
            <LazyLoad once>
              <img src={coachkenbest} alt="" height="100" className="logoInner"/>
            </LazyLoad>
          </div>
          <div className="brand">
            <h1>Ask Coach Canion</h1>
          </div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="Change Password">Change Password</button>
        </form>
        {/* <NavLink to="/deleteaccount" >Delete Account</NavLink> */}
        <button type="LogOut" onClick={handleLogOut}>LogOut</button>

      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #D3D3D3;
  .logoInnerAlign{
    text-align:center;
  }
  .logoInner{
    background-color: white;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2.2rem;
    }
    h1 {
      color: 	white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #424242;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: white;
    padding: 1rem;
    border: 0.1rem solid #D3D3D3;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid white;
      outline: none;
    }
  }
  button {
    background-color: #D3D3D3;
    color: #424242;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: white;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;