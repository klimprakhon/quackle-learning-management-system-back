const bcrypt = require("bcryptjs");

const hashService = {};

// hash password
hashService.hash = (password) => {
  return bcrypt.hash(password, 12);
};

// hash verify
hashService.compare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = hashService;
