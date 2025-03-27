function solve(array, arrayOfConditions) {
  let numElementsToGet = arrayOfConditions[0];
  let numElementsToDelete = arrayOfConditions[1];
  let numToLookFor = arrayOfConditions[2];
  let count = 0;

  let newArray = array.slice(0, numElementsToGet);

  newArray = newArray.slice(numElementsToDelete);

  console.log(newArray)

  newArray.forEach(element => {
    if (element === numToLookFor) {
      count++;
    }
  });

  console.log(`Number ${numToLookFor} occurs ${count} times.`);
}

solve([7, 1, 5, 8, 2, 7],
  [3, 1, 5]
  )