function solve (array) {
  let numberOfCities = Number(array.shift());
  let totalProfit = 0;
  let countDays = 0;

  for (let i = 0; i < numberOfCities; i++) {
    countDays++;
    let city = array.shift();
    let incomeInStotinki = Number(array.shift()) * 100;
    let expensesInStotinki = Number(array.shift()) * 100;
  
    
    if(countDays % 3 === 0 && countDays % 5 !== 0){
      expensesInStotinki += expensesInStotinki * 0.5;
    } 
    
    if(countDays % 5 === 0) {
      incomeInStotinki -= incomeInStotinki * 0.1;
    }

    let profit = incomeInStotinki - expensesInStotinki;

    totalProfit += profit;

    console.log(`In ${city} Burger Bus earned ${(profit / 100).toFixed(2)} leva.`);
  }
  console.log(`Burger Bus total profit: ${(totalProfit / 100).toFixed(2)} leva.`);
}

solve(["3",
  "Sofia",
  "895.67",
  "213.50",
  "Plovdiv",
  "2563.20",
  "890.26",
  "Burgas",
  "2360.55",
  "600.00"])
  ;
  