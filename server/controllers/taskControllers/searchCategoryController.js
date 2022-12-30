const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const searchCategoryController = (req, res) => {
  6;
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);

    async function searchBrand() {
      try {
        let q = req.query.searchCategory;
        if (q.length !== 0) {
          const database = client.db("MBAProjectDatabase");
          const retailerItems = database.collection("retailerItems");
          let categoryObjects = [];
          const cursor = await retailerItems.find(
            {
              userId: req.query.userId,
              categoryName: { $regex: `${req.query.searchCategory}` },
            },
            { categoryName: 1 }
          );
          await cursor.forEach((doc) => {
            categoryObjects.push(doc.categoryName);
          });

          resolve(categoryObjects);
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
    .then((categoryObjects) => {
      res.json({ responseStatus: true, categoryObjects: categoryObjects });
    })
    .catch(() => {
      res.json({ responseStatus: false });
    });
};

module.exports = searchCategoryController;
