function solve(array){
  let wagons = array[0].split(' ').map(Number);
  let capacity = parseInt(array[1]);
  
  let i = 2;
  let command = array[i];
  i++;

  while(command){
    
    let add = command.split(' ');
    if(add[0] === 'Add'){
      wagons.push(Number(add[1]));
    } else{

      let passengersToAdd = Number(command);
      for(let j = 0; j < wagons.length; j++){
        
        if(passengersToAdd + wagons[j] <= capacity){
          wagons[j] += passengersToAdd;
          break;
        }
      }
    }
    command = array[i];
    i++;
  }
  let display = wagons.map(String).join(' ');
  console.log(display);
}

solve(['0 0 0 10 2 4',
  '10',
  'Add 10',
  '10',
  '10',
  '10',
  '8',
  '6']
  )