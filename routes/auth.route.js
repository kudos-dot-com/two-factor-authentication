const AuthController = require('../controllers/auth.controllers')
const router= require('express').Router()

router.post('/generateOtp',AuthController.sendOtp)
router.post('/verifyotp',AuthController.verifyOtp)

module.exports = router;