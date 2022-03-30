const { Router } = require('express');

const router = Router();
//
const {
  addContact,
  getCanals,
  getHistoryMsg,
} = require('../controller/contacts');
//

const { getContacts } = require('../controller/contacts');

router.get('/contact/:id_user', getContacts);
router.post('/contact', addContact);
router.get('/canals/:id_user', getCanals);
router.get('/history/:idCanal', getHistoryMsg);

module.exports = router;
