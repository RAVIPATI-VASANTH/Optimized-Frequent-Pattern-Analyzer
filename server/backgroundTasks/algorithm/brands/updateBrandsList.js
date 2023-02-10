const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const updateBrandsList = async (userId, requestName, brandsList) => {
  const client = new MongoClient(uri);
  const database = client.db("MBAProjectDatabase");
  const retailerRequests = database.collection("retailerRequests");
  let obj = { status: "Completed", brandsList: brandsList };
  await retailerRequests.updateOne(
    { userId: userId, requestName: requestName },
    { $set: { "result.brands": obj } }
  );
};

module.exports = updateBrandsList;
