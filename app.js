const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;

        let products = await productManager.getProducts();

        if (limit) {
        const parsedLimit = parseInt(limit, 10);
        products = products.slice(0, parsedLimit);
    }

    res.json({ products });
        } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
        }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10);

        const product = await productManager.getProductById(productId);

        if (product) {
        res.json({ product });
        } else {
        res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});

