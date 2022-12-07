// const htmlFile = require("./bigbasket1.html");

const cheerio = require("cheerio");
const axios = require("axios");
// const fetch = require("fetch");

// try {
//   const $ = cheerio.load(htmlFile);
// } catch (err) {
//   console.log("error ocuured");
// }

// let result = [];
// try {
//   $("col-sm-12 col-xs-7 prod-name", htmlFile).each(function () {
//     console.log("Hello");
//   });
// } catch (err) {
//   console.log(err);
// }

axios
  .get("https://www.bigbasket.com/cl/foodgrains-oil-masala/?nc=cs")
  .then((response) => {
    console.log("hello");
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });

// console.log($.html());
