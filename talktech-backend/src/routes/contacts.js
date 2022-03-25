const { Router } = require('express');

const router = Router();

const { getContacts } = require('../controller/contacts');

router.get('/contacts/:id_user', getContacts);

module.exports = router;
