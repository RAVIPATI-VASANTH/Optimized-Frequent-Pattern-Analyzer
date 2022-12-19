const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const deleteItemController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function deleteItem() {
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
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
