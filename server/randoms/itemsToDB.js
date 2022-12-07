const { MongoClient } = require("mongodb");
const getData = require("./itemGenerator");

const uri = "mongodb://127.0.0.1:27017";

let promise = new Promise((resolve, reject) => {
  try {
    //initializing DB
    const client = new MongoClient(uri);
    const database = client.db("MBAProjectDatabase");
    const credentials = database.collection("retailerItems");
    //arranging required data for db write
    let data = getData();
    //perfoming write operation
    data.forEach((element) => {
      credentials.insertOne(element);
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
