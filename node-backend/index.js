require('dotenv').config();
const express = require('express');
const cors = require("cors");
const formsRouter = require("./routes/forms_router");
const userRouter = require("./routes/user_router")
const app = express();
const PORT = process.env.EXTERNAL_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//use routes
app.use("/forms", formsRouter);
app.use("/user", userRouter);


// Add this route to handle GET requests at the root
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
