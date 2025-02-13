function solve(array) {

  let shoppingList = array.shift().split("!");
  
  let commands = array.shift();
  
  while (commands !== "Go Shopping!") {

    let command = commands.split(' ')[0];
    let item = commands.split(' ')[1];
    let indexOfItem = shoppingList.indexOf(item);

    if (command === 'Urgent'){
      
      if(!shoppingList.includes(item)){
        shoppingList.splice(0, 0, item);
      }
    }

    if (command === 'Unnecessary') {

      if(shoppingList.includes(item)){
        shoppingList.splice(indexOfItem, 1);
      }
    }

    if (command === 'Correct') {
      let oldItem = item;
      let newItem = commands.split(' ')[2];

      if(shoppingList.includes(oldItem)){
        let indexOfOldItem = indexOfItem;
        shoppingList.splice(indexOfOldItem, 1, newItem);
      }
    }

    if (command === 'Rearrange') {
      if (shoppingList.includes(item)){
        shoppingList.splice(indexOfItem, 1);
        shoppingList.push(item);
      }
    }
    commands = array.shift();
  }
  console.log(shoppingList.join(', '));
}

solve(["Milk!Pepper!Salt!Water!Banana",
  "Urgent Salt",
  "Unnecessary Grapes",
  "Correct Pepper Onion",
  "Rearrange Grapes",
  "Correct Tomatoes Potatoes",
  "Go Shopping!"]);
  