const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const createCollectionController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    let createCollection = async function () {
      try {
        let newCollection = {};
        const database = client.db("MBAProjectDatabase");
        const collections = database.collection("collection");
        await collections.insertOne();
        await client.close();
        resolve();
      } finally {
      }
    };

    createCollection.catch(() => {
      reject();
      console.dir;
    });
  });

  promise
    .then(() => {
      res.json({ message: true });
    })
    .catch(() => {
      res.json({ message: false });
    });
};

module.exports = createCollectionController;
