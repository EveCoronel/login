const express = require('express');
const productsController = require('../controllers/products.controller');
const { webAuth } = require('../middlewares/auth');
const router = express.Router();
const authRoutes = require('./auth/auth.routers')
const productsRoutes = require('./products/products.routers')
const path = require('path')

router.use('/auth', authRoutes)

router.get('/', webAuth, async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/home', webAuth, async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/home.html'));
});

router.get('/register', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/signup.html'));
});

router.post('/products', productsRoutes)
router.get('*', (req, res) => {
    res.status(404).send('Página no encontrada')
})


module.exports = router;