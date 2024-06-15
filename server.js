require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./src/middlewares/not-found");
const errorMiddleware = require("./src/middlewares/error");
const authRouter = require("./src/routes/auth-route");
const categoryRouter = require("./src/routes/category-route");
const courseRouter = require("./src/routes/course-route");
const topicRouter = require("./src/routes/topic-route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/course", courseRouter);
app.use("/category", categoryRouter);
app.use("/topic", topicRouter);
// app.use("/lesson", lessonRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
