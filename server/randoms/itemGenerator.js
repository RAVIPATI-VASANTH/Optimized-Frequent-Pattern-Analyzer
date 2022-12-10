const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getData = () => {
  const userId = "supermarket@Guntur";

  let retailerItems = [];

  let brandsList = [];
  for (let i = 1; i <= 150; i++) {
    brandsList.push(`Brand ${i}`);
  }

  let itemSequenceNumber = 1;

  for (let i = 1; i <= 75; i++) {
    //Collection Creation

    //Items List Collection Creation
    let itemsList = [];
    let catogoryItemCount = randomInt(50, 75);
    for (let j = 1; j <= catogoryItemCount; j++) {
      let priceList = [];
      let basePrice = randomInt(5, 300);
      for (let k = 1; k <= randomInt(1, 4); k++) {
        let priceObj = {
          packType: `Pack Type ${k}`,
          price: basePrice * k,
          discount: 0,
        };
        priceList.push(priceObj);
      }

      let currentItem = {
        categoryName: `Category ${i}`,
        itemName: `Item ${itemSequenceNumber++}`,
        itemBrand: brandsList[randomInt(1, brandsList.length)],
        itemPrices: priceList,
      };
      itemsList.push(currentItem);
    }
    let currentCollection = {
      userId: userId,
      categoryName: `Category ${i}`,
      itemsList: itemsList,
    };
    retailerItems.push(currentCollection);
  }
  return retailerItems;
};

module.exports = getData;
