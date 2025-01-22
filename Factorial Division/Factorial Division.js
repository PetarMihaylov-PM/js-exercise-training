function solve(num1, num2){
  let result1 = findResult1(num1);
  let result2 = findResult2(num2);
  let result = whatIsTheResult(result1, result2);

  console.log(result.toFixed(2));

  function findResult1(num1){
    num1 === 0 ? 1 : 1;
    let resulted = 1;
    for (let i = 1; i <= num1; i++){
      resulted *= i;
    }
    return resulted;
  }
  
  function findResult2(num2){
    num2 === 0 ? 1 : 1;
    let resulted = 1;
    for (let i = 1; i <= num2; i++){
      resulted *= i;
    }
    return resulted;
  }

  function whatIsTheResult(result1, result2){
    return result1 / result2;
  }
}

solve(6, 2);
