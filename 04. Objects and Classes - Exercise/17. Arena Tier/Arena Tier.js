function arena(data) {
  let gladiatorsPool = new Map();
  isCommand = false;

  for (let line of data) {
    if (line.includes("Ave Cesar")) {
      isCommand = true;
      break;
    }

    if (line.includes("->")) {
      let [name, technique, skill] = line.split(" -> ");
      skill = Number(skill);

      if (!gladiatorsPool.has(name)) {
        gladiatorsPool.set(name, new Map());
      }

      if (
        !gladiatorsPool.get(name).has(technique) ||
        (gladiatorsPool.get(name).has(technique) &&
          gladiatorsPool.get(name).get(technique) < skill)
      ) {
        gladiatorsPool.get(name).set(technique, skill);
      }
    } else if (line.includes("vs")) {
      let [gladiatorA, gladiatorB] = line.split(" vs ");

      if (gladiatorsPool.has(gladiatorA) && gladiatorsPool.has(gladiatorB)) {
        let techGladiatorA = gladiatorsPool.get(gladiatorA);
        let techGladiatorB = gladiatorsPool.get(gladiatorB);

        let bigSkillMap =
          techGladiatorA.size > techGladiatorB.size
            ? techGladiatorA
            : techGladiatorB;
        let smallSkillMap =
          techGladiatorA.size > techGladiatorB.size
            ? techGladiatorB
            : techGladiatorA;

        for (let [techName, skill] of Array.from(bigSkillMap)) {
          if (smallSkillMap.has(techName)) {
            if (techGladiatorA.get(techName) > techGladiatorB.get(techName)) {
              techGladiatorB.delete(techName);
            } else {
              techGladiatorA.delete(techName);
            }
          }
        }
      }
    }
  }

  let gladiatorsPoints = new Map();
  for (let [gladiatorName, technique] of Array.from(gladiatorsPool)) {
    let sum = 0;
    for (let [tech, skill] of Array.from(technique)) {
      sum += skill;
    }
    if (sum !== 0) {
      gladiatorsPoints.set(gladiatorName, sum);
    }
  }

  let sortGladiatorByPoints = Array.from(gladiatorsPoints.entries()).sort(
    (a, b) => {
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    }
  );

  for (let [name, points] of sortGladiatorByPoints) {
    console.log(`${name}: ${points} skill`);

    let tech = Array.from(gladiatorsPool.get(name)).sort((a, b) => {
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    });

    for (let [techName, skillPoints] of tech) {
      console.log(`- ${techName} <!> ${skillPoints}`);
    }
  }
}
arena([
  "Peter -> BattleCry -> 400",
  "Alex -> PowerPunch -> 300",
  "Stefan -> Duck -> 200",
  "Stefan -> Tiger -> 250",
  "Ave Cesar",
]);
console.log("------");
arena([
  "Peter -> Duck -> 400",
  "Julius -> Shield -> 150",
  "Gladius -> Heal -> 200",
  "Gladius -> Support -> 250",
  "Gladius -> Shield -> 250",
  "Peter vs Gladius",
  "Gladius vs Julius",
  "Gladius vs Maximilian",
  "Ave Cesar",
]);

//Version with object

function arena(arr) {
  let gladiatorPool = {};

  for (let line of arr) {
    if (line === "Ave Cesar") {
      break;
    }

    if (line.includes(" -> ")) {
      let [gladiatorName, technique, skill] = line.split(" -> ");

      /**
       When you receive a gladiator and his technique and skill, add him to the gladiator pool, if he isn't present, else add
       his technique or update his skill, only if the current technical skill is lower than the new value.
       */

      if (!gladiatorPool.hasOwnProperty(gladiatorName)) {
        gladiatorPool[gladiatorName] = {};
      }

      if (!gladiatorPool[gladiatorName].hasOwnProperty(technique)) {
        gladiatorPool[gladiatorName][technique] = skill;
      } else if (gladiatorPool[gladiatorName][technique] < skill) {
        gladiatorPool[gladiatorName][technique] = skill;
      }
    } else if (line.includes(" vs ")) {
      let [firstGladiator, secondGladiator] = line.split(" vs ");

      //check if both gladiators exist in the pool

      if (
        gladiatorPool.hasOwnProperty(firstGladiator) &&
        gladiatorPool.hasOwnProperty(secondGladiator)
      ) {
        let firstGladiatorSkills = gladiatorPool[firstGladiator];
        let secondGladiatorSkills = gladiatorPool[secondGladiator];

        //Compare their techniques, if they got at least one in common
        for (let skill in firstGladiatorSkills) {
          if (secondGladiatorSkills.hasOwnProperty(skill)) {
            //the gladiator with better total skill points wins

            if (firstGladiatorSkills[skill] > secondGladiatorSkills[skill]) {
              //other is demoted from the pool -> remove him.
              delete gladiatorPool[secondGladiator];
            } else if (
              firstGladiatorSkills[skill] < secondGladiatorSkills[skill]
            ) {
              delete gladiatorPool[firstGladiator];
            }
          }
        }
      }
    }
  }

  //ordered by total skill in descending order, then ordered by name in ascending order.
  let gladiatorsTotalPoints = {};

  for (let [gladiatorName, technique] of Object.entries(gladiatorPool)) {
    let sumOfSills = 0;
    for (let [tech, skill] of Object.entries(technique)) {
      sumOfSills += Number(skill);
    }
    if (sumOfSills !== 0) {
      gladiatorsTotalPoints[gladiatorName] = sumOfSills;
    }
  }

  // get total skill/points

  let sortGladiatorByPoints = Object.entries(gladiatorsTotalPoints).sort(
    (a, b) => {
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    }
  );

  for (let [gladiatorName, points] of sortGladiatorByPoints) {
    console.log(`${gladiatorName}: ${points} skill`);

    // technique and skill ordered descending, then ordered by technique name in ascending order

    let tech = Object.entries(gladiatorPool[gladiatorName]).sort((a, b) => {
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    });

    for (let [techName, skillPoints] of tech) {
      console.log(`- ${techName} <!> ${skillPoints}`);
    }
  }
}
arena([
  "Peter -> BattleCry -> 600",
  "Alex -> PowerPunch -> 300",
  "Stefan -> Duck -> 200",
  "Stefan -> Tiger -> 250",
  "Ave Cesar",
]);

