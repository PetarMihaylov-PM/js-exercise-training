function solve(input) {
  let text = input[0];

  let digits = text.match(/\d/g).map(Number);
  let coolThreshold = digits.reduce((a, b) => a * b, 1);
  console.log(`Cool threshold: ${coolThreshold}`);

  let emojiPattern = /(\*\*[A-Z][a-z]{2,}\*\*|::[A-Z][a-z]{2,}::)/g;
  let allEmojis = text.match(emojiPattern) || [];

  console.log(`${allEmojis.length} emojis found in the text. The cool ones are:`);

  allEmojis.forEach(emoji => {
      let word = emoji.slice(2, -2);
      let coolness = word.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

      if (coolness > coolThreshold) {
          console.log(emoji);
      }
  });
}

solve(["In the Sofia Zoo there are 311 animals in total! ::Smiley:: This includes 3 **Tigers**, 1 ::Elephant:, 12 **Monk3ys**, a **Gorilla::, 5 ::fox:es: and 21 different types of :Snak::Es::. ::Mooning:: **Shy**"]);