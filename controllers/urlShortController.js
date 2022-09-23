const req = require("express/lib/request");
const urlService = require("../services/urlShortService");


const createTemp = async (req, res) => {
  
  const shortUrl = await urlService.createTemp(req);
  res.json(shortUrl);
};

const increaseExpHtmlCount = async (req, res) => {
  
  const shortUrl = await urlService.increaseExpHtmlCount(req);
  res.json(shortUrl);
};

const fetchShortUrls = async (req, res) => {
  
  const shortUrls= await urlService.fetchShortUrls(req);
  res.json(shortUrls);
};

const shortUrlClickCount=async(req,res)=>{
  const countUpdatedUrl=await urlService.shortUrlClickCount(req,res);
  res.json(countUpdatedUrl)

}

const redirectToUrl = async (req, res) => {
  
  const shortUrl = await urlService.redirectToUrl(req.params.code,res);
  res.json(shortUrl);
};
const editAuthShortUrl = async (req, res) => {
  console.log(req.params.id)
  
  const shortUrl = await urlService.editAuthShortUrl(req);
  res.json(shortUrl);
};
module.exports = {
  createTemp,
  increaseExpHtmlCount,
  fetchShortUrls,
  shortUrlClickCount,
  redirectToUrl,
  editAuthShortUrl
};
