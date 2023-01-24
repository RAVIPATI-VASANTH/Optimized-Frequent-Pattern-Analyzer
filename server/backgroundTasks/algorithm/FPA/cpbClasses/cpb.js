const CPBContainer = require("./conditionalpatternbasecontainer");

class CPB {
  constructor(fpTree, itemscount, support) {
    this.minimumSupport = support;
    this.fpTree = fpTree;
    this.conditionPatternBase = {};
    this.itemscount = itemscount;
  }

  traversefpTree(node, currentSequence, branchNumber) {
    let cPBObject = new CPBContainer(node.value);
    cPBObject.branchNumber = branchNumber;
    cPBObject.count = node.count;
    cPBObject.path = [].concat(currentSequence);
    this.conditionPatternBase[node.value].push(cPBObject);
    Object.values(node.childMap).forEach((element) => {
      this.traversefpTree(
        element,
        currentSequence.concat(new Array(node.value)),
        branchNumber
      );
    });
  }

  combineCPB() {
    this.combinedCPB = {};
    //Combining the CPB
    for (const [key, values] of Object.entries(this.conditionPatternBase)) {
      this.combinedCPB[key] = {};
      values.forEach((element) => {
        if (this.combinedCPB[key].hasOwnProperty(element.branchNumber)) {
          element.path.forEach((item) => {
            if (
              this.combinedCPB[key][element.branchNumber].hasOwnProperty(item)
            ) {
              this.combinedCPB[key][element.branchNumber][item] +=
                element.count;
            } else {
              this.combinedCPB[key][element.branchNumber][item] = element.count;
            }
          });
        } else {
          let dummy = {};
          element.path.forEach((item) => {
            dummy[item] = element.count;
          });
          if (Object.keys(dummy).length !== 0)
            this.combinedCPB[key][element.branchNumber] = dummy;
        }
      });
    }

    //Removing the CPM lessthan the Minimum Support
    for (const [key, values] of Object.entries(this.combinedCPB)) {
      for (const [key1, value1] of Object.entries(values)) {
        // this.combinedCPB[key][key1] = {};
        let obj = {};
        Object.keys(value1).forEach((key2) => {
          if (value1[key2] >= this.minimumSupport) {
            obj[key2] = value1[key2];
          }
        });
        this.combinedCPB[key][key1] = obj;
      }
    }
  }

  start() {
    //Generating Condition Pattern Base
    //--initializing
    Object.keys(this.itemscount).forEach((element) => {
      this.conditionPatternBase[element] = [];
    });
    //--actual Process
    let index = 0;
    Object.values(this.fpTree.root.childMap).forEach((element) => {
      let currentSequence = [];
      this.traversefpTree(element, currentSequence, index);
      index += 1;
    });

    // console.log(this.conditionPatternBase);
    // this.combineCPB();

    // console.log(Object.keys(this.conditionPatternBase).length);
    // console.log("combinedCPB completed");
    // console.log(Object.keys(this.combinedCPB).length);
  }
}

module.exports = CPB;
