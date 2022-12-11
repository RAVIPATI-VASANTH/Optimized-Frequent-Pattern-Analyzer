const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const registerController = (req, res) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);
    async function registerToDB(req) {
      try {
        const database = client.db("MBAProjectDatabase");
        const credentials = database.collection("credentials");
        if (
          (await credentials.countDocuments({
            userId: req.query.userId.toString(),
          })) === 0
        ) {
          await credentials.insertOne({
            userId: req.query.userId.toString(),
            password: req.query.password.toString(),
          });
          await client.close();
          resolve();
        } else {
          await client.close();
          reject();
        }
      } finally {
      }
    }
    registerToDB(req).catch(console.dir);
  });

  promise
    .then(() => {
      res.json({ loginStatus: false });
    })
    .catch(() => {
      res.json({ loginStatus: true });
    });
};

module.exports = registerController;
