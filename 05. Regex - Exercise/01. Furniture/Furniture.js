function solve(data) {
  
  let pattern = />>(?<name>[A-Z][A-Za-z]+)<<(?<price>[0-9.]+)!(?<quantity>\d+)/;

  let totalMoney = 0;
  console.log("Bought furniture:");

  for (let line of data) {
    if (line === "Purchase") {
      break;
    }

    if (pattern.test(line)) {
      let product = pattern.exec(line);
      let price = Number(product.groups.price) * Number(product.groups.quantity);
      console.log(product.groups.name);
      totalMoney += price;
    }
  }
  console.log(`Total money spend: ${totalMoney.toFixed(2)}`)


}
solve([">>Sofa<<312.23!3", ">>TV<<300!5", ">Invalid<<!5", "Purchase"]);




//version 2
function solve(input) {
  
  let pattern = /[>]{2}(?<name>[A-Za-z]+)[<]{2}(?<price>[\d]+[\.]*[\d]+)!(?<quantity>[\d]+)/gm;

  let index = 0;
  //let currentRow = input[index];

  let totalMoney = 0;

  console.log("Bought furniture:");

  while (input[index] !== "Purchase") {
    let productRow = input[index];
    let validProducts = pattern.exec(productRow);

    while (validProducts !== null) {
      let productName = validProducts.groups['name'];
      console.log(productName);
      let productPrice = validProducts.groups['price'];
      let productQuantity = validProducts.groups['quantity'];

      totalMoney += productPrice * productQuantity;

      validProducts = pattern.exec(productRow);
    }
   

    index++;
  }

  console.log(`Total money spend: ${totalMoney.toFixed(2)}`);
}
solve([">>Sofa<<312.23!3", ">>TV<<300!5", ">Invalid<<!5", "Purchase"]);
