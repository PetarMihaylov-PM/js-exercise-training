function solve(word, sentence){
  sentence = sentence.toLowerCase().split(' ');
  if(sentence.includes(word)){
    console.log(word);
    return;
  }
  else {
    console.log(`${word} not found!`);
  }
}
solve('javascript',
'JavaScript is the best programming language'
);