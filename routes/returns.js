const express = require('express');
const router = express.Router();

//Get all genres
router.post('/', async (req, res) => {
    res.status(401).send('unauthorized');
});

module.exports = router;
