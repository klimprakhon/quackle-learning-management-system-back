const prisma = require("../models/prisma");

const userService = {};

// create new user
userService.createUser = (data) => {
  return prisma.user.create({ data });
};

// find existed user by email
userService.findUserByEmail = (email) => {
  return prisma.user.findFirst({ where: { email } });
};

//find user by userId
userService.findUserById = (userId) => {
  return prisma.user.findFirst({ where: { id: userId } });
};

module.exports = userService;
