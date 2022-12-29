const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const searchBrandController = (req, res) => {
  console.log("searched");
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);

    async function searchBrand() {
      try {
        let q = req.query.searchBrand;
        if (q.length !== 0) {
          const database = client.db("MBAProjectDatabase");
          const retailerBrands = database.collection("retailerBrands");
          let brandObjects = [];
          const cursor = await retailerBrands.findOne(
            {
              userId: req.query.userId,
            },
            { brandsList: 1 }
          );
          cursor.brandsList.forEach((brand) => {
            if (brand.indexOf(q) != -1) {
              brandObjects.push(brand);
            }
          });

          resolve(brandObjects);
        } else {
          resolve([]);
        }
      } finally {
        client.close();
      }
    }
    searchBrand().catch(console.dir);
  });

  promise
    .then((brandObjects) => {
      res.json({ responseStatus: true, brandObjects: brandObjects });
    })
    .catch(() => {
      res.json({ responseStatus: false });
    });
};

module.exports = searchBrandController;
