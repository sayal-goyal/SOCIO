const express = require("express");
const router = express.Router();
const newsControllers = require("../controllers/newsControllers");
const { verifyToken, optionallyVerifyToken } = require("../middleware/auth");

router.get("/", optionallyVerifyToken, newsControllers.getNews);
router.post("/", verifyToken, newsControllers.createNews);

router.get("/:id", optionallyVerifyToken, newsControllers.getNew);

module.exports = router;