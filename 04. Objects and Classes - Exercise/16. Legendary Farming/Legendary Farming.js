function solve(string){
  let obj = {
    motes: 0,
    fragments: 0,
    shards: 0
  };
  let junkObj = {};

  let arrOfMaterials = string.split(' ');
  for(let i = 0; i < arrOfMaterials.length; i+=2){
    let quantity = Number(arrOfMaterials[i]);
    let material = arrOfMaterials[i+1].toLowerCase();

    if(material === `fragments` || material === `shards` || material === `motes`){

      if(!obj.hasOwnProperty(material)){
        obj[material] = quantity;
      } else {
        obj[material] += quantity;
      }

    } else {
      if(!junkObj.hasOwnProperty(material)){
        junkObj[material] = quantity;
      } else {
        junkObj[material] += quantity;
      }
    }

    if(obj[material] >= 250 && material === `fragments`){
      console.log(`Valanyr obtained!`);
      obj[material] -= 250;
      break;
    }
    if(obj[material] >= 250 && material === `shards`){
      console.log(`Shadowmourne obtained!`);
      obj[material] -= 250;
      break;
    }
    if(obj[material] >= 250 && material === `motes`){
      console.log(`Dragonwrath obtained!`);
      obj[material] -= 250;
      break;
    }
    
  }

  let entries = Object.entries(obj);
  
  entries.sort((a,b) => {
    if(a[1] === b[1]){
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
    
  });
  
  for(let [key, value] of entries){
    console.log(`${key}: ${value}`);
  }

  let entriesJunk = Object.entries(junkObj).sort((a,b) => a[0].localeCompare(b[0]));
  for(let [key, value] of entriesJunk){
    console.log(`${key}: ${value}`);
  }
}
solve('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards');