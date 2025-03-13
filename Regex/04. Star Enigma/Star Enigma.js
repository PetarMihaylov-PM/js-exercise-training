function solve(input) {
  let messageNum = Number(input.shift());

  let pattern = /[SsTtAaRr]/gi;
  let messageArr = [];

  for (let i = 0; i < messageNum; i++) {
    let currLine = input.shift();
    let matches = currLine.match(pattern);

    let key = matches && matches.length; // NB!!!
    let decryptedMessage = "";

    for (let char of currLine) {
      let currCharCode = char.charCodeAt(0);
      let newCharCode = currCharCode - key;
      let currMessage = String.fromCharCode(newCharCode);
      decryptedMessage += currMessage;
    }

    messageArr.push(decryptedMessage);
  }

  let regex = /@(?<name>[A-Za-z]+)[^@\-:!>]*:(?<population>[\d]+)[^@\-:!>]*!(?<attack>[A-D])![^@\-:!>]*\->(?<count>[\d]+)/gm
  let matchRegex = regex.exec(messageArr);

  let attackedPlanets = [];
  let destroyedPlanets = [];

  while (matchRegex != null) {
    let planetName = matchRegex.groups.name;
    let attackType = matchRegex.groups.attack;

    if (attackType === "A") {
      attackedPlanets.push(planetName);
    } else if (attackType === "D") {
      destroyedPlanets.push(planetName);
    }

    matchRegex = regex.exec(messageArr);
  }

  attackedPlanets.sort((a, b) => a.localeCompare(b))
  destroyedPlanets.sort((a, b) => a.localeCompare(b))

  console.log(`Attacked planets: ${attackedPlanets.length}`);
  attackedPlanets.forEach(planet => console.log(`-> ${planet}`));
  console.log(`Destroyed planets: ${destroyedPlanets.length}`)
  destroyedPlanets.forEach(planet => console.log(`-> ${planet}`));
 
}
//solve(["2", "STCDoghudd4=63333$D$0A53333", "EHfsytsnhf?8555&I&2C9555SR"]);
solve([
  "3",
  "tt(''DGsvywgerx>6444444444%H%1B9444",
  "GQhrr|A977777(H(TTTT",
  "EHfsytsnhf?8555&I&2C9555SR",
]);
