const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const URL = require("../models/expHtmlCount");
const urlController = require("../controllers/urlShortController");
const authToken = require("../middleware/authToken");
const { body, validationResult } = require("express-validator");
const validate = require("../middleware/validateFields");

router.route("/auth/create-temp").post(authToken, urlController.createTemp);

router
  .route("/auth/exp-html-count")
  .post(authToken, urlController.increaseExpHtmlCount);

router.route("/:id").post(urlController.shortUrlClickCount);

router
  .route("/auth/getAll-short-url")
  .get(authToken, urlController.fetchShortUrls);

router.route("/:code").get(urlController.redirectToUrl);

module.exports = router;
