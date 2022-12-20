const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const updateItemController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function updateItem() {
      let prevItem = JSON.parse(req.query.prevItem);
      let updatedItem = JSON.parse(req.query.updatedItem);
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
        if (prevItem.categoryName === updatedItem.categoryName) {
          if (prevItem.itemName === updatedItem.itemName) {
            await retailerItems.updateOne(
              { userId: req.query.userId, categoryName: prevItem.categoryName },
              { $pull: { itemsList: { itemName: prevItem.itemName } } }
            );
            await retailerItems.updateOne(
              {
                userId: req.query.userId,
                categoryName: prevItem.categoryName,
              },
              { $push: { itemsList: updatedItem } }
            );
          } else {
            await retailerItems.updateOne(
              { userId: req.query.userId, categoryName: prevItem.categoryName },
              { $pull: { itemsList: { itemName: prevItem.itemName } } }
            );
            await retailerItems.updateOne(
              {
                userId: req.query.userId,
                categoryName: prevItem.categoryName,
              },
              { $push: { itemsList: updatedItem } }
            );
          }
        } else {
          await retailerItems.updateOne(
            { userId: req.query.userId, categoryName: prevItem.categoryName },
            { $pull: { itemsList: { itemName: prevItem.itemName } } }
          );
          await retailerItems.updateOne(
            {
              userId: req.query.userId,
              categoryName: updatedItem.categoryName,
            },
            { $push: { itemsList: updatedItem } }
          );
        }
        resolve();
      } finally {
      }
    }

    updateItem().catch((err) => {
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

module.exports = updateItemController;
