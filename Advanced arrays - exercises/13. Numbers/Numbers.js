function solve (array) {
  let numbers = array.shift().split(' ').map(Number);
  
  let command = array.shift();
  while(command !== 'Finish'){
    let commandToExecute = command.split(' ')[0];
    let value = Number(command.split(' ')[1]);

    if(commandToExecute === "Add"){
      numbers.push(value);
    }

    if(commandToExecute === "Remove"){
      let index = numbers.indexOf(value);
      if(index !== -1){
        numbers.splice(index, 1);
      }
    }

    if(commandToExecute === "Replace"){
      let newValue = Number(command.split(' ')[2]);
      let index = numbers.indexOf(value);
      if(index !== -1){
        numbers.splice(index, 1, newValue);
      }
    }

    if(commandToExecute === "Collapse"){
      numbers = numbers.filter(element => element >= value);
    }
    command = array.shift();
  }

  console.log(numbers.join(' '));
}

solve(["5 9 70 -56 9 9",
  "Replace 9 10",
  "Remove 9",
  "Finish"]);
  
  
  
  