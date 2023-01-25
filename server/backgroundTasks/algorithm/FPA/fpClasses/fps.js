const AssociationRule = require("./associationrule");

class FPS {
  constructor(fplist, transactionMap) {
    this.fplist = fplist;
    this.transactionMap = transactionMap;
  }

  getAllSubsets(theArray) {
    return theArray.reduce(
      (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
      [[]]
    );
  }

  difference(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }

  countInstance(arr) {
    var count = 0;
    this.transactionMap.forEach((obj) => {
      var signal = 0;
      for (var i = 0; i < arr.length; i++) {
        if (obj[arr[i]]) {
          signal++;
        }
      }
      if (signal === arr.length) count += 1;
    });
    return count;
  }

  start() {
    console.log("fps started");
    let associationRuleList = [];
    console.log(this.fplist.length);
    this.fplist.forEach((fp) => {
      // console.log("fp");
      let allSubsets = this.getAllSubsets(fp.patternSet);
      allSubsets.forEach((subset) => {
        if (subset.length !== 0) {
          var A = new Set(subset);
          var fullSet = new Set(fp.patternSet);
          var B = [...this.difference(fullSet, A)];
          A = [...A];
          if (B.length) {
            associationRuleList.push(
              new AssociationRule(
                A,
                B,
                (this.countInstance([...fullSet]) / this.countInstance(A)) * 100
              )
            );
          }
        }
      });
    });
    console.log("AR returned");
    return associationRuleList;
  }
}
module.exports = FPS;
