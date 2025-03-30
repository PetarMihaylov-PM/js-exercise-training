function solve (array) {
  let number = Number(array.shift());

  let pattern = /^!([A-Z][a-z]{2,})!:\[([A-Za-z]{8,})\]$/;

  for (let i = 0; i < number; i++) {
    let checked = array[i].match(pattern);

    if(checked){
      let command = checked[1];
      let message = checked[2];
      let result = message.split('').map(char=> char.charCodeAt(0)).join(' ');

      console.log(`${command}: ${result}`);
    } 
    
    else {
      console.log("The message is invalid");
    }
  }
}

solve(["2",
  "!Send!:[IvanisHere]",
  "*Time@:[Itis5amAlready"]
  );