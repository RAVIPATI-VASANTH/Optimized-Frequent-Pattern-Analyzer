const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const deleteItemController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);
    let item = JSON.parse(req.query.item);
    async function deleteItem() {
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
        await retailerItems.updateOne(
          { userId: req.query.userId, categoryName: item.categoryName },
          { $pull: { itemsList: { itemName: item.itemName } } }
        );
        resolve();
      } finally {
      }
    }

    deleteItem().catch((err) => {
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

module.exports = deleteItemController;
