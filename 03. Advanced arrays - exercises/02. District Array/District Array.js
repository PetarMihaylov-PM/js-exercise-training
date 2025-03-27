function solve(array){

  for (let i = 0; i < array.length; i++){
    let number1 = array[i];
    
    for (let j = i + 1; j < array.length; j++){
      let number2 = array[j]
      if (number1 === number2){
          array.splice(j, 1);
          j--;
      }
    }
  }
  console.log(array.join(' '));
}
solve([7, 8, 9, 7, 2, 3, 4, 1, 2]);


function solveWithSeen(array){

  let seen = new Set();
  let result = [];
  
  array.forEach(num => {
    if(!seen.has(num)){
      result.push(num);
      seen.add(num);
    }
  })
  console.log(result.join(' '));
}
solveWithSeen([7, 8, 9, 7, 2, 3, 4, 1, 2])