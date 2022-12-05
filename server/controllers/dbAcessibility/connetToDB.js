// const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017";

// const client = new MongoClient(uri);

// async function registerToDB(req) {
//   let signal;
//   console.log(req.query);
//   try {
//     const database = client.db("MBAProjectDatabase");
//     const credentials = database.collection("credentials");
//     if (
//       (await credentials.countDocuments({
//         userId: req.query.userId.toString(),
//       })) === 0
//     ) {
//       await credentials.insertOne({
//         userId: req.query.userId.toString(),
//         password: req.query.password.toString(),
//       });
//       console.log("Inserted Successfully");
//       // await client.close();
//       signal = true;
//     } else {
//       console.log("Inserton Failed");
//       signal = false;
//     }
//   } finally {
//     await client.close();
//     return signal;
//   }
// }

// // registerToDB().catch(console.dir)

// module.exports = registerToDB;
