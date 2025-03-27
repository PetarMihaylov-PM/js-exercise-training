function solve(string){
  let arrOfWords = string.split(' ');
  arrOfWords.forEach(word => {
    if(word.startsWith('#') && /^[a-zA-z]+$/.test(word.substring(1))){
      console.log(word.substring(1));
    }
  });
}
solve('The symbol # is known #variously in English-speaking #regions as the #number sign');