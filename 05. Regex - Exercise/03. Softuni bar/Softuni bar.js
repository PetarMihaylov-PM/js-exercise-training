function solve(input) {
  let command = input.shift();

  let pattern =/%(?<name>[A-Z][a-z]+)%[^|$%.]*<(?<product>\w+)>[^|$%.]*\|(?<count>\d+)\|[^|$%.0-9]*(?<price>[0-9]+.?\d*)\$/;
  let totalIncome = 0;

  while (command !== "end of shift") {
    let match = pattern.exec(command);

    if (match) {
      let customerName = match.groups.name;
      let productName = match.groups.product;
      let countOfProduct = Number(match.groups.count);
      let priceOfProduct = Number(match.groups.price);
      let productIncome = countOfProduct * priceOfProduct;
      totalIncome += productIncome;

      console.log(`${customerName}: ${productName} - ${productIncome.toFixed(2)}`);
    }

    command = input.shift();
  }

  console.log(`Total income: ${totalIncome.toFixed(2)}`);
}
solve([
  "%George%<Croissant>|2|10.3$",
  "%Peter%<Gum>|1|1.3$",
  "%Maria%<Cola>|1|2.4$",
  "end of shift",
]);



function solve(data) {

  let pattern = /%(?<name>[A-Z][a-z]+)%[^|$%.]*<(?<product>\w+)>[^|$%.]*\|(?<count>\d+)\|[^|$%.0-9]*(?<price>[0-9]+.?\d*)\$/
  let total = 0;

  for (let line of data) {
    let match = [];
    if(line === "end of shift") {
      break;
    }

    if (pattern.test(line)) {
      match = line.match(pattern);
      let price = Number(match.groups.count) * Number(match.groups.price);
      total += price;
      console.log(`${match.groups.name}: ${match.groups.product} - ${price.toFixed(2)}`)

    }

  }
  console.log(`Total income: ${total.toFixed(2)}`)


}
solve(['%George%<Croissant>|2|10.3$',
'%Peter%<Gum>|1|1.3$',
'%Maria%<Cola>|1|2.4$',
'end of shift'])
console.log("=====")

solve(['%InvalidName%<Croissant>|2|10.3$',
'%Peter%<Gum>1.3$',
'%Maria%<Cola>|1|2.4',
'%Valid%<Valid>valid|10|valid20$',
'end of shift'])