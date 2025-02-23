function solve (array) {
  let products = {};

  array.forEach(element => {
    let [name, price] = element.split(' : ');
    price = Number(price);

    let initial = name[0].toUpperCase();

    if(!products[initial]){
      products[initial] = [];
    }
    products[initial].push({name, price});
  });

  let sortedLetters = Object.keys(products).sort();

  sortedLetters.forEach(letter => {
    console.log(letter);

    products[letter].sort((a, b) => a.name.localeCompare(b.name));
    products[letter].forEach(product => {
      console.log(`  ${product.name}: ${product.price}`);
    });
  })
}

solve([
  'Appricot : 20.4',
  'Fridge : 1500',
  'TV : 1499',
  'Deodorant : 10',
  'Boiler : 300',
  'Apple : 1.25',
  'Anti-Bug Spray : 15',
  'T-Shirt : 10'
  ]
  );