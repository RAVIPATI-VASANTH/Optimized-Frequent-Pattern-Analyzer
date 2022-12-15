const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const createBrandController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);
    async function createBrand() {
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerBrands = database.collection("retailerBrands");
        const cursor = await retailerBrands.findOne(
          {
            userId: req.query.userId,
          },
          { brandsList: 1 }
        );
        let signal = true;
        await cursor.brandsList.forEach((brand) => {
          if (brand === req.query.brandName.toString()) signal = false;
        });
        if (signal) {
          await retailerBrands.updateOne(
            { userId: req.query.userId },
            { $push: { brandsList: req.query.brandName.toString() } }
          );
          resolve();
          await client.close();
        } else {
          reject("Brand is already available");
        }
      } finally {
      }
    }

    createBrand().catch((err) => {
      console.log(err);
      reject("Something Went Wrong");
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

module.exports = createBrandController;
