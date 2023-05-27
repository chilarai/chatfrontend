import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import coachken from "../img/coachken.PNG";
import LazyLoad from "react-lazyload";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [value, setValue] = useState({
    email: "",
  });


  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { email } = value;
     if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const deleteAccount = async () => {
    try {
      const isValid = handleValidation(); // Assuming you have a validation function
  
      if (isValid) {
        const res = await axios.post("http://localhost:4000/user/delete-account", value);
        console.log(res);
        localStorage.clear();
        navigate("/login");
      } else {
        throw new Error("Account deletion failed");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  


  return (
    <>
      <FormContainer>
        <form action="" onSubmit={deleteAccount}>
          <div className="brand">
            <LazyLoad once>
              <img src={coachken} alt="" />
            </LazyLoad>
            <h1>Ask Coach Canion</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          
          <button type="Delete Account">Delete Account</button>
        </form>
        

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
      color: 	#ff0000;
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