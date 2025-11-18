const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync } = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  var count = await getAsync("added_todos");
  if (!count) {
    count = 0;
  }
  res.send({ added_todos: parseInt(count) });
});

module.exports = router;
