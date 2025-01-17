function dungeon(input){

  let initialHealth = 100;
  let initialCoins = 0;
  let bestRoom = 0;
  let dungeonRooms = input.split('|');
  
  for(let i = 0; i < dungeonRooms.length; i++){
    bestRoom++;
    let monsterOrItem = dungeonRooms[i].split(' ')[0];
    let number = Number(dungeonRooms[i].split(' ')[1]);
    
    if(monsterOrItem === "potion"){
      
      let healed = 0;

      initialHealth += number;

      if(initialHealth > 100){
        healed = 100 - (initialHealth - number);
        initialHealth = 100;
      }
      else{
        healed = number;
      }

      console.log(`You healed for ${healed} hp.`);
      console.log(`Current health: ${initialHealth} hp.`);
    }

    else if(monsterOrItem === "chest"){
      let foundCoins = number;
      initialCoins += number;
      console.log(`You found ${foundCoins} coins.`)
    }
    
    else{
      let monsterName = monsterOrItem;
      let monsterPower = number;

      initialHealth -= monsterPower;
      if(initialHealth > 0){
        console.log(`You slayed ${monsterName}.`);
      }
      else{
        console.log(`You died! Killed by ${monsterName}.`);
        console.log(`Best room: ${bestRoom}`);
        return;
      }
    }
  }
  console.log("You've made it!");
  console.log(`Coins: ${initialCoins}`);
  console.log(`Health: ${initialHealth}`);
}

dungeon("rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000");