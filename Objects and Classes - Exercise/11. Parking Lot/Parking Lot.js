function solve(array) {
  let set = new Set();

  array.forEach(element => {
    let [direction, carNumber] = element.split(', ');

    if(direction === 'IN'){
      set.add(carNumber);
    }
    if(direction === 'OUT'){
      set.delete(carNumber);
    }
  });

  let sorted = Array.from(set);
  sorted.sort((a, b) => {
    let number1 = Number(a.split('').splice(2, 4).join(''));
    let number2 = Number(b.split('').splice(2, 4).join(''));
    return number1 - number2;
  });

  if(set.size > 0){
    sorted.forEach(car => {
      console.log(car)
    });
  } else {
    console.log('Parking Lot is Empty');
  }
}

solve(['IN, CA2844AA',
  'IN, CA1234TA',
  'OUT, CA2844AA',
  'OUT, CA1234TA']
  )