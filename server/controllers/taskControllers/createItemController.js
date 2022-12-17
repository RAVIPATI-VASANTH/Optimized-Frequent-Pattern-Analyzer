const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const createItemController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);
    async function createItem() {
      try {
        let item = JSON.parse(req.query.item);
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
        const cursor = await retailerItems.findOne(
          {
            userId: req.query.userId,
            categoryName: item.categoryName,
          },
          { itemsList: 1 }
        );
        let signal = false;
        await cursor.itemsList.forEach((dbItem) => {
          if (dbItem.itemName === item.itemName) {
            signal = true;
          }
        });
        if (signal) {
          reject("Item already exists in the category");
        } else {
          await retailerItems.updateOne(
            { userId: req.query.userId, categoryName: item.categoryName },
            { $push: { itemsList: item } }
          );
          resolve();
        }
      } finally {
      }
    }

    createItem().catch((err) => {
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

module.exports = createItemController;
