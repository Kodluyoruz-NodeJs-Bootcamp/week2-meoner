const router = require("express").Router();
const User = require("../model/User");
const verify = require("../middlewares/verifyToken");

router.get("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  res.send(user);
});

module.exports = router;
