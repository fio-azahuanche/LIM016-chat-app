const { Router } = require('express');

const router = Router();

const {
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
  updateUserValidate,
} = require('../controller/index.controller');

const { createUsers } = require('../controller/login');

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get('/users/:id_user', getUsersById);
router.delete('/users/:id_user', deleteUser);
router.put('/users/:id_user', updateUser);
router.get('/users/confirm/:token_confirm', updateUserValidate); // redireccion por utilizar ancla
module.exports = router;
