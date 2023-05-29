const handlePasswordChange = async (event) => {
    event.preventDefault();
    try {
      const details = values;
      event.preventDefault();
      const isValid = handleValidation();
      if (isValid) {
        const userId = await getUserId();// Replace this with the logic to get the user's ID
  
        axios
          .post(`http://localhost:4000/user/${userId}/change-password`, details) // Send the request to the user's ID
          .then((res) => {
            console.log(res);
            localStorage.clear();
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/login");
          })
      } else {
        throw new Error("Password change failed");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  