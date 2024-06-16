const topicService = require("../services/topic-service");

const topicController = {};

topicController.createTopics = async (req, res, next) => {
  try {
    const topics = req.body;
    await topicService.createTopics(topics);

    const [data] = topics;
    const { courseId } = data;

    const topicIds = await topicService.getCreatedTopicIds(courseId);

    console.log(topicIds);

    res.status(200).json(topicIds);
  } catch (error) {
    next(error);
  }
};

module.exports = topicController;
