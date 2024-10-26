// LoginPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Box, IconButton} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import './Login.css';
import apiUser from '../services/apiUser'
import { formValidation } from "./validation/validateForm";
import {setUserSession, removeUserSession} from '../services/authHelpers'

export default function Login ()  {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };

    const handleInputChange = (e) => {
      setErrorMessage("");
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSignUpClick = () => {
        const propsToPass = { formName:  "Register" };
        // Navigate to /form and pass state
        navigate("/form", { state: propsToPass });
      };

      const handleSubmit = async (event) => { 
        event.preventDefault();
        console.log(formData);
        const error = formValidation(formData);
        console.log('Error is', error);
        if(error !=='')
          setErrorMessage(formValidation(formData));
        else{
          try{
            // const payload = { email, password};
            const response = await apiUser.login(formData);
            console.log(response.data.token);
            setUserSession(response.data.token);
            navigate("/view-forms");
          }
          catch(error){
            console.log("Here error")
            console.log(error)
            setErrorMessage(error.response.data);
          }
      }
    }
    
    useEffect(() => {
      removeUserSession();
    }, []);

  return (
    <Container maxWidth="lg" className="login-container">
      <Box className="login-box">
        <Typography variant="h4" className="login-title">WELCOME BACK</Typography>
        <form onSubmit={handleSubmit}>
        {errorMessage && <Alert severity="error" className="alert">{errorMessage}</Alert>}
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            className="text-field"
            required
          />
          <TextField
            label="Password"
            type={passwordShown ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            className="text-field"
            required
            InputProps={{
              endAdornment: (
                // <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordShown ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                // </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
          >
            LOGIN
          </Button>
        </form>
        <Typography variant="body2" align="center" className="signup-text">
          Don't have an account? 
        <Button onClick={handleSignUpClick} className="signup-link"> Sign up</Button>
        {/* <button onClick={handleSignUpClick}>Sign Up</button> */}
        </Typography>
        <Typography variant="body2" align="center" className="signup-text">
          Forgot <Link to="/" className="signup-link">Password?</Link>
        </Typography>
      </Box>
    </Container>
  );
};


