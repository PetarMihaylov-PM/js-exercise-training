function solve(string){
  let result = [];
  string = string.split('');
  let startIndex = 0;
  let endIndex = string.length;
  for(let i = string.length - 1; i >= 0; i--){
    let char = string[i];
    if(/^[A-Z]+$/.test(char)){
      startIndex = i;
      let word = string.splice(startIndex, endIndex);
      result.push(word.join(''));
    }
  }

  console.log(result.reverse().join(', '));
}
solve('SplitMe')