function solve(array) {
 let guestList = new Set();


  array.forEach(element => {
    let name = element.split(' is ')[0];
    let action = element.split(' is ')[1];

    if(action === 'going!'){
      if(guestList.has(name)){
        console.log(`${name} is already in the list!`);
      } else{
        guestList.add(name);
      }
    } else if(action === 'not going!'){
      if(guestList.has(name)){
        guestList.delete(name);
      } else{
        console.log(`${name} is not in the list!`);
      }
    }
  });

  guestList.forEach(guest => {
    console.log(guest);
  })
}

solve(['Tom is going!',
  'Annie is going!',
  'Tom is going!',
  'Garry is going!',
  'Jerry is going!']
  )