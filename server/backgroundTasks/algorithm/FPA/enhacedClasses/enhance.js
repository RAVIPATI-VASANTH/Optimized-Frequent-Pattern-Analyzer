const FrequentPattern = require("./../fpClasses/pattern");

class Enhance {
  constructor(cpb) {
    this.cpb = cpb;
    this.combinedCPB = {};
    this.fpList = [];
  }

  async start() {
    // console.log(Object.keys(this.cpb.conditionPatternBase).length);
    console.log(this.cpb.minimumSupport, "minimum support");
    let promisesList = [];
    console.log("started");
    // console.log(this.cpb.conditionPatternBase);
    for (const [key, values] of Object.entries(this.cpb.conditionPatternBase)) {
      var obj = {};
      obj[key] = {};
      var promise = new Promise((resolve, reject) => {
        // console.log("promise");
        values.forEach((element) => {
          if (obj[key].hasOwnProperty(element.branchNumber)) {
            element.path.forEach((item) => {
              if (obj[key][element.branchNumber].hasOwnProperty(item)) {
                obj[key][element.branchNumber][item] += element.count;
              } else {
                obj[key][element.branchNumber][item] = element.count;
              }
            });
          } else {
            let dummy = {};
            element.path.forEach((item) => {
              dummy[item] = element.count;
            });
            if (Object.keys(dummy).length !== 0)
              obj[key][element.branchNumber] = dummy;
          }
        });
        //Removing the CPB lessthan the Minimum Support
        for (const [key1, value1] of Object.entries(Object.values(obj[key]))) {
          let object = {};
          Object.keys(value1).forEach((key2) => {
            if (value1[key2] >= this.cpb.minimumSupport) {
              object[key2] = value1[key2];
            }
          });
          obj[key][key1] = object;
        }

        let objKey = Object.keys(obj)[0];
        let objValue = Object.values(obj)[0];
        //generating the pattern sets by cpb
        let patternList = [];
        for (const value1 of Object.values(objValue)) {
          let allItems = Object.keys(value1);
          for (let i = 0; i < allItems.length; i++) {
            for (let j = i + 1; j <= allItems.length; j++) {
              let temp = allItems.slice(i, j);
              let minimum = Number.MAX_SAFE_INTEGER;
              for (let k = 0; k < temp.length; k++)
                if (minimum > value1[temp[k]]) minimum = value1[temp[k]];
              temp.push(objKey);
              patternList.push(new FrequentPattern(temp, minimum));
            }
          }
        }

        //merging the equal pattern sets
        var dummy = {};
        for (let i = 0; i < patternList.length; i++) {
          let temp = patternList[i].patternSet;
          temp.sort();
          if (dummy.hasOwnProperty(temp.toString())) {
            dummy[temp.toString()] += patternList[i].count;
          } else {
            dummy[temp.toString()] = patternList[i].count;
          }
        }

        patternList = [];
        Object.keys(dummy).forEach((key) => {
          let d = new FrequentPattern(key.split(","), dummy[key]);
          if (d.count >= this.cpb.minimumSupport) patternList.push(d);
        });
        resolve(patternList);
      });
      promisesList.push(promise);
    }
    // console.log("promise started");
    const result = await Promise.all(promisesList);
    // console.log(result);
    result.forEach((obj) => {
      // console.log(obj);
      this.fpList = [...this.fpList, ...obj];
    });
    // console.log(this.combinedCPB);
    console.log("fplist returned");
    return this.fpList;
  }
}

module.exports = Enhance;
