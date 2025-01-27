function solve(array){
  
 array.sort((a,b) => b - a);

 let sortedArray = [];

 while (array.length > 0){
  sortedArray.push(array.shift());
   
  if (array.length > 0){
    sortedArray.push(array.pop());
   }
 }

 console.log(sortedArray.join(' '));
}
solve([94, 1, 69, 63, 31, 52, 18]); // po-pravilno



function solve2(array){
  
let length = array.length;

let sortedArr = [];
while(array.length > 0){
  let max = Math.max(...array);
  let min = Math.min(...array);

  sortedArr.push(max);

  if(sortedArr.length === length){
    break;
  }

  sortedArr.push(min);
  
  array.splice(array.indexOf(max), 1);
  array.splice(array.indexOf(min), 1);
  if(array.length === 0){
    break;
  }
}
console.log(sortedArr.join(' '));
}

solve2([94, 1, 69, 63, 31, 52, 18])