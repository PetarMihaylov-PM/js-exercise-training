//Match a single character present in the list below [+-]
//? matches the previous token between zero and one times,
//as many times as possible, giving back as needed (greedy)

function solve(input) {
  let separatorRegex = /\s*,\s*/g;
  let line = input.split(separatorRegex);

  let healthRegex = /(?<health>[^0-9+\-\*\/\.])/g;
  let damageRegex = /(?<operator>[+-]?)(?<digit>\d+\.?\d*)/g;
  let actionRegex = /(?<action>[\*\/])/g;

  let result = {};

  for (let demon of line) {
    let matchHealthReg = demon.match(healthRegex);
    let matchDamageReg = demon.match(damageRegex);
    let matchDamageActionReg = demon.match(actionRegex);

    let health = 0;
    let damage = 0;

    for (let char of matchHealthReg) {
      let currChar = char.charCodeAt(0);
      health += currChar;
    }

    if (matchDamageReg === null) {
      matchDamageReg = [0]; // !!NB

    } else if (matchDamageReg !== null) {
      for (let digit of matchDamageReg) {
        let currDigit = Number(digit);
        damage += currDigit;
      }

      if (matchDamageActionReg === null) {
        matchDamageActionReg = []; // NB!!

      } else {
        for (let digit of matchDamageActionReg) {
          if (digit === "*") {
            damage *= 2;
          } else if (digit === "/") {
            damage /= 2;
          }
        }
      }
    }

    result[demon] = {};
    result[demon]["health"] = health;
    result[demon]["damage"] = damage;
  }

  console.table(result)
  sortedEntries = Object.entries(result).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  console.table(sortedEntries)
  for (let [name, value] of sortedEntries) {
    console.log(
      `${name} - ${value.health} health, ${value.damage.toFixed(2)} damage`
    );
  }
}
solve("M3ph-0.5s-0.5t0.0*2*4/2**");
solve("M3ph1st0**, Azazel");
solve("Gos/ho");

// version 2

function solve(input) {
  let separatorRegex = /\s*,\s*/g;
  let demons = input.split(separatorRegex);
  console.log(demons)

  let healthRegex = /(?<health>[^0-9+\-\*\/\.])/g;
  let damageRegex = /(?<damage>[\-+]*[\d]+(\.[\d]+)*)/g;
  let arithmeticSymbolsRegex = /(?<arithmeticsSymbols>[\*\/])/g;

  let demonsInfo = {};

  for (const demon of demons) {
      let currHealthArr = demon.match(healthRegex);
      let currDamageArr = demon.match(damageRegex);
      let currArithmeticsSymbolsArr = demon.match(arithmeticSymbolsRegex);

      if (currDamageArr === null) {
          currDamageArr = [0];
          
      } else {
          currDamageArr = currDamageArr.map(Number);
      }

      if (currArithmeticsSymbolsArr === null) {
          currArithmeticsSymbolsArr = [];
      }

      let modifiedHealthArrAsNums = currHealthArr.map(x => x.charCodeAt());
      let demonsTotalHealth = modifiedHealthArrAsNums.reduce((acc, x) => acc + x, 0);

      let baseDamage = currDamageArr.reduce((acc, x) => acc + x, 0);

      for (const currArithmeticsSymbol of currArithmeticsSymbolsArr) {
          if (currArithmeticsSymbol === '*') {
              baseDamage *= 2;
          } else if (currArithmeticsSymbol === '/') {
              baseDamage /= 2;
          }
      }

      demonsInfo[demon] = [demonsTotalHealth, baseDamage];
  }

  let sortedDemons = Object.entries(demonsInfo).sort((a, b) => a[0].localeCompare(b[0]));
  
  for (const [demonName, info] of sortedDemons) {
      let [health, damage] = info;

      console.log(`${demonName} - ${health} health, ${damage.toFixed(2)} damage`);
  }
}
//solve("M3ph-0.5s-0.5t0.0**")
solve("M3ph1st0**, Azazel")