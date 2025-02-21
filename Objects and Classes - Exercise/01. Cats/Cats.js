function solve(array) {

  class Cat {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    meow() {
      console.log(`${this.name}, age ${this.age} says Meow`);
    }
  }

  let result = [];
  array.forEach(element => {
    [catName, age] = element.split(' ');
    const cat = new Cat(catName, age)
    cat.meow();
    result.push(cat);
  });
}

solve(['Mellow 2', 'Tom 5']);