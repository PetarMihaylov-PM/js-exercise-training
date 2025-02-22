function solve (array) {
  array.sort((a,b) => Number(a.split(' / ')[1]) - Number(b.split(' / ')[1]));

  array.forEach(element => {
    const tokens = element.split('/').map(e => e.trim());
    const name = tokens[0];
    const level = Number(tokens[1]);
    const items = tokens[2];

    const character = {
      name: name,
      level: level,
      items: items
    };
    
    console.log(`Hero: ${character.name}`);
    console.log(`level => ${character.level}`);
    if(items){
      console.log(`items => ${character.items}`);
    }
  });
}

solve([
  'Isacc / 25 / ',
  'Derek / 12 / BarrelVest, DestructionSword',
  'Hes / 1 / Desolator, Sentinel, Antara'
  ]
  );