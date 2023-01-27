const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const removeUnListedAR = async (itemsBluePrint, associationRuleList) => {
  const client = new MongoClient(uri);
  const database = client.db("MBAProjectDatabase");
  const retailerItems = database.collection("retailerItems");
  const cursor = retailerItems.find({});
  let requestedItemNames = [];
  await cursor.forEach((doc) => {
    if (
      itemsBluePrint.selectedList.categories.indexOf(doc.categoryName) !== -1
    ) {
      doc.itemsList.forEach((item) => {
        requestedItemNames.push(item.itemName);
      });
    } else {
      doc.itemsList.forEach((item) => {
        if (
          itemsBluePrint.selectedList.brands.indexOf(item.itemBrand) !== -1 ||
          itemsBluePrint.selectedList.items.indexOf(item.itemName) !== -1
        ) {
          requestedItemNames.push(item.itemName);
        }
      });
    }
  });
  let result = [];
  let min = 100,
    max = 0;
  associationRuleList.forEach((rule) => {
    var l = [...rule.LHS, ...rule.RHS];
    for (var i = 0; i < l.length; i++) {
      if (requestedItemNames.indexOf(l[i]) !== -1) {
        if (min > rule.confidence) min = rule.confidence;
        if (max < rule.confidence) max = rule.confidence;
        result.push(rule);
        break;
      }
    }
  });
  return { min: min, max: max, list: result };
};

module.exports = removeUnListedAR;
