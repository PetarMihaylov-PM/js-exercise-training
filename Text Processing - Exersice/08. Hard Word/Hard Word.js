function solve(array){
  let sentence = array.shift();
  let words = array.shift();
  sentence = sentence.split(' ');
  words.forEach(word => {
   for(let i = 0; i < sentence.length; i++){
    let wordInSentence = sentence[i];
    let endChar = wordInSentence.split('').pop();
    if(wordInSentence.includes('_') && endChar !== '_'){
      wordInSentence = wordInSentence.split(endChar)[0];
    }
    if(word.length === wordInSentence.length && wordInSentence.includes('_')){
      if(endChar !== '_'){
        sentence[i] = word + endChar;
      } else {
        sentence[i] = word;
      }
      
    }
   }
  });
  console.log(sentence.join(' '));
}
solve(['Hi, grandma! I\'m so ____ to write to you. ______ the winter vacation, so _______ things happened. My dad bought me a sled. Mom started a new job as a __________. My brother\'s ankle is ________, and now it bothers me even more. Every night Mom cooks ___ on your recipe because it is the most delicious. I hope this year Santa will _____ me a robot.',
  ['glad', 'pie', 'bring', 'During', 'amazing', 'pharmacist', 'sprained']]);