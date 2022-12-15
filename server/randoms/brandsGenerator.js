const { MongoClient } = require("mongodb");
// const getData = require("./itemGenerator");

const uri = "mongodb://127.0.0.1:27017";

let promise = new Promise((resolve, reject) => {
  try {
    //initializing DB
    const client = new MongoClient(uri);
    const database = client.db("MBAProjectDatabase");
    const retailerBrands = database.collection("retailerBrands");
    //arranging required data for db write
    let brandsList = [];
    for (let i = 1; i <= 150; i++) {
      brandsList.push(`Brand ${i}`);
    }

    //perfoming write operation
    retailerBrands.insertOne({
      userId: "supermarket@Guntur",
      brandsList: brandsList,
    });
    resolve();
    console.log("after resolve");
  } catch (err) {
    console.log(err);
    reject();
  } finally {
    console.log("after reject");
    client.close();
  }
});

promise
  .then(() => {
    console.log("renamed Succesfully");
  })
  .catch();
