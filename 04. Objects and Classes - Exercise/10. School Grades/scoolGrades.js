function solve(array){
  let map = new Map();

  array.forEach(element => {
    let tokens = element.split(' ');
    let name = tokens.shift();
    let grades = tokens.map(Number);

    if(!map.has(name)){
      map.set(name, []);
      for(let grade of grades){
        map.get(name).push(grade);
      }
    }
  });

  let sorted = Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  for(let kvp of sorted){
    console.log(`${kvp[0]}: ${avgGrades(kvp[1])}`);
  }

  function avgGrades(grades){
    let result = 0
    let index = grades.length;
    grades.forEach(grade => {
      result += Number(grade);
    });
    result = result / index;
    return result.toFixed(2);
  }
}

solve(['Lilly 4 6 6 5',
  'Tim 5 6',
  'Tammy 2 4 3',
  'Tim 6 6']
  )