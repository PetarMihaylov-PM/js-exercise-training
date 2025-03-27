function solve(array) {

  let sequence = array.shift().split(' ');

  let countMoves = 0;

  let command = array.shift();

  while (command !== 'end'){
    countMoves++;

    let tokens = command.split(' ');
    
    let firstIndex = tokens[0];
    let secondIndex = tokens[1];

    let findFirstElement = sequence[firstIndex];
    let findSecondElement = sequence[secondIndex];

    if(firstIndex < 0 || secondIndex < 0 || 
      firstIndex === secondIndex || 
      firstIndex > sequence.length || secondIndex > sequence.length){

      let findHalf = Math.floor(sequence.length / 2);
      sequence.splice(findHalf, 0, `-${countMoves}a`, `-${countMoves}a`);
      console.log(`Invalid input! Adding additional elements to the board`);
    } 
    
    else {
      if(findFirstElement === findSecondElement) {
        console.log(`Congrats! You have found matching elements - ${findFirstElement}!`);
        sequence.splice(sequence.indexOf(findFirstElement), 1);
        sequence.splice(sequence.indexOf(findSecondElement), 1);
      } 
      else {
        console.log(`Try again!`);
      }
    }

    if(sequence.length === 0) {
      console.log(`"You have won in ${countMoves} turns!`);
      return;
    }
    command = array.shift();
  }
  console.log(`Sorry you lose :(
${sequence.join(' ')};
`)
}

solve(["a 2 4 a 2 4", 
"4 0", 
"0 2",
"0 1",
"0 1", 
"end"
]  
  );