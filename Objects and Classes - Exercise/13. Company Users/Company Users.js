function solve(array){
  let map = new Map()
  array.forEach(user => {
    let [companyName, employeeId] = user.split(' -> ');
    if(!map.has(companyName)){
      map.set(companyName, new Set);
      map.get(companyName).add(employeeId);
    } else {
      map.get(companyName).add(employeeId);
    }
  });

  let sorted = [...map].sort();

  sorted.forEach(([companyName, employeeIds]) => {
    console.log(companyName);
    for(let id of employeeIds){
      console.log(`-- ${id}`);
    }
  });
}
solve([
  'SoftUni -> AA12345',
  'SoftUni -> CC12344',
  'Lenovo -> XX23456',
  'SoftUni -> AA12345',
  'Movement -> DD11111'
  ]  
  )