const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    ProductsModel.save(req.body)
    res.redirect('/products')
})

module.exports = router;