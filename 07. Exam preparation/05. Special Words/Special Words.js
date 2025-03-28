function findMirrorWords(input) {
  let text = input[0];
  let pattern = /([#@])([A-Za-z]{3,})\1\1([A-Za-z]{3,})\1/g;
  let matches = [...text.matchAll(pattern)];

  let wordPairs = [];
  let mirrorWords = [];

  for (let match of matches) {
      let wordOne = match[2];
      let wordTwo = match[3];

      wordPairs.push([wordOne, wordTwo]);

      if (wordOne === wordTwo.split('').reverse().join('')) {
          mirrorWords.push(`${wordOne} <=> ${wordTwo}`);
      }
  }

  if (wordPairs.length === 0) {
      console.log("No word pairs found!");
  } else {
      console.log(`${wordPairs.length} word pairs found!`);
  }

  if (mirrorWords.length === 0) {
      console.log("No mirror words!");
  } else {
      console.log("The mirror words are:");
      console.log(mirrorWords.join(", "));
  }
}

findMirrorWords([
  "@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r"
]);