function solve(arrayOfCommands) {

  let inventory = arrayOfCommands.shift().split(' ');
  
  arrayOfCommands.forEach(element => {

    let command = element.split(' ')[0];
    let equipment = element.split(' ')[1];

    if (command === 'Buy') {
      if(!inventory.includes(equipment)) {
        inventory.push(equipment);
      }
    }

    else if (command === 'Trash') {
      if (inventory.includes(equipment)) {
        let equipmentIndex = inventory.indexOf(equipment);
        inventory.splice(equipmentIndex, 1);
      }
    }

    else if (command === 'Repair') {
      if (inventory.includes(equipment)) {
        let equipmentIndex = inventory.indexOf(equipment);
        inventory.splice(equipmentIndex, 1);
        inventory.push(equipment);
      }
    }

    else if (command === 'Upgrade') {
      let equipment2 = equipment.split('-')[0];
      let upgrade = equipment.split('-')[1];
      
      if (inventory.includes(equipment2)) {
        let equipmentIndex = inventory.indexOf(equipment2);
        let elementToAdd = `${equipment2}:${upgrade}`;
        inventory.splice((equipmentIndex + 1), 0, elementToAdd);
      }
    }
  });
 
  console.log(inventory.join(' '));
}

solve(['SWORD Shield Spear',
  'Trash Bow',
  'Repair Shield',
  'Upgrade Helmet-V']
  )