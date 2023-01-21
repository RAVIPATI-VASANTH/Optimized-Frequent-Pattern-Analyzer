const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let promise = new Promise((resolve, reject) => {
  async function getBrands() {
    try {
      let brandsList = [];
      const database = client.db("MBAProjectDatabase");
      const retailerItems = database.collection("retailerItems");
      const cursor = await retailerItems.find({
        userId: "supermarket@Guntur",
      });
      await cursor.forEach((doc) => {
        doc.itemsList.forEach((item) => {
          if (brandsList.indexOf(item.itemBrand) === -1) {
            brandsList.push(item.itemBrand);
          }
        });
      });
      resolve(brandsList);
      await client.close();
    } finally {
    }
  }

  getBrands().catch(() => {
    console.dir;
    reject("Something Went Wrong");
  });
});

promise
  .then((brandsList) => {
    // brandsList.sort();
    // console.log(brandsList);
    const database = client.db("MBAProjectDatabase");
    const retailerBrands = database.collection("retailerBrands");
    retailerBrands.insertOne({
      userId: "supermarket@Guntur",
      brandsList: brandsList,
    });
  })
  .catch();
