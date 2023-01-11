const startFPARequest = require("./../../backgroundTasks/startFPARequest");

const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const confirmRequestController = (req, res) => {
  console.log("called");
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);
    async function confirmRequest() {
      try {
        let request = {
          ...JSON.parse(req.query.request),
          userId: req.query.userId,
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
      // let itemsBluePrint = JSON.parse(req.query.request, req.query.userId);
      // if (itemsBluePrint.status === "Start Now")
      //   startFPARequest(itemsBluePrint, req.query.userId);
      res.json({ message: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: false, text: err });
    });
};

module.exports = confirmRequestController;
