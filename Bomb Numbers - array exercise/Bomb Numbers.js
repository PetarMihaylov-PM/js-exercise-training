function solve(sequence, bombInfo) {
  const bombNumber = bombInfo[0];
  const power = bombInfo[1];
  
  let detonated = new Array(sequence.length).fill(false);

  for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] === bombNumber && !detonated[i]) {
      
          detonated[i] = true;

        
          const start = Math.max(0, i - power);
          const end = Math.min(sequence.length, i + power + 1);
          
          for (let j = start; j < end; j++) {
              detonated[j] = true;
          }
      }
  }

  let remainingSum = 0;
  for (let i = 0; i < sequence.length; i++) {
      if (!detonated[i]) {
          remainingSum += sequence[i];
      }
  }

  console.log(remainingSum);
}

solve([1, 2, 2, 4, 2, 2, 2, 9],
  [4, 2]
  )