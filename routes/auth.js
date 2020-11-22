/*
  path: api/v1/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/new', [
  check('name', 'field name is mandatory').not().isEmpty(),
  check('password',)
    .not().isEmpty().withMessage('field password is mandatory')
    .isLength({ min: 8 }).withMessage('password must have minimum 8 characters'),
  check('email', 'field email is mandatory').isEmail(),
  validateFields
], createUser);

module.exports = router;