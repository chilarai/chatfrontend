import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    const { password, confirmPassword, email } = values;
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

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    try {
      const details = values;
      const isValid = handleValidation();
      if (isValid) {
        const token = localStorage.getItem("token");

        axios
          .put(`http://localhost:5000/user/change-password`, details, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res);
            navigate("/login");
          })
          .catch((error) => {
            console.error(error);
            alert("Password change failed");
          });
      } else {
        throw new Error("Password change failed");
      }
    } catch (error) {
      console.error(error);
      alert("Password change failed");
    }
  };


  const handleLogOut = () => {
    navigate("/login");
  };



  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handlePasswordChange(event)}>
          <div className="brand">
            <LazyLoad once>
              <img src={coachkenbest} alt="" />
            </LazyLoad>
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
        <NavLink to="/deleteaccount" >Delete Account</NavLink>
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