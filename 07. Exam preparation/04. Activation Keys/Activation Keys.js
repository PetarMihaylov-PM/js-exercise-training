function solve (array) {
  let key = array.shift();

  let command = array.shift();

  while (command !== 'Generate'){

    if(command.includes('Contains')){
      let [instruction, substring] = command.split('>>>');

      if(key.includes(substring)){
        console.log(`${key} contains ${substring}`);
      } else {
        console.log("Substring not found!");
      }
    }

    if(command.includes('Flip')){
      let [instruction, changeTo, startIndex, endIndex] = command.split('>>>');
      startIndex = Number(startIndex);
      endIndex = Number(endIndex);

      if(changeTo === 'Upper'){
        let substring = key.split('').slice(startIndex, endIndex).join('');
        let substringChanged = substring.toUpperCase();
        key = key.replace(substring, substringChanged);
      }

      if(changeTo === 'Lower'){
        let substring = key.split('').slice(startIndex, endIndex).join('');
        let substringChanged = substring.toLowerCase();
        key = key.replace(substring, substringChanged);
      }
      console.log(key);
      
    }

    if(command.includes('Slice')){
      let [instruction, startIndex, endIndex] = command.split('>>>');
      startIndex = Number(startIndex);
      endIndex = Number(endIndex);

      let firstHalf = key.slice(0, startIndex);
      let secontHalf = key.slice(endIndex, key.length);

      key = firstHalf + secontHalf;
      console.log(key);
    }

    command = array.shift();
  }
  console.log(`Your activation key is: ${key}`);
}

solve((["134softsf5ftuni2020rockz42",
  "Slice>>>3>>>7",
  "Contains>>>-rock",
  "Contains>>>-uni-",
  "Contains>>>-rocks",
  "Flip>>>Upper>>>2>>>8",
  "Flip>>>Lower>>>5>>>11",
  "Generate"])  
  )