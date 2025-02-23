function solve () {
  class Storage{
    constructor(capacity){
      this.capacity = capacity;
      this.storage = [];
      this.totalCost = 0;
    }

    addProduct(product) {
      if(this.capacity >= product.quantity){
        this.storage.push(product);
        this.capacity -= product.quantity;
        this.totalCost += product.price * product.quantity;
      }
      else {
        console.log('Not enough capacity to add this product.');
      }
    }

    getProducts() {
      return this.storage.map(product => JSON.stringify(product)).join('\n');
    }
  }
}