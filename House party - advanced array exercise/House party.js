function solve(array){
  

  for(let i = 0; i < array.length; i++){
    let isGoing = array[i].includes('is going!') ? true : false;
    let name = array[i].split(' ')[0];
    let isInTheList = false;

    for(let y = i + 1; y < array.length; y++){
      let campareNames = array[y].split(' ')[0];
      if(name === campareNames){
        isInTheList = true;
      }
      if(isInTheList && isGoing){
        console.log(`${name} is already in the list!`);
      }
      if(isInTheList && !isGoing){
        
      }
    }
  }
}

solve(['Allie is going!',
  'George is going!',
  'John is not going!',
  'George is not going!']
  )