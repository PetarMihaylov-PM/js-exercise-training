function solve(array){
  let message = array.shift();
  let command = array.shift();

  while (command !== 'Reveal'){
    
    if(command.includes('InsertSpace')){
      let index = Number(command.split(':|:')[1]);
      let messageArr = message.split('');
      messageArr.splice(index, 0, " ");
      message = messageArr.join('');
    }
    
    if(command.includes('Reverse')){
      let sub = command.split(':|:')[1];
      
      if(message.includes(sub)){
        let index = message.indexOf(sub);
        sub = sub.split('').reverse().join('');
        message = message.slice(0, index) + sub;
        console.log(message)
      }
    }
    
    if(command.includes('ChangeAll')){
      let [text, sub, replacement] = command.split(':|:');
      message = message.replaceAll(sub, replacement);
    }
    command = array.shift();
  }
}
solve([
  'heVVodar!gniV',
  'ChangeAll:|:V:|:l',
  'Reverse:|:!gnil',
  'InsertSpace:|:5',
  'Reveal'
]
)