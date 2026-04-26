const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/create', async (req, res) => {
  const { userId, location, message, urgency } = req.body;
  try {
    const sos = await db.collection('sos').add({
      userId, location, message, urgency,
      status: 'pending',
      createdAt: new Date()
    });
    res.json({ message: 'SOS created!', id: sos.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const snapshot = await db.collection('sos')
      .where('status', '==', 'pending').get();
    const sos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(sos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/resolve/:id', async (req, res) => {
  try {
    await db.collection('sos').doc(req.params.id).update({
      status: 'resolved',
      resolvedAt: new Date()
    });
    res.json({ message: 'SOS resolved!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;