const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('productos.json');


app.get('/products', (req, res) => {
    const { limit } = req.query;

    let products = productManager.getProducts();

    if (limit) {
        const parsedLimit = parseInt(limit, 10);
        products = products.slice(0, parsedLimit);
    }

    res.json({ products });
});


app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid, 10);

    const product = productManager.getProductById(productId);

    if (product) {
        res.json({ product });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
