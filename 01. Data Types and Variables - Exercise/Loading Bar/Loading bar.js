function loadingBar(number){
  let array = [];
  let display = '';
  let percent = number;
  for(let i = 0; i < 10; i++){
    array.push('.');
  }
  for(let i = 0; i < array.length; i++){ 
    if(percent === 0){
      break;
    }
    if(percent === 10){
      array[i] = "%";
      break;
    }
    if(percent - 10 !== 0){
      array[i] = "%";
      percent -= 10;
    }
  }
  let text = array.join('');
  display = `${number}% [${text}]`;

  if(number === 100){
    display = `[${text}]`;
    console.log(`${number}% Complete!`);
    console.log(display);
  } else{
    display = `${number}% [${text}]`;
    console.log(display);
    console.log("Still loading...");
  }
}
loadingBar(0)