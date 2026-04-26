const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/pickup/:id', async (req, res) => {
  try {
    await db.collection('donations').doc(req.params.id).update({
      status: 'pickedup',
      volunteerId: req.body.volunteerId,
      pickedAt: new Date()
    });
    res.json({ message: 'Picked up!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/deliver/:id', async (req, res) => {
  try {
    await db.collection('donations').doc(req.params.id).update({
      status: 'delivered',
      deliveredAt: new Date()
    });
    res.json({ message: 'Delivered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;