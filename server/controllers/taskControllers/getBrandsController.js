const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getBrandsController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getBrands() {
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerBrands = database.collection("retailerBrands");
        const cursor = await retailerBrands.findOne(
          {
            userId: req.query.userId.toString(),
          },
          { brandsList: 1 }
        );
        resolve(cursor.brandsList);
        await client.close();
      } finally {
      }
    }

    getBrands().catch(() => {
      console.dir;
      reject("Something Went Wrong");
    });
  });
  promise
    .then((brandsList) => {
      res.json({ message: true, brandsList: brandsList });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getBrandsController;
