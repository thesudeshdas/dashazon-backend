const express = require('express')
const router = express.Router()

const product_controller = require('../controllers/product.controller')
const Product  = require('../models/product.model')

router.get('/', product_controller.product_list_get)
router.post('/', product_controller.product_create_post)

router.param('productId', product_controller.product_find_list_param)

router.get('/:productId', product_controller.product_detail_get)

module.exports = router
