const express = require('express')
const router = express()
const controllers = require('../controllers/index')

router.get('/', controllers.landing_page)
router.get('/db_update', controllers.db_update)
router.get('/appDetails', controllers.details_page)

module.exports = router