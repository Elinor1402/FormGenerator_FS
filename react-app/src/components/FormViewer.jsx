import GeneralForm from "./GeneralForm";
import apiForms from '../services/apiForms'
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {removeUserSession} from '../services/authHelpers'
import {Select,MenuItem,FormControl,InputLabel,Typography,Container,} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Alert from "@mui/material/Alert";


export default function FormViewer ()  {
    const [domain, setDomain] = useState("");
    const [answers, setAnswers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const getDomains = async () => {
        try {
            
            const response = await apiForms.getDomains();
            console.log("Res", response);
            const data = response?.data || [];
            setAnswers(data);
    
        } catch (err) {
           console.error("Error fetching answers:", err);
           setErrorMessage(err.response.data)
           console.log("The error is", errorMessage)
        }
      };

      const handleInputChange = (e) => {
        setErrorMessage("");
        setDomain(e.target.value)
      };

      const logOut = () => {
        removeUserSession();
        navigate("/");

      };
    useEffect(() => {
        getDomains();
      }, [domain]);

    return (
       <>
       <LogoutIcon onClick={logOut}  style={{ fontSize: '2.25rem', cursor: 'pointer' }}/>
        <Container maxWidth="lg">
         <Typography variant="h4" className="title">Form Searcher</Typography>
        {errorMessage === "" ? (
            <>
            <FormControl fullWidth margin="normal">
             <InputLabel>Domain</InputLabel>
             <Select
               name={domain}
               value={domain}
               onChange={handleInputChange}
               required
               className="custom-select"
             >
               {answers.map((answer, index) => (
                 <MenuItem key={index} value={answer.answer} className="custom-menu-item">
                   {answer.answer}
                 </MenuItem>
               ))}
             </Select>
           </FormControl>
          <GeneralForm domain={domain}/>
          </>
        ) :(<Alert severity="error">{errorMessage}</Alert>)}
       </Container>
        </>
    );
}