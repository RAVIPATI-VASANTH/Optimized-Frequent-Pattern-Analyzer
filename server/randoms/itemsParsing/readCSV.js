const { MongoClient } = require("mongodb");
// const getData = require("./itemGenerator");

const uri = "mongodb://127.0.0.1:27017";
const nReadlines = require("n-readlines");
const broadbandLines = new nReadlines("./data/pavan items.txt");

let line;
let lineNumber = 1;
const listRows = [];
while ((line = broadbandLines.next())) {
  // console.log("h");
  let row = line.toString().split(",");
  if (row.length < 4) {
    console.log(`Invalid Entry format at line number${lineNumber}`);
    console.log(row);
  } else {
    let count = Number(row[4]);
    if (count === NaN) {
      console.log(`Invalid packtypes Count or not entered the packtypes count`);
      console.log(row);
    }
    if (count * 2 + 5 != row.length) {
      console.log(`Invalid pack types count at line number ${lineNumber}`);
      console.log(row);
    } else {
      listRows.push(row);
    }
  }
  lineNumber++;
}
console.log("end of file");

categories = {};
for (var i = 0; i < listRows.length; i++) {
  let row = listRows[i];
  let packtypelistRows = [];
  for (var j = 5; j < row.length; j += 2) {
    let pt = {
      packType: row[j].trim(),
      price: Number(row[j + 1].trim().replace("\r")),
      discount: 0,
    };
    packtypelistRows.push(pt);
  }
  let item = {
    categoryName: row[1].trim(),
    itemName: row[2].trim(),
    itemBrand: row[3].trim(),
    itemPrices: packtypelistRows,
  };
  let catList = Object.keys(categories);

  if (catList.indexOf(row[1].trim()) > 0) {
    let l = categories[row[1].trim()];
    l.push(item);
    categories[row[1].trim()] = l;
  } else {
    let l = [];
    if (categories[row[1].trim()]) {
      l = categories[row[1].trim()];
    }
    l.push(item);
    categories[row[1].trim().replace("\r")] = l;
  }
}

console.log(Object.keys(categories));

let documents = [];
Object.entries(categories).forEach(([key, value]) => {
  // console.log("key: ", key, "value: ", value);
  let doc = {
    userId: "supermarket@Guntur",
    categoryName: key,
    itemsList: value,
  };
  documents.push(doc);
});
console.log(documents.length);

let promise = new Promise((resolve, reject) => {
  try {
    //initializing DB
    const client = new MongoClient(uri);
    const database = client.db("MBAProjectDatabase");
    const credentials = database.collection("retailerItems");
    //arranging required data for db write
    let data = documents;
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
