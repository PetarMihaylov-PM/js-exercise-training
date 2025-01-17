function registration(userName, command){
  let i = 0;
  let commands = command[i];
  i++;

  while (commands !== 'Registration'){
    let sliceCommand = commands.split(' ');
    
    if(sliceCommand[0] === 'Letters'){
      if(sliceCommand[1] === "Lower"){
        
        console.log(userName.toLowerCase());
      } else if(sliceCommand[1] === "Upper"){
        ;
        console.log(userName.toUpperCase());
      }
    }

    if(sliceCommand[0] === "Reverse"){
      let startIndex = Number(sliceCommand[1]);
      let endIndex = Number(sliceCommand[2]);

      if(startIndex >= 0 && endIndex < userName.length && startIndex <= endIndex){
        let stringToReverse = userName.slice(startIndex, endIndex + 1);
        let displayNewString = stringToReverse.split('').reverse().join('');
        console.log(displayNewString);
      }
    }

    if(sliceCommand[0] === 'Substring'){
      if(userName.includes(sliceCommand[1])){
        userName = userName.replace(sliceCommand[1], '');
        console.log(userName);
      } else{
        console.log(`The username ${userName} doesn't contain ${sliceCommand[1]}.`);
      }
    }

    if(sliceCommand[0] === 'Replace'){
     let charToReplace = sliceCommand[1];
     userName = userName.split(charToReplace).join("-");
     console.log(userName);
    }

    if(sliceCommand[0] === 'IsValid'){
      let charToInclude = sliceCommand[1];
      if(userName.includes(charToInclude)){
        console.log('Valid username.')
      }else{
        console.log(`${charToInclude} must be contained in your username.`)
      }
    }

    commands = command[i];
    i++;
  }
}

registration('John',
  ['Letters Lower',
  'Substring SA',
  'IsValid @',
  'Registration']
  )