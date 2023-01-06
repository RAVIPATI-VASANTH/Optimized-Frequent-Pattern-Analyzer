const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getFPARequestsController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getFPARequests() {
      try {
        let fpaRequests = [];
        const database = client.db("MBAProjectDatabase");
        const retailerRequests = database.collection("retailerRequests");
        const cursor = await retailerRequests.find(
          {
            userId: req.query.userId,
          },
          {
            requestName: 1,
            status: 1,
            minSupport: 1,
            _id: 0,
            minConfidence: 1,
            discountStatus: 1,
            selectedList: 1,
          }
        );
        await cursor.forEach((document) => {
          fpaRequests.push({
            requestName: document.requestName,
            status: document.status,
            minSupport: document.minSupport,
            minConfidence: document.minConfidence,
            discountStatus: document.discountStatus,
            selectedList: document.selectedList,
          });
        });
        await client.close();
        resolve(fpaRequests);
      } finally {
      }
    }

    getFPARequests().catch((err) => {
      console.dir;
      reject(err);
    });
  });
  promise
    .then((fpaRequests) => {
      res.json({ message: true, fpaRequests: fpaRequests });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getFPARequestsController;
