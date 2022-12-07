const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const searchItemController = (req, res) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);

    async function searchItem() {
      try {
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
      } finally {
      }
    }

    searchItem().catch(console.dir);
  });

  promise.then(() => {}).catch(() => {});
  res.json({ message: "request reached" });
};

module.exports = searchItemController;
