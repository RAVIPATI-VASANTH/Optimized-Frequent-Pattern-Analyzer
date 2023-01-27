const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const updateARList = async (userId, requestName, associationRuleList) => {
  const client = new MongoClient(uri);
  const database = client.db("MBAProjectDatabase");
  const retailerRequests = database.collection("retailerRequests");
  let obj = { status: "Completed", arList: associationRuleList };
  await retailerRequests.updateOne(
    { userId: userId, requestName: requestName },
    { $set: { "result.fpa": obj } }
  );
};

module.exports = updateARList;
