function ladybugs(array){

  const fieldSize = Number(array[0]);
  const initialIndexes = array[1].split(' ');
  const field = [];
  
  for (let i = 0; i < fieldSize; i++){
    field[i] = initialIndexes.includes(i.toString()) ? 1 : 0;
  }

  for (let i = 2; i < array.length; i++){
    let command = array[i].split(' ');
    let bugCurrentIndex = Number(command[0]);
    let bugFlightDirection = command[1];
    let bugFlyLength = Number(command[2]);

    let isFieldTaken = field[bugCurrentIndex] === 1 ? true : false;

    if(isFieldTaken){
      field[bugCurrentIndex] = 0;
    } else {
      continue;
    }

    bugFlyLength = bugFlightDirection === 'right' ? bugFlyLength : bugFlyLength * -1;

    let targetField = bugCurrentIndex + bugFlyLength;

    if(targetField < 0 || targetField >= field.length){
      continue;
    }

    while (targetField >= 0 && targetField < field.length) {
      if (field[targetField] === 0) {
        field[targetField] = 1;
        break;
      }
      targetField += bugFlyLength;
    }
  }
  console.log(field.join(' '));
}
ladybugs([5, '3',
  '3 left 2',
  '1 left -2'    
]);
