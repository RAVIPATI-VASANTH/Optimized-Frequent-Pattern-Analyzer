const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getFPARequestInfoController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getFPARequestInfo() {
      // console.log("he");
      // req = JSON.parse(req.query);
      try {
        let request = {};
        // console.log(req.query);
        const database = client.db("MBAProjectDatabase");
        const retailerRequests = database.collection("retailerRequests");
        const cursor = await retailerRequests.findOne({
          userId: req.query.userId,
          requestName: req.query.requestName,
        });
        request = { ...cursor };
        const { result, ...newRequest } = request;
        await client.close();
        resolve(result.fpa);
      } finally {
      }
    }

    getFPARequestInfo().catch((err) => {
      console.dir;
      console.log(err);
      reject(err);
    });
  });
  promise
    .then((request) => {
      res.json({ message: true, fpaInfo: request });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getFPARequestInfoController;
