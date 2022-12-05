const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const loginController = (req, res) => {
  console.log("requested login");
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);
    async function loginToDB(req) {
      try {
        const database = client.db("MBAProjectDatabase");
        const credentials = database.collection("credentials");
        if (
          (await credentials.countDocuments({
            userId: req.query.userId.toString(),
          })) === 0
        ) {
          await client.close();
          reject("User NOT Found");
        } else {
          const result = await credentials.findOne({
            userId: req.query.userId.toString(),
          });

          await client.close();

          if (result.password === req.query.password.toString()) {
            resolve("Login Successfull");
          } else {
            reject("Password Incorrect");
          }

          // result.toArray(function (err, element) {
          //   if (err) throw err;
          //   if (element.password === req.query.password.toString()) {
          //     resolve("Login Successfull");
          //   } else {
          //     reject("Password Incorrect");
          //   }
          // });

          // result.toArray.forEach((err, element) => {
          //   if (err) throw err;
          //   if (element.password === req.query.password.toString()) {
          //     resolve("Login Successfull");
          //   } else {
          //     reject("Password Incorrect");
          //   }
          // });
        }
      } finally {
      }
    }
    loginToDB(req).catch(console.dir);
  });

  promise
    .then((message) => {
      res.json({ loginStatus: true, message: message });
    })
    .catch((message) => {
      res.json({ loginStatus: false, message: message });
    });
};

module.exports = loginController;
