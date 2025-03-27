function solve(string){
  let midIndex = Math.floor(string.length / 2);
  string = string.split('');
  let firstHalf = string.splice(0, midIndex).reverse().join('');
  let secondHalf = string.reverse().join('');
  console.log(firstHalf);
  console.log(secondHalf);
}
solve('tluciffiDsIsihTgnizamAoSsIsihT');

//if the the task was to print the words separated. 
function solve2(string){
  string = string.split('').reverse().join('');
  const words = string.match(/[A-Z][a-z]*|[a-z]+/g);
  console.log(words.join(', '))
}

solve2('tluciffiDsIsihTgnizamAoSsIsihT');