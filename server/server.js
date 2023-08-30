require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const folderPath =
  '/Users/jasony000/Desktop/UnionAttackLogScanner/src/nikkeLog';
const app = express();

app.use(cors());

app.get('/api/images', async (req, res) => {
  try {
    const files = await fs.readdir(folderPath);
    const imageFiles = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
    });
    console.log(imageFiles);
    return res.json(imageFiles);
  } catch (error) {
    console.error('Error reading folder:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/', (req, res) => {
  console.log('testing');
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app;
