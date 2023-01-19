const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const searchItemController = (req, res) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);

    async function searchItem() {
      try {
        let q = req.query.searchItem;
        if (q.length !== 0) {
          console.log("hello");
          const database = client.db("MBAProjectDatabase");
          const retailerItems = database.collection("retailerItems");
          let listObjects = [];
          const cursor = await retailerItems.find(
            {
              "itemsList.itemName": { $regex: `${q}` },
            },
            { itemsList: 1, userId: 1 }
          );

          await cursor.forEach((doc) => {
            if (doc.userId === req.query.userId)
              doc.itemsList.forEach((obj) => {
                if (obj.itemName.indexOf(q) !== -1) {
                  listObjects.push(obj);
                }
              });
          });
          console.log(listObjects);
          resolve(listObjects);
        } else {
          resolve([]);
        }
      } finally {
        client.close();
      }
    }
    searchItem().catch(() => {
      console.dir;
      reject();
    });
  });

  promise
    .then((listObjects) => {
      console.log(listObjects);
      res.json({ responseStatus: true, listObjects: listObjects });
    })
    .catch(() => {
      res.json({ responseStatus: false });
    });
};

module.exports = searchItemController;
