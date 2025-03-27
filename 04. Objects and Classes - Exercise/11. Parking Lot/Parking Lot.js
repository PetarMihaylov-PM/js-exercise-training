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

  const sorted = [...set].sort();

  if(set.size === 0){
    console.log('Parking Lot is Empty');
  } else {
    sorted.forEach(car => {
      console.log(car);
    });
  }
}

solve(['IN, CA2844AA',
  'IN, CA1234TA',
  'OUT, CA2844AA',
  'IN, CA9999TT',
  'IN, CA2866HI',
  'OUT, CA1234TA',
  'IN, CA2844AA',
  'OUT, CA2866HI',
  'IN, CA9876HH',
  'IN, CA2822UU']  
  );