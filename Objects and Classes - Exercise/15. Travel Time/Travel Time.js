function solve(arr) {
  let list = {};
  for (let line of arr) {
    let [country, town, cost] = line.split(" > ");
    cost = Number(cost);

    if (!list.hasOwnProperty(country)) {
      list[country] = {};
    }
    if (!list[country].hasOwnProperty(town)) {
      list[country][town] = cost;
    } else if (list[country][town] > cost) {
      list[country][town] = cost;
    }
  }

  let sorted = Object.entries(list).sort((a, b) => a[0].localeCompare(b[0]));

  for (let [country, towns] of sorted) {
    let result = `${country} -> `;
    let sortedTowns = Object.entries(towns).sort((a, b) => a[1] - b[1]);
    sortedTowns.forEach(([town, price]) => {
      result += `${town} -> ${price} `;
    });

    console.log(result.trim());
  }
}
solve([
  "Bulgaria > Sofia > 500",
  "Bulgaria > Sopot > 800",
  "France > Paris > 2000",
  "Albania > Tirana > 1000",
  "Bulgaria > Sofia > 200",
]);
console.log("------");
solve([
  "Bulgaria > Sofia > 25000",
  "Bulgaria > Sofia > 25000",
  "Kalimdor > Orgrimar > 25000",
  "Albania > Tirana > 25000",
  "Bulgaria > Varna > 25010",
  "Bulgaria > Lukovit > 10",
]);
