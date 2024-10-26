const express = require('express')
const { getFormData, getDomainsData } = require('../controllers/forms_controller')
const auth = require('../middleware/validate_token')
const authorize = require('../middleware/authorize_token')
const router = express.Router()

router.get('/data', getFormData);
router.get('/p-data', auth, authorize("admin"), getFormData);
router.get('/domains', auth, authorize("admin"), getDomainsData);
module.exports = router;