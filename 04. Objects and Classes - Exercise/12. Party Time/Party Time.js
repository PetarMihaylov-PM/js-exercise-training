function solve(input) {
  let vipList = [];
  let regularLIst = [];

  let command = input.shift();

  while (command !== "PARTY") {
    let isFirstCharNum = startsWithNumber(command);

    if (isFirstCharNum === true) {
      vipList.push(command);
    } else {
      regularLIst.push(command);
    }

    command = input.shift();
  }

  let allGuests = vipList.concat(regularLIst);

  for (let guest of input) {
    allGuests.splice(allGuests.indexOf(guest), 1);
  }

  console.log(allGuests.length);
  console.log(allGuests.join("\n"));

  function startsWithNumber(str) {
    return /^\d/.test(str);
  }
}

  
solve(['7IK9Yo0h',
  '9NoBUajQ',
  'Ce8vwPmE',
  'SVQXQCbc',
  'tSzE5t0p',
  'PARTY',
  '9NoBUajQ',
  'Ce8vwPmE',
  'SVQXQCbc'
  ]  
  );