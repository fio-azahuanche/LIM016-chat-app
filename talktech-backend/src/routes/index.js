const { Router } = require('express');

const router = Router();

const {
  getUsers,
  createUsers,
  getUsersById,
  deleteUser,
  updateUser,
} = require('../controller/index.controller');

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get('/users/:id_user', getUsersById);
router.delete('/users/:id_user', deleteUser);
router.put('/users/:id_user', updateUser);

module.exports = router;
