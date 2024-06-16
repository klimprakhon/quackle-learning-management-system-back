const prisma = require("../models/prisma");

const topicService = {};

topicService.createTopics = (topicInfo) => {
  return prisma.topic.createMany({ data: topicInfo });
};

topicService.getCreatedTopicIds = (courseId) => {
  return prisma.topic.findMany({
    where: {
      courseId,
    },
    select: {
      id: true,
    },
  });
};

module.exports = topicService;
