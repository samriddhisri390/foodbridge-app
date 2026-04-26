const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase');

router.post('/register', async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const user = await admin.auth().createUser({ email, password, displayName: name });
    await db.collection('users').doc(user.uid).set({
      name, email, role, createdAt: new Date()
    });
    res.json({ message: 'User registered!', uid: user.uid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/user/:uid', async (req, res) => {
  try {
    const user = await db.collection('users').doc(req.params.uid).get();
    res.json(user.data());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;