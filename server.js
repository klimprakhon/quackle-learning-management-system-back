require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./src/middlewares/not-found");
const errorMiddleware = require("./src/middlewares/error");
const authRouter = require("./src/routes/auth-route");
const courseRoute = require("./src/routes/course-route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/course", courseRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
