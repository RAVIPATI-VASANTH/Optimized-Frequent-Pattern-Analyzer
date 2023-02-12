const startFPARequest = require("./../../backgroundTasks/startFPARequest");
const updateRequestStatus = require("./../../backgroundTasks/updateRequestStatus");
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const startFPARequestController = (req, res) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);
    async function confirmRequest() {
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerRequests = database.collection("retailerRequests");
        const cursor = await retailerRequests.findOne({
          userId: req.query.userId,
          requestName: req.query.requestName,
        });
        // console.log(cursor);
        let itemsBluePrint = {
          requestName: req.query.requestName,
          status: "Start Now",
          minSupport: cursor.minSupport,
          minConfidence: cursor.minConfidence,
          discountStatus: cursor.discountStatus,
          selectedList: cursor.selectedList,
          date: cursor.date,
        };
        console.log(itemsBluePrint);
        await client.close();
        resolve(itemsBluePrint);
      } finally {
      }
    }
    confirmRequest().catch((err) => {
      reject(err);
    });
  });
  promise
    .then((itemsBluePrint) => {
      if (itemsBluePrint.status === "Start Now") {
        let promise = new Promise((resolve, reject) => {
          startFPARequest(itemsBluePrint, req.query.userId);
          resolve();
        });
        promise.then();
        updateRequestStatus(
          req.query.userId,
          itemsBluePrint.requestName,
          "ALL",
          "Processing"
        );
        updateRequestStatus(
          req.query.userId,
          itemsBluePrint.requestName,
          "FPA",
          "Processing"
        );
        updateRequestStatus(
          req.query.userId,
          itemsBluePrint.requestName,
          "BRAND",
          "Processing"
        );
      }
      res.json({ message: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: false, text: err });
    });
};

module.exports = startFPARequestController;
