import React, { useEffect, useState } from "react";
import apiForms from '../services/apiForms'
import apiUser from '../services/apiUser'
import { formValidation } from "./validation/validateForm";
import "./GeneralForm.css"
import {Button,TextField,Select,MenuItem,FormControl,InputLabel,IconButton,Typography,Container,Box} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";


export default function GeneralForm({domain}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const formName = domain || location.state?.formName || '';

  const handleInputChange = (e) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getQuestions = async () => {
    try {
        console.log("formName", formName, domain);
      let response;
      //public questions
      if(formName === "Register")
        response = await apiForms.getQuestions(formName);
      //private questions
      else
        response = await apiForms.getPrivateQuestions(formName);

      console.log("Res", response);
      const data = response?.data || [];
      setQuestions(data);

      const initialFormData = {};
      data.forEach((question) => {
        if (question.answerType === 2) {
          initialFormData[question.question] = "";
          // question.answers[0]?.answer || "";
        }
      });
      setFormData(initialFormData);

    } catch (err) {
       console.error("Error fetching questions:", err);
       setErrorMessage(err.response.data)
    }
  };

  const fetchQuestionData = (questionData) => {
    if (questionData.answerType === 1) {
      let typeQ = questionData.inputType;
      if (questionData.question === "Password") {
          typeQ = passwordShown ? "text" : "password";
      }
      return (
        <FormControl fullWidth margin="normal">
          <TextField
            type={typeQ}
            label={questionData.question}
            name={questionData.question}
            value={formData[questionData.question] || ""}
            onChange={handleInputChange}
            InputProps={{
              endAdornment:
                questionData.question === "Password" ? (
                  <IconButton onClick={togglePasswordVisiblity}>
                    {passwordShown ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                ) : null,
            }}
            required
          />
        </FormControl>
      );
    } else if (questionData.answerType === 2) {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{questionData.question}</InputLabel>
          <Select
            name={questionData.question}
            value={formData[questionData.question] || ""}
            onChange={handleInputChange}
            required
            className="custom-select"
          >
            {questionData.answers.map((answer, index) => (
              <MenuItem key={index} value={answer.answer} className="custom-menu-item">
                {answer.answer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  useEffect(() => {
    getQuestions();
  }, [formName]);

  // useEffect(() => {
  //   console.log("Questions", questions);
  //   console.log("Form Data", formData);
  // }, [questions]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = formValidation(formData);
    console.log('Error is', error);
    if(error !=='')
      setErrorMessage(formValidation(formData));
    else {
      try
      { 
        if(formName === "Register"){
            await apiUser.register(formData);
            navigate("/");
        }

      }
      catch(err){
        setErrorMessage(err.response.data); 
      }
    };
}

 // Filter questions based on page value
const leftQuestions = questions.filter(q => q.page === "1" || q.page === "2");
const rightQuestions = questions.filter(q => q.page === "1.1" || q.page === "2.2");

  return (
    <>
    {/* <Navbar /> */}
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom className="title">
        {formName}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={4} display="flex" justifyContent="space-between" gap={2}>
          <Box flex={1}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {leftQuestions.map((questionData, index) => (
              <div key={index}>{fetchQuestionData(questionData)}</div>
            ))}
          </Box>
          <Box flex={1}>
            {rightQuestions.map((questionData, index) => (
              <div key={index}>{fetchQuestionData(questionData)}</div>
            ))}
          </Box>
        </Box>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            type="submit"
            endIcon={<SendIcon />}
            color="primary"
            variant="contained"
          >
            {formName}
          </Button>
        </Box>
      </form>
    </Container>
  </>
  );
}
