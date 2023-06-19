const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log('Todos los campos son obligatorios.');
        return;
        }

        const isCodeDuplicate = this.products.some((p) => p.code === product.code);
        if (isCodeDuplicate) {
        console.log('El campo "code" ya existe en otro producto.');
        return;
        }

        const id = this.products.length + 1;
        product.id = id;

        this.products.push(product);

        this.saveToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
        console.log('Producto no encontrado.');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
        console.log('Producto no encontrado.');
        return;
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

        this.saveToFile();
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
        console.log('Producto no encontrado.');
        return;
        }

        this.products.splice(productIndex, 1);

        this.saveToFile();
    }

    saveToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
    }

module.exports = ProductManager;
