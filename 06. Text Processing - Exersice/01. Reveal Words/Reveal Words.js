function solve(words, sentence){
  words = words.split(', ');
  words.forEach(word => {
    sentence = sentence.replace("*".repeat(word.length), word);
  });
  console.log(sentence);
}
solve('great, learning',
'softuni is ***** place for ******** new programming languages'
)