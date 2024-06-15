const topicService = require("../services/topic-service");

const topicController = {};

topicController.createTopics = async (req, res, next) => {
  try {
    const topics = req.body;

    const createdTopics = await topicService.createTopics(data);

    res.status(200).json(createdTopics);
  } catch (error) {
    next(error);
  }
};

module.exports = topicController;
