
// with rexgen
function solve(string){

  console.log(string.replace(/(.)\1+/g, '$1'));
}
solve('aaaaabbbbbcdddeeeedssaa');

//other solution
function solve2(string){
  let result = ''
  let previousChar = '';

  for(let char of string){
    if(previousChar !== char){
      previousChar = char;
      result += char;
    }
  }
  console.log(result);
}
solve2('aaaaabbbbbcdddeeeedssaa');