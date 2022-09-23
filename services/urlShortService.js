const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const URL = require("../models/expHtmlCount");
const shortId = require("shortid");
const req = require("express/lib/request");

const createTemp = async (req) => {
  const url = new URL({
    user: req.user.sub,
    tempJSON: req.body.tempJSON,
    count: 0,
  });
  const shortUrl = await url.save();
  return shortUrl;
};

const increaseExpHtmlCount = async (req) => {
  let url = await URL.findById(req.params.id);
  console.log(url, 22);

  url.count = url.count + 1;
  const shortUrl = await URL.findByIdAndUpdate(req.params.id, url, {
    useFindAndModify: false,
  });
  return shortUrl;
};



const fetchShortUrls = async (req) => {
  const urls = await URL.find({ user: req.user.sub });
  return urls;
};
const shortUrlClickCount = async (req, res) => {
  let url = await URL.findById(req.params.id);

  url.clicks = url.clicks + 1;
  const shortUrl = await URL.findByIdAndUpdate(req.params.id, url, {
    useFindAndModify: false,
  });
  return shortUrl;
};
const redirectToUrl = async (code, res) => {
  const url = await URL.find();
  let temp = url.find((item) => {
    if (item.shortenedUrl?.includes(code)) {
      return item;
    }
  });

  res.redirect(temp.weburl);
};

const editAuthShortUrl = async (req, res) => {
  console.log(req.body.id, 55);

  const newShortUrl = await URL.findByIdAndUpdate(req.body.id, req.body, {
    useFindAndModify: false,
  });
  return newShortUrl;
};

module.exports = {
  createTemp,
  increaseExpHtmlCount,
  fetchShortUrls,
  shortUrlClickCount,
  redirectToUrl,
  editAuthShortUrl,
};
