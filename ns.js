const ProductManager = require('./ProductManager');

const productManager = new ProductManager('productos.json');

productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 10.99,
    thumbnail: 'ruta-imagen-1.jpg',
    code: 'P001',
    stock: 100
});

const products = productManager.getProducts();
console.log(products);

const product = productManager.getProductById(1);
console.log(product);

productManager.updateProduct(1, { price: 19.99 });
console.log(productManager.getProductById(1));

productManager.deleteProduct(1);
console.log(productManager.getProducts());
