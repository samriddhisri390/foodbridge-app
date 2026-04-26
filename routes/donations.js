const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/add', async (req, res) => {
  const { foodName, quantity, pickupAddress, donorId, freshUntil } = req.body;
  try {
    const donation = await db.collection('donations').add({
      foodName, quantity, pickupAddress, donorId, freshUntil,
      status: 'available',
      createdAt: new Date()
    });
    res.json({ message: 'Donation added!', id: donation.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const snapshot = await db.collection('donations').get();
    const donations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/nearby', async (req, res) => {
  try {
    const snapshot = await db.collection('donations')
      .where('status', '==', 'available').get();
    const donations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/expiring', async (req, res) => {
  try {
    const now = new Date();
    const in2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const snapshot = await db.collection('donations')
      .where('status', '==', 'available').get();
    const expiring = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(d => new Date(d.freshUntil) <= in2Hours);
    res.json(expiring);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/track/:id', async (req, res) => {
  const { lat, lng, status } = req.body;
  try {
    await db.collection('donations').doc(req.params.id).update({
      currentLat: lat, currentLng: lng,
      status: status, updatedAt: new Date()
    });
    res.json({ message: 'Location updated!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/track/:id', async (req, res) => {
  try {
    const doc = await db.collection('donations').doc(req.params.id).get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    await db.collection('donations').doc(req.params.id).update({
      status: req.body.status
    });
    res.json({ message: 'Status updated!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;