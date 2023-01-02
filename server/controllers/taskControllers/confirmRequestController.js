const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const confirmRequestController=(req,res)=>{
    let promise = new Promise(function (resolve, reject) {
        const client = new MongoClient(uri);
        async function confirmRequest() {
          try {
            let request={...JSON.parse(req.query.request),userId:req.query.userId};
            const database = client.db("MBAProjectDatabase");
            const retailerRequests = database.collection("retailerRequests");
            await retailerRequests.insertOne(request);
            await client.close();
            resolve();
          } finally {
          }
        }
        confirmRequest().catch(() => {
          reject();
          console.dir;
        });
      });
      promise
        .then(() => {
          res.json({ message: true });
        })
        .catch((err) => {
          res.json({ message: false ,text:err});
        });  
};

module.exports=confirmRequestController;