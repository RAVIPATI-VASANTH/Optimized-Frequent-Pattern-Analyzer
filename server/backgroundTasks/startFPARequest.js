const FPGrowth = require("./algorithm/FPA/fpGrowth");
const updateARList = require("./updateARList");
const updateRequestStatus = require("./updateRequestStatus");
const Enhance = require("./algorithm/FPA/enhacedClasses/enhance");
const gettransactionsFromBluePrint = require("./gettransactionsFromBluePrint");
const FPS = require("./algorithm/FPA/fpClasses/fps");
const removeUnListedAR = require("./removeUnListedAR");
const getBrandStatesFromBluePrint = require("./algorithm/brands/getBrandStatesFromBluePrint");
const updateBrandsList = require("./algorithm/brands/updateBrandsList");

const startFPARequest = async function (itemsBluePrint, userId) {
  // let transactions = [];
  // transactions = [
  //   ["I1", "I2", "I5"],
  //   ["I2", "I4"],
  //   ["I2", "I3"],
  //   ["I1", "I2", "I4"],
  //   ["I1", "I3"],
  //   ["I2", "I3"],
  //   ["I1", "I3"],
  //   ["I1", "I2", "I3", "I5"],
  //   ["I1", "I2", "I3"],
  // ];
  // let fpPromise = new Promise((resolve, reject) => {
  //   let fp = new FPGrowth(transactions, 2, 2);
  //   let cpb = fp.start();
  //   let enhance = new Enhance(cpb);
  //   enhance.start().then((fplist) => {
  //     resolve(fplist);
  //   });
  // });
  // let transactionPromise = new Promise((resolve, reject) => {
  //   let transactionMap = [];
  //   transactions.forEach((transaction) => {
  //     var obj = {};
  //     transaction.forEach((item) => {
  //       obj[item] = true;
  //     });
  //     transactionMap.push(obj);
  //   });
  //   resolve(transactionMap);
  // });
  // let [fplist, transactionMap] = await Promise.all([
  //   fpPromise,
  //   transactionPromise,
  // ]);
  // console.log(fplist, transactionMap);
  // let fps = new FPS(fplist, transactionMap);
  // let associationRuleList = fps.start();
  // console.log(associationRuleList);
  try {
    gettransactionsFromBluePrint(itemsBluePrint, userId).then(
      async (transactionsList) => {
        //processing the transactions with only the itemNames only
        // var transactions = [];
        // transactionsList.forEach((transaction) => {
        //   let t = [];
        //   transaction.forEach((item) => {
        //     t.push(item.itemName);
        //   });
        //   transactions.push(t);
        // });
        // // transactionsList = null;
        // let fpPromise = new Promise((resolve, reject) => {
        //   let fp = new FPGrowth(
        //     transactions,
        //     itemsBluePrint.minSupport,
        //     itemsBluePrint.minConfidence
        //   );
        //   let cpb = fp.start();
        //   let enhance = new Enhance(cpb);
        //   enhance.start().then((fplist) => {
        //     resolve(fplist);
        //   });
        // });
        // let transactionPromise = new Promise((resolve, reject) => {
        //   let transactionMap = [];
        //   transactions.forEach((transaction) => {
        //     var obj = {};
        //     transaction.forEach((item) => {
        //       obj[item] = true;
        //     });
        //     transactionMap.push(obj);
        //   });
        //   resolve(transactionMap);
        // });
        // let [fplist, transactionMap] = await Promise.all([
        //   fpPromise,
        //   transactionPromise,
        // ]);
        // let fps = new FPS(fplist, transactionMap);
        // let associationRuleList = fps.start();
        // associationRuleList = await removeUnListedAR(
        //   itemsBluePrint,
        //   associationRuleList
        // );
        // let arList = [];
        // associationRuleList.list.forEach((rule) => {
        //   arList.push({
        //     lhs: rule.LHS,
        //     rhs: rule.RHS,
        //     confidence: rule.confidence,
        //   });
        // });
        // associationRuleList.list = arList;
        // updateARList(userId, itemsBluePrint.requestName, associationRuleList);
        // updateRequestStatus(
        //   userId,
        //   itemsBluePrint.requestName,
        //   "FULL",
        //   "Completed"
        // );
        // //Brands Operation
        // let resultmap = await getBrandStatesFromBluePrint(
        //   itemsBluePrint,
        //   userId
        // );
        // let brandsList = [];
        // // console.log(Object.entries(resultmap));
        // for (const [key, value] of Object.entries(resultmap)) {
        //   let total = 0;
        //   console.log(value);
        //   for (const [key2, value2] of Object.entries(value)) {
        //     total += value2;
        //   }
        //   let obj = { categoryName: key, total: total, list: value };
        //   brandsList.push(obj);
        // }
        // // console.log(brandsList);
        // updateBrandsList(userId, itemsBluePrint.requestName, brandsList);
        //Time Line Operation
      }
    );
  } catch (err) {
    console.log(err, "heap error");
    updateRequestStatus(
      userId,
      itemsBluePrint.requestName,
      "FPA",
      "Some thing went Wrong"
    );
  }
};

module.exports = startFPARequest;
