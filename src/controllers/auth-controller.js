const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    // check existedUser in db
    const data = req.input;
    const existedUser = await userService.findUserByEmail(data.email);

    if (existedUser) {
      res.status(400).json({ message: "email is already in use" });
    }
    // hash password
    data.password = await hashService.hash(data.password);

    // inject new user into db
    await userService.createUser(data);

    // response
    res.status(200).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    const data = req.input;
    // check if that user is existed
    const existedUser = await userService.findUserByEmail(data.email);

    // handle if use is not existed
    if (!existedUser) {
      return res.status(400).json({ message: "user not found" });
    }

    // check if input password is correct
    const isMatch = await hashService.compare(
      data.password,
      existedUser.password
    );

    // handle if it's incorrect password
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // generate jwt token
    const accessToken = jwtService.sign({ id: existedUser.id });
    // response
    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

authController.getMe = (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

authController.updateUserInfo = async (req, res, next) => {
  try {
    const data = req.input;
    const userId = req.user.id;

    data.password = await hashService.hash(data.password);

    const updatedUserInfo = await userService.updateInfo(userId, data);
    delete updatedUserInfo.password;
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
