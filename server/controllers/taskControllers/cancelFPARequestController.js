const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const cancelFPARequestController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);
    async function cancelFPARequest() {
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerRequests = database.collection("retailerRequests");
        await retailerRequests.deleteOne({
          userId: req.query.userId,
          requestName: req.query.requestName,
        });
        resolve();
      } finally {
      }
    }

    cancelFPARequest().catch((err) => {
      console.log(err);
      reject(err);
    });
  });

  promise
    .then(() => {
      res.json({ message: true });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = cancelFPARequestController;
