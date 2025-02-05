function solve(array){

 array.sort((a, b) => {
  if(a.length !== b.length){
    return a.length - b.length;
  }
  return a.toLowerCase().localeCompare(b.toLowerCase());
});
 array.forEach(element => {
  console.log(element);
 });
}

solve(['alpha', 'beta', 'bata' , 'gamma']);