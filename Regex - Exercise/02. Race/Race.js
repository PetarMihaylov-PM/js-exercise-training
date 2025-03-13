function race(input) {
  let participants = input.shift().split(", ");
  let command = input.shift();
  let participantsObj = {};

  let namePattern = /[A-Za-z]+/g;
  let numPattern = /\d+/g;

  while (command !== "end of race") {
    let currentName = command.match(namePattern).join(""); 
    let currentDistance = command.match(numPattern).join("");
    let distance = 0;
    

    if (participants.includes(currentName)) {
      for (let num of currentDistance) {
        let currNum = Number(num);
        distance += currNum;
      }
    }
    

    if (!participantsObj.hasOwnProperty(currentName)) {
      participantsObj[currentName] = distance; 
    } else {
      participantsObj[currentName] += distance; 
    }

    command = input.shift();
  }
  //console.table(participantsObj);

  let sortedEntries = Object.entries(participantsObj).sort(
    (a, b) => b[1] - a[1]
  );
  let firstPlace = sortedEntries[0][0];
  let secondPlace = sortedEntries[1][0];
  let thirdPlace = sortedEntries[2][0];

  console.log(`1st place: ${firstPlace}`);
  console.log(`2nd place: ${secondPlace}`);
  console.log(`3rd place: ${thirdPlace}`);
}
race([
  "George, Peter, Bill, Tom",
  "G4e@55or%6g6!68e!!@ ",
  "R1@!3a$y4456@",
  "B5@i@#123ll",
  "G@e54o$r6ge#",
  "7P%et^#e5346r",
  "T$o553m&6",
  "end of race",
]);
