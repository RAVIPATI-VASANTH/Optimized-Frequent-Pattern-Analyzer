const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getBrandItemsController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getBrandItems() {
      try {
        let brandItemsList = [];
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
        const cursor = await retailerItems.find({
          userId: req.query.userId,
          "itemsList.itemBrand": req.query.brandName,
        });

        await cursor.forEach((collection) => {
          collection.itemsList.forEach((item) => {
            if (item.itemBrand === req.query.brandName)
              brandItemsList.push(item);
          });
        });
        resolve(brandItemsList);
        await client.close();
      } finally {
      }
    }

    getBrandItems().catch(() => {
      console.dir;
      reject("Something Went Wrong");
    });
  });
  promise
    .then((brandItemsList) => {
      res.json({ message: true, brandItemsList: brandItemsList });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getBrandItemsController;