console.log("--------------");

arena([
  "Peter -> Duck -> 400",
  "Julius -> Shield -> 150",
  "Gladius -> Heal -> 200",
  "Gladius -> Support -> 250",
  "Gladius -> Shield -> 250",
  "Peter vs Gladius",
  "Gladius vs Julius",
  "Gladius vs Maximilian",
  "Ave Cesar",
]);

// VERSION WITH WHILE

function arena(data) {
  let gladiatorsPool = new Map();
  let index = 0;
  let command = data[index];
  index++;

  while (command !== "Ave Cesar") {
    if (command.includes("->")) {
      let [name, technique, skill] = command.split(" -> ");
      skill = Number(skill);

      if (!gladiatorsPool.has(name)) {
        gladiatorsPool.set(name, new Map());
      }

      if (
        !gladiatorsPool.get(name).has(technique) ||
        (gladiatorsPool.get(name).has(technique) &&
          gladiatorsPool.get(name).get(technique) < skill)
      ) {
        gladiatorsPool.get(name).set(technique, skill);
      }
    } else if (command.includes("vs")) {
      let [gladiatorA, gladiatorB] = command.split(" vs ");

      if (gladiatorsPool.has(gladiatorA) && gladiatorsPool.has(gladiatorB)) {
        let techGladiatorA = gladiatorsPool.get(gladiatorA);
        let techGladiatorB = gladiatorsPool.get(gladiatorB);

        let bigSkillMap =
          techGladiatorA.size > techGladiatorB.size
            ? techGladiatorA
            : techGladiatorB;
        let smallSkillMap =
          techGladiatorA.size > techGladiatorB.size
            ? techGladiatorB
            : techGladiatorA;

        for (let [techName, skill] of Array.from(bigSkillMap)) {
          if (smallSkillMap.has(techName)) {
            if (techGladiatorA.get(techName) > techGladiatorB.get(techName)) {
              techGladiatorB.delete(techName);
            } else {
              techGladiatorA.delete(techName);
            }
          }
        }
      }
    }

    command = data[index];
    index++;
  }

  let gladiatorPoints = new Map();

  for (let [gladiatorName, technique] of Array.from(gladiatorsPool)) {
    let totalPoints = 0;
    for (let [tech, skill] of Array.from(technique)) {
      totalPoints += skill;
    }

    if (totalPoints !== 0) {
      gladiatorPoints.set(gladiatorName, totalPoints);
    }
  }

  let sortGladiatorByPoints = Array.from(gladiatorPoints).sort((a, b) => {
    return b[1] - a[1] || a[0].localeCompare(b[0]);
  });

  for (let [name, points] of sortGladiatorByPoints) {
    console.log(`${name}: ${points} skill`);

    let techs = Array.from(gladiatorsPool.get(name)).sort((a, b) => {
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    });

    for (let [techName, skillPoints] of techs) {
      console.log(`- ${techName} <!> ${skillPoints}`);
    }
  }
}
arena([
  "Peter -> BattleCry -> 400",
  "Alex -> PowerPunch -> 300",
  "Stefan -> Duck -> 200",
  "Stefan -> Tiger -> 250",
  "Ave Cesar",
]);

console.log("--------------");

arena([
  "Peter -> Duck -> 400",
  "Julius -> Shield -> 150",
  "Gladius -> Heal -> 200",
  "Gladius -> Support -> 250",
  "Gladius -> Shield -> 250",
  "Peter vs Gladius",
  "Gladius vs Julius",
  "Gladius vs Maximilian",
  "Ave Cesar",
]);
