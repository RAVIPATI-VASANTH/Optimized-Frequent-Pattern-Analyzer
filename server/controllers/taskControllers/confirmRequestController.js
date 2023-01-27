const startFPARequest = require("./../../backgroundTasks/startFPARequest");
const updateRequestStatus = require("./../../backgroundTasks/updateRequestStatus");
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const confirmRequestController = (req, res) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);
    async function confirmRequest() {
      try {
        let result = { fpa: { status: "Processing", arList: [] } };
        let request = {
          ...JSON.parse(req.query.request),
          userId: req.query.userId,
          result: result,
        };
        const database = client.db("MBAProjectDatabase");
        const retailerRequests = database.collection("retailerRequests");
        await retailerRequests.insertOne(request);
        await client.close();
        resolve();
      } finally {
      }
    }
    confirmRequest().catch((err) => {
      reject(err);
    });
  });
  promise
    .then(() => {
      let itemsBluePrint = JSON.parse(req.query.request);
      if (itemsBluePrint.status === "Start Now") {
        let promise = new Promise((resolve, reject) => {
          startFPARequest(itemsBluePrint, req.query.userId);
          resolve();
        });
        promise.then();
      }
      updateRequestStatus(
        req.query.userId,
        itemsBluePrint.requestName,
        "ALL",
        "Processing"
      );
      res.json({ message: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: false, text: err });
    });
};

module.exports = confirmRequestController;
