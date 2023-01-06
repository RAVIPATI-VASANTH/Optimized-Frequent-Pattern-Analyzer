// const { MongoClient } = require("mongodb");
// const uri = "mongodb://127.0.0.1:27017";
const getItemsFromFPSRequets = require("./getItemsFromFPARequest");

const startFPARequest = (itemsBluePrint, userId) => {
  let getItemsListPromise = new Promise(function (resolve, reject) {
    let itemsList = getItemsFromFPSRequets(itemsBluePrint, userId);
    resolve();
  });
  getItemsListPromise.then(() => {}).catch(() => {});
};

module.exports = startFPARequest;
