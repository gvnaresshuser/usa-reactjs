import express from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

//CHANGE products TO productsauth

// Get all products (public or protected based on your needs)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productsauth');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a product (protected)
router.post('/', verifyToken, async (req, res) => {
    console.log('Incoming product:', req.body);

    // 🔐 Check for 'write' permission
    if (!req.user.permissions?.includes('write')) {
        return res.status(403).json({ error: 'You do not have write access' });
    }

    const { name, price, description, image } = req.body;

    if (!name || !description || isNaN(price) || !image) {
        return res.status(400).json({ error: 'Invalid product data' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO productsauth (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, description, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update a product (protected)
router.put('/:id', verifyToken, async (req, res) => {
    const { name, price, description, image } = req.body;
    const { id } = req.params;
    try {
        await pool.query(
            'UPDATE productsauth SET name = $1, price = $2, description = $3, image = $4 WHERE id = $5',
            [name, price, description, image, id]
        );
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product (protected)
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM productsauth WHERE id = $1', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
