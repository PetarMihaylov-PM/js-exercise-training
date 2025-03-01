function solve (array){
  let resourcesQtys = {};

  for(let i = 0; i < array.length; i+=2){
    let resource = array[i];
    let quantity = Number(array[i+1]);
    if(resource in resourcesQtys){
      resourcesQtys[resource] += quantity;
    } else {
      resourcesQtys[resource] = quantity;
    }
  }
  for(let key in resourcesQtys){
    console.log(`${key} -> ${resourcesQtys[key]}`);
  }
}
solve([
  'gold',
  '155',
  'silver',
  '10',
  'copper',
  '17',
  'gold',
  '15'
  ]
  )
