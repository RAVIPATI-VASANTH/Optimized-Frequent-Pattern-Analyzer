const FPGrowth = require("./algorithm/FPA/fpGrowth");
// const CPB = require("./algorithm/FPA/cpbClasses/cpb");
const Enhance = require("./algorithm/FPA/enhacedClasses/enhance");
const gettransactionsFromBluePrint = require("./gettransactionsFromBluePrint");
const FPS = require("./algorithm/FPA/fpClasses/fps");

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

  gettransactionsFromBluePrint(itemsBluePrint, userId).then(
    async (transactionsList) => {
      console.log("trabsactions are processed");
      //processing the transactions with only the itemNames only
      var transactions = [];
      transactionsList.forEach((transaction) => {
        let t = [];
        transaction.forEach((item) => {
          t.push(item.itemName);
        });
        transactions.push(t);
      });
      transactionsList = null;

      let fpPromise = new Promise((resolve, reject) => {
        let fp = new FPGrowth(transactions, 50, 20);
        let cpb = fp.start();
        let enhance = new Enhance(cpb);
        enhance.start().then((fplist) => {
          resolve(fplist);
        });
      });
      let transactionPromise = new Promise((resolve, reject) => {
        let transactionMap = [];
        transactions.forEach((transaction) => {
          var obj = {};
          transaction.forEach((item) => {
            obj[item] = true;
          });
          transactionMap.push(obj);
        });
        resolve(transactionMap);
      });
      let [fplist, transactionMap] = await Promise.all([
        fpPromise,
        transactionPromise,
      ]);
      // console.log(fplist);
      console.log("before fps");
      let fps = new FPS(fplist, transactionMap);
      let associationRuleList = fps.start();
      // console.log("association rules length", associationRuleList.slice(1, 50));
      associationRuleList.forEach((rule) => {
        if (rule.confidence > 50) {
          console.log(rule);
        }
      });
      console.log(associationRuleList.length);
    }
  );
};

module.exports = startFPARequest;
