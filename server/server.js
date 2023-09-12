require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const scanRoute = require('./routes/scanroute.js');
const folderPath = path.join(path.dirname(__dirname), 'src', 'nikkeLog');
const testPath = path.join(path.dirname(__dirname), '__test__', 'testImage');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/scan', scanRoute);

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/', express.static(path.join(__dirname, '../build/')));
}

app.get('/images', async (req, res) => {
  try {
    const files = await fs.readdir(folderPath);
    const imageFiles = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
    });
    return res.json(imageFiles);
  } catch (error) {
    console.error('Error reading folder:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.get('/api/test', async (req, res) => {
  try {
    const files = await fs.readdir(testPath);
    const imageFiles = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
    });
    return res.json(imageFiles);
  } catch (error) {
    console.error('Error reading folder:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app;
