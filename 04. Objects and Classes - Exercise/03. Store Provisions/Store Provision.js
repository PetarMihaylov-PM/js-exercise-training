function solve (currentProvision, orderedProvisions) {

  const stock = {};

  for (let i = 0; i < currentProvision.length; i+=2) {
    let currentAmount = 0;
    let product = currentProvision[i];
    currentAmount += Number(currentProvision[i+1]);
    if(orderedProvisions.includes(product)) {
      let orderedAmountIndex = orderedProvisions.indexOf(product) + 1;
      let orderedAmount = orderedProvisions[orderedAmountIndex];
      orderedProvisions.splice(orderedProvisions.indexOf(product), 2);
      currentAmount += Number(orderedAmount);
    }
    stock[product] = currentAmount;
  }

  for (let i = 0; i < orderedProvisions.length; i += 2) {
    let product = orderedProvisions[i];
    let quantity = Number(orderedProvisions[i + 1]);
    
    if(stock[product]){
      stock[product] += quantity;
    } else {
      stock[product] = quantity;
    }
  }
  for (let product in stock){
    console.log(`${product} -> ${stock[product]}`);
  }
}

solve([
  'Salt', '2', 'Fanta', '4', 'Apple', '14', 'Water', '4', 'Juice', '5'
  ],
  [
  'Sugar', '44', 'Oil', '12', 'Apple', '7', 'Tomatoes', '7', 'Bananas', '30'
  ]  
  );