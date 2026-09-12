const connectDB = require("./config/db");
const express = require("express");
const carRouter = require("./routes/carRouter");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");

const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");
  
// express app
const app = express();

connectDB();
 
// middleware
app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes

app.use("/api/cars", carRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(unknownEndpoint);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

