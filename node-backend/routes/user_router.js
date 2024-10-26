const express = require('express')
const { register, login } = require('../controllers/user_controller')
const router = express.Router()

router.post('/sign-up', register);
router.post('/log-in', login);
module.exports = router;