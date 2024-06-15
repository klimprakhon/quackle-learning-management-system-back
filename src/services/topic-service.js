const prisma = require("../models/prisma");

const topicService = {};

topicService.createTopics = (topicInfo) => {
  return prisma.topic.createMany(topicInfo);
};

module.exports = topicService;
