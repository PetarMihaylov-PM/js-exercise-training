function solve(array) {
  let numOfHeroes = Number(array.shift());
  let heroes = {};
  let isAlive = true;

  for (let i = 0; i < numOfHeroes; i++) {
    let [name, hitPt, manaPt] = array[i].split(' ');
    heroes[name] = {
      health: Number(hitPt),
      mana: Number(manaPt),
      isAlive: isAlive
    }
  }
  
  for (let i = numOfHeroes; i < array.length; i++) {
    let command = array[i];
    if(command === 'End'){
      break;
    } 
    
    else {

      let [action, name, points, spell] = command.split(' - ');
      points = Number(points);

      if(action === 'Heal'){
        if(heroes[name].health + points > 100){
          let healedFor = 100 - heroes[name].health;
          heroes[name].health = 100;
          console.log(`${name} healed for ${healedFor} HP!`);
        } else {
          heroes[name].health += points;
          console.log(`${name} healed for ${points} HP!`);
        }
        
      }

      if(action === 'Recharge'){
        if(heroes[name].mana + points > 200){
          let rechargedFor = 200 - heroes[name].mana;
          heroes[name].mana = 200;
          console.log(`${name} recharged for ${rechargedFor} MP!`);
        } else {
          heroes[name].mana += points;
          console.log(`${name} recharged for ${points} MP!`);
        }
      }

      if(action === 'TakeDamage'){
        heroes[name].health -= points;

        if(heroes[name].health > 0){
          console.log(`${name} was hit for ${points} HP by ${spell} and now has ${heroes[name].health} HP left!`);
        } else {
          console.log(`${name} has been killed by ${spell}!`);

          heroes[name].isAlive = false;
        }
      }

      if(action === 'CastSpell'){
        if(heroes[name].mana >= points){
          heroes[name].mana -= points;
          console.log(`${name} has successfully cast ${spell} and now has ${heroes[name].mana} MP!`);
        } else {
          console.log(`${name} does not have enough MP to cast ${spell}!`);
        }
      }
    }
  }
  
  for (let [hero, data] of Object.entries(heroes)){
    if(data.isAlive){
      console.log(`${hero}\n  HP: ${data.health}\n  MP: ${data.mana}`);
    }
  }
}

solve([
  "4",
  "Adela 90 150",
  "SirMullich 70 40",
  "Ivor 1 111",
  "Tyris 94 61",
  "Heal - SirMullich - 50",
  "Recharge - Adela - 100",
  "CastSpell - Tyris - 1000 - Fireball",
  "TakeDamage - Tyris - 99 - Fireball",
  "TakeDamage - Ivor - 3 - Mosquito",
  "End"
  ]    
  )