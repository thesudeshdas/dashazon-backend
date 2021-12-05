const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.user_list_get);
router.post('/', user_controller.user_create_post);

router.param('userId', user_controller.user_find_list_param);

router.get('/:userId', user_controller.user_detail_get);

router.post('/sign-in', user_controller.user_sign_in_post);

module.exports = router;
