function solve (array) {
  let string = array.shift();

  let command = array.shift();

  while(command !== 'End'){
    if(command.includes('Translate')) {
      let [instruction, char, replacement] = command.split(' ');
      string = string.replaceAll(char, replacement);
      console.log(string);
    } 

    if(command.includes('Includes')) {
      let [instruction, stringToFind] = command.split(' ');
      if(string.includes(stringToFind)) {
        console.log('True');
      } else {
        console.log('False');
      }
    }

    if(command.includes('Start')) {
      let [instruction, wordToStartWith] = command.split(' ');
      if(string.startsWith(wordToStartWith)) {
        console.log('True');
      } else {
        console.log('False');
      }
    }

    if(command.includes('Lowercase')) {
      string = string.toLowerCase();
      console.log(string)
    }

    if(command.includes('FindIndex')) {
      let [instruction, char] = command.split(' ');
      let index = string.lastIndexOf(char);
      console.log(index);
    }

    if (command.includes('Remove')) {
      let [instruction, startIndex, count] = command.split(' ');
  
      startIndex = Number(startIndex);
      count = Number(count);
  
      let sliceFirst = string.slice(0, startIndex);
      let sliceSecond = string.slice(startIndex + count);
  
      string = sliceFirst + sliceSecond;
      console.log(string);
  }

    command = array.shift();
  }
}

solve((["*S0ftUni is the B3St Plac3**",
  "Translate 2 o",
  "Includes best",
  "Start the",
  "Lowercase",
  "FindIndex p",
  "Remove 2 7",
  "End"]));