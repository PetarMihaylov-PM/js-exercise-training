function solve (array) {
  let listOfCards = array.shift().split(", ");
  let number = Number(array.shift());

  for (let i = 0; i < number; i++){
    let command = array[i].split(', ')[0];

    if (command === "Add") {
      let cardName = array[i].split(', ')[1];
      
      if(listOfCards.includes(cardName)){
        console.log(`Card is already in the deck`);
      } else {
        listOfCards.push(cardName);
        console.log(`Card successfully added`);
      }
    }

    if (command === "Remove"){
      let cardName = array[i].split(', ')[1];

      if(listOfCards.includes(cardName)){
        let index = listOfCards.indexOf(cardName);
        listOfCards.splice(index, 1);
        console.log(`Card successfully removed`);
      } else {
        console.log(`Card not found`);
      }
    }

    if (command === "Remove At"){
      let index = Number(array[i].split(', ')[1]);

      if(index < 0 || index >= listOfCards.length){
        console.log(`Index out of range`);
      } else {
        listOfCards.splice(index, 1);
        console.log(`Card successfully removed`);
      }
    }

    if (command === "Insert"){
      let index = Number(array[i].split(', ')[1]);
      let cardName = array[i].split(', ')[2];
      
      if(index < 0 || index >= listOfCards.length){
        console.log(`Index out of range`);
      } else {
        if (listOfCards.includes(cardName)){
          console.log(`Card is already added`);
        } else {
          listOfCards.splice(index, 0, cardName);
          console.log(`Card successfully added`);
        }
      }
    }
  }
  console.log(listOfCards.join(", "));
}

solve(["Two of Clubs, King of Spades, Five of Spades, Jack of Hearts",
  "2",
  "Add, Two of Clubs",
  "Remove, Five of Hearts"]);