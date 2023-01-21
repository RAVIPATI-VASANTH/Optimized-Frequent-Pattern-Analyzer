const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getCategoryItemsController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getBrandItems() {
      try {
        let categoryItemsList = [];
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
        const cursor = await retailerItems.findOne({
          userId: req.query.userId,
          categoryName: req.query.categoryName,
        });
        console.log(req.query.categoryName);
        categoryItemsList = cursor.itemsList;
        resolve(categoryItemsList);
        await client.close();
      } finally {
      }
    }

    getBrandItems().catch((err) => {
      console.log(err);
      console.dir;
      reject("Something Went Wrong");
    });
  });
  promise
    .then((categoryItemsList) => {
      res.json({ message: true, categoryItemsList: categoryItemsList });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getCategoryItemsController;
