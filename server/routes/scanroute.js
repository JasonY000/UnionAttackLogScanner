const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DirController = require('../controller/createDirController');
const multer = require('multer');

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   const dir = path.join(__dirname, `../images/temp`);
  //   if (!fs.existsSync(dir)) {
  //     fs.mkdirSync(dir);
  //   }
  //   cb(null, dir);
  // },
  destination: `./server/images/temp`,
  filename: (req, file, cb) => {
    // Customize the filename if needed Date.now() + '-' +
    cb(null, new Date() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  '/upload',
  upload.array('img', 20),
  DirController.remove,
  (req, res) => {
    console.log(req.files, req.body);
    return res.status(200).json('hello');
  }
);

module.exports = router;
