function solve(array, commands) {
 
  let i = 0;
  
  while (i < commands.length){
    let command = commands[i];
    let execute = command.split(' ')[0];

    if (execute === 'add'){
      let index = command.split(' ')[1];
      let element = command.split(' ')[2];
      array.splice(index, 0, element);
    }

    else if (execute === 'addMany'){
      let index = command.split(' ').splice(1, 1);
      let elements = command.split(' ').splice(2).map(Number);

      array.splice(index, 0, ...elements);
    }

    else if (execute === 'contains') {
      let number = command.split(' ')[1];
      number = Number(number);

      let index = array.findIndex(element => element === number);
      console.log(index);
    }

    else if (execute === 'remove'){
      let index = command.split(' ')[1];
      array.splice(index, 1);
    }

    else if (execute === 'shift'){
      let positions = command.split(' ')[1];

      positions = positions % array.length;

      for (let i = 0; i < positions; i++){
        array.push(array.shift());
      }
    }

    else if (command === 'sumPairs'){
      let doubledArr = [];
      
      for(let i = 0; i < array.length; i++){
        let sum = array[i] + (array[i+1] || 0);
        doubledArr.push(sum);
      }

      array.splice(0, array.length);

      array = doubledArr;
    }

    else if(command === 'print'){
      console.log(`[ ${array.join(', ')} ]`);
      break;
    }
    i++;
  }
}

solve([1, 2, 3, 4, 5],
  ['addMany 5 9 8 7 6 5', 'contains 15', 'remove 3', 'shift 1', 'print']
  )
