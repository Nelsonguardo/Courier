const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');

const { UserList, UserCreate, login } = require('../controllers/userController');

router.get('/', check.auth ,UserList);
router.post('/', UserCreate);
router.post('/login', login);

module.exports = router;