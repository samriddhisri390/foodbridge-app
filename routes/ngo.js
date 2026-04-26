const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.get('/available', async (req, res) => {
  try {
    const snapshot = await db.collection('donations')
      .where('status', '==', 'available').get();
    const donations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/accept/:id', async (req, res) => {
  try {
    await db.collection('donations').doc(req.params.id).update({
      status: 'accepted',
      ngoId: req.body.ngoId,
      acceptedAt: new Date()
    });
    res.json({ message: 'Donation accepted!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;