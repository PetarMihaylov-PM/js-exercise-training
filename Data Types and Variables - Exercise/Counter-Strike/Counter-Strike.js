function solve(array) {
  let energy = Number(array.shift());

  let command = array.shift();
  let countWins = 0;

  while (command !== "End of battle"){
    
    if(energy - Number(command) >= 0){
      energy -= Number(command);
      countWins++;
      if(countWins % 3 === 0){
        energy += countWins;
      }
    } else {
      console.log(`Not enough energy! Game ends with ${countWins} won battles and ${energy} energy`);
      return;
    }
    command = array.shift();
  }
  console.log(`Won battles: ${countWins}. Energy left: ${energy}`)
}


solve(["100",
  "10",
  "10",
  "10",
  "1",
  "2",
  "3",
  "73",
  "10"]);
  