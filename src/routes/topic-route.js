const express = require("express");
const topicController = require("../controllers/topic-controller");

const topicRouter = express.Router();

topicRouter.post("/new", topicController.createTopics);

module.exports = topicRouter;
