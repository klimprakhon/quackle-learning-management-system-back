const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // check if there is token
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    // extract token to verify
    const accessToken = authorization.split(" ")[1];
    // extract userId after verify token
    const payload = jwtService.verify(accessToken);

    const user = await userService.findUserById(payload.id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    delete user.password;

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
