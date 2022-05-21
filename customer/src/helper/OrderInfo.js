export const addItem = (itemDetail) => {
  const exist = orderInfo.items.find((item) => item.id === itemDetail.id);
  if (exist) {
    exist.quantite = itemDetail.quantite;
  } else {
    orderInfo.items.push(itemDetail);
  }
};

// not tested yet
export const removeItem = (itemDetail) => {
  const exist = orderInfo.items.find((item) => item.id === itemDetail.items.id);
  if (exist) {
    let index = orderInfo.items.indexOf(exist);
    orderInfo.items.splice(index, 1);
  }
};

export let orderInfo = {
  businessID: "",
  orderType: "",
  customerNumber: "",
  subTotal: 0,
  items: [],
};
