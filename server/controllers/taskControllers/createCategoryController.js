const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const createCategoryController = (req, res) => {
  let promise = new Promise((resolve, reject) => {
    const client = new MongoClient(uri);

    async function createCategory() {
      try {
        let newCategory = {
          userId: req.query.userId,
          categoryName: req.query.categoryName,
          itemsList: [],
        };
        const database = client.db("MBAProjectDatabase");
        const retailerItems = database.collection("retailerItems");
        const cursor = await retailerItems.find(
          {
            userId: { $regex: `${req.query.userId}` },
          },
          { categoryName: 1, userId: 1 }
        );
        let signal = true;
        await cursor.forEach((doc) => {
          if (doc.userId === req.query.userId)
            if (doc.categoryName === req.query.categoryName) signal = false;
        });
        if (signal) {
          await retailerItems.insertOne(newCategory);
          resolve();
          await client.close();
        } else {
          reject("Category is already available");
        }
        // else
      } finally {
      }
    }

    createCategory().catch((err) => {
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

module.exports = createCategoryController;
