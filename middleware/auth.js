const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "verysecret123");
    console.log(decoded.userId)
    // const user = await User.findOne({
    //   userId: decoded.userId,
    // });

    const user = await User.getUserById(decoded.userId);
    console.log("user : ", user);
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
module.exports = userAuth;