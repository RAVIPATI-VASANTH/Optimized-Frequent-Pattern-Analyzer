const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let promise = new Promise((resolve, reject) => {
  async function getCategories() {
    try {
      let categories = [];
      const database = client.db("MBAProjectDatabase");
      const retailerItems = database.collection("retailerItems");
      const cursor = await retailerItems.find({
        userId: "supermarket@Guntur",
      });
      await cursor.forEach((doc) => {
        categories.push(doc);
      });
      resolve(categories);
      await client.close();
    } finally {
    }
  }

  getCategories().catch(() => {
    console.dir;
    reject("Something Went Wrong");
  });
});
promise
  .then((categories) => {
    let allTransactions = [];
    let today = new Date("2022-01-01");
    for (var i = 1; i <= 365; i++) {
      // console.log(`Day ${i}`);
      var noofCustomersInADay = randomInt(100, 125);
      for (var j = 1; j < noofCustomersInADay; j++) {
        // console.log(`Day ${i} customer${j} ${today.toString()}`);
        // console.log(allTransactions.length);
        var finalItems = [];
        var randomCategories = [];
        var dummycategories = [...categories];
        var randomCategoriesCount = randomInt(1, categories.length);
        while (randomCategories.length != randomCategoriesCount) {
          var index = randomInt(0, dummycategories.length - 1);
          randomCategories.push(dummycategories[index]);
          dummycategories.splice(index, 1);
        }
        //going to each category randomly selected
        for (var k = 0; k < randomCategories.length; k++) {
          var category = randomCategories[k];
          var randomItems = [];
          var dummyItems = [...category.itemsList];
          var randomItemsCount = randomInt(1, 3);
          while (randomItems.length != randomItemsCount) {
            var index = randomInt(0, dummyItems.length - 1);
            randomItems.push(dummyItems[index]);
            dummyItems.splice(index, 1);
          }
          let randomItemsIndex = [];
          while (randomItemsIndex.length <= randomItemsCount) {
            var index = randomInt(0, category.itemsList.length - 1);
            if (randomItemsIndex.indexOf(index) >= 0) {
              continue;
            } else {
              randomItemsIndex.push(index);
              randomItems.push(category.itemsList[index]);
            }
          }
          // going to each item to select its packtype and quantity as random
          for (var m = 0; m < randomItems.length; m++) {
            var item = randomItems[m];
            var packTypeindex = randomInt(0, item.itemPrices.length - 1);
            var quantity = randomInt(1, 3);
            var obj = {
              categoryName: item.categoryName,
              itemName: item.itemName,
              itemBrand: item.itemBrand,
              itemPrice: {
                packType: item.itemPrices[packTypeindex].packType,
                price: item.itemPrices[packTypeindex].price,
                discount: item.itemPrices[packTypeindex].discount,
              },
              quantity: quantity,
            };
            finalItems.push(obj);
          }
        }
        allTransactions.push({
          userId: "supermarket@Guntur",
          itemsList: finalItems,
          timeStamp: new Date(today),
        });
      }
      today.setDate(today.getDate() + 1);
    }

    console.log(allTransactions.length);

    const database = client.db("MBAProjectDatabase");
    const transactions = database.collection("transactions");
    allTransactions.forEach((transacion) => {
      transactions.insertOne(transacion);
    });
  })
  .catch((text) => {
    console.log(text);
  });
