const { Router } = require('express');

const router = Router();

const {
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
  updateUserValidate,
  updateImgProfile,
} = require('../controller/index.controller');

const { createUsers, loginUser } = require('../controller/login');

router.get('/users', getUsers);
router.post('/users', createUsers);
router.post('/users/login', loginUser);

router.get('/users/:id_user', getUsersById);
router.delete('/users/:id_user', deleteUser);
router.put('/users/:id_user', updateUser);
router.get('/users/confirm/:token_confirm', updateUserValidate); // redireccion por utilizar ancla
router.put('/user_profile/:id_user', updateImgProfile);

module.exports = router;
