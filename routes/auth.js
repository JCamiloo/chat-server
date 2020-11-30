/*
  path: api/v1/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/new', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password',)
    .not().isEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
  check('email', 'El correo es obligatorio').isEmail(),
  validateFields
], createUser);

router.post('/', [
  check('password',)
  .not().isEmpty().withMessage('La contraseña es obligatoria')
  .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
  check('email', 'El correo es obligatorio').isEmail(),
], login);


module.exports = router;