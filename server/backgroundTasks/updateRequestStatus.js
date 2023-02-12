const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const updateRequestStatus = async (userId, requestName, type, message) => {
  const client = new MongoClient(uri);
  const database = client.db("MBAProjectDatabase");
  const retailerRequests = database.collection("retailerRequests");
  if ((type = "FULL")) {
    await retailerRequests.updateOne(
      { userId: userId, requestName: requestName },
      { $set: { status: message } }
    );
  } else if (type === "FPA") {
    await retailerRequests.updateOne(
      { userId: userId, requestName: requestName },
      { $set: { "result.fpa.status": message } }
    );
  } else if (type === "BRAND") {
    await retailerRequests.updateOne(
      { userId: userId, requestName: requestName },
      { $set: { "result.brands.status": message } }
    );
  }
};

module.exports = updateRequestStatus;
