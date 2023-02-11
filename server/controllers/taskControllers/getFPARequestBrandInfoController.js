const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getFPARequestBrandInfoController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getFPARequestBrandInfo() {
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
        resolve(result.brands);
      } finally {
      }
    }

    getFPARequestBrandInfo().catch((err) => {
      console.dir;
      console.log(err);
      reject(err);
    });
  });
  promise
    .then((request) => {
      res.json({ message: true, brandsInfo: request });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getFPARequestBrandInfoController;
