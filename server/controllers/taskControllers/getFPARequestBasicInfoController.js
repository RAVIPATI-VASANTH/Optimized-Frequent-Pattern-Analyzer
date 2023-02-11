const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getFPARequestBasicInfoController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getFPARequestBasicInfo() {
      try {
        let request = {};
        const database = client.db("MBAProjectDatabase");
        const retailerRequests = database.collection("retailerRequests");
        const cursor = await retailerRequests.findOne({
          userId: req.query.userId,
          requestName: req.query.requestName,
        });
        request = { ...cursor };
        const { result, _id, ...info } = request;
        await client.close();
        resolve(info);
      } finally {
      }
    }

    getFPARequestBasicInfo().catch((err) => {
      console.dir;
      console.log(err);
      reject(err);
    });
  });
  promise
    .then((request) => {
      res.json({ message: true, info: request });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getFPARequestBasicInfoController;
