const express = require('express');
const router = express.Router();
const db = require('../db/mysql');

// Home
router.get('/', async(req, res) => {
    const [rows] = await db.query('SELECT * FROM products');
    res.render('products', { products: rows });
});

// Add product
router.post('/add', async(req, res) => {
    const { name, price, quantity } = req.body;
    await db.query(
        'INSERT INTO products(name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity]
    );
    res.redirect('/');
});

// Delete product
router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;

    await db.query(
        'DELETE FROM products WHERE id = ?', [id]
    );

    res.redirect('/');
});

// Update product
router.post('/update', async(req, res) => {
    const { id, name, price, quantity } = req.body;

    await db.query(
        'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, id]
    );

    res.redirect('/');
});


// Find by ID
router.get('/search', async(req, res) => {
    const { keyword } = req.query;

    const [products] = await db.query(
        'SELECT* FROM products WHERE name LIKE ?', [`%${keyword}%`]
    );

    res.render('products', { products });
});

module.exports = router;