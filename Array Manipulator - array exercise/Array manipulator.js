function solve(array, commands) {
 
  let i = 0;
  let command = commands[i];
  i++;
  
  while (command !== 'print'){

    let execute = command.split(' ')[0];

    if (execute === 'add'){
      let index = command.split(' ')[1];
      let element = command.split(' ')[2];
      array.splice(index, 0, element);
    }
    else if (execute === 'addMany'){
      let index = command.split(' ').splice(1, 1);
      let elements = command.split(' ').splice(2, command.length);

      array.splice(index, 0, elements)
    }

    command = commands[i].split(' ')[0];
    i++;
  } 
}

solve([1, 2, 4, 5, 6, 7],
['add 1 8', 'contains 1', 'contains 3', 'print'])
