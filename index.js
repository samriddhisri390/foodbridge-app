const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/ngo', require('./routes/ngo'));
app.use('/api/volunteer', require('./routes/volunteer'));
app.use('/api/sos', require('./routes/sos'));

app.get('/', (req, res) => {
  res.json({ message: 'Plate2Purpose Backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});