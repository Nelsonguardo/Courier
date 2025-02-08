const express = require('express');
const router = express.Router();

const { UserList, UserCreate, login } = require('../controllers/userController');

router.get('/', UserList);
router.post('/', UserCreate);
router.post('/login', login);

module.exports = router;