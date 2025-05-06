const exppess = require("express");
const router = exppess.Router();

router.get("/", (req, res) => {
  res.send("всем прив!");
});

module.exports = router;
