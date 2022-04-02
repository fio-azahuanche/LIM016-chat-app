const { Router } = require('express');

const router = Router();
//
const {
  addContact,
  getHistoryMsg,
  addChannel,
  getPrivateChannel,
} = require('../controller/contacts');
//

const { getContacts } = require('../controller/contacts');

router.get('/contact/:id_user', getContacts);
router.post('/contact', addContact);
router.get('/canals/:id_user', getPrivateChannel);
// router.get('/private-channel/:id_user', getPrivateChannel);
router.get('/group-channel/:id_user', getPrivateChannel);
router.get('/history/:idCanal', getHistoryMsg);
router.post('/channel-group', addChannel);

module.exports = router;
