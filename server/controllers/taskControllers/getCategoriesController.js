const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getCategoriesController = (req, res) => {
  console.log("called");
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function getCategories() {
      try {
        let categoryList = [];
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
        const cursor = await retailerItems.find(
          {
            userId: req.query.userId.toString(),
          },
          { categoryName: 1 }
        );
        await cursor.forEach((doc) => {
          categoryList.push(doc.categoryName);
        });
        resolve(categoryList);
        await client.close();
      } finally {
      }
    }

    getCategories().catch(() => {
      console.dir;
      reject("Something Went Wrong");
    });
  });
  promise
    .then((categoryList) => {
      res.json({ message: true, categoryList: categoryList });
    })
    .catch((text) => {
      res.json({ message: false, text: text });
    });
};

module.exports = getCategoriesController;
