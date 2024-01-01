const fs = require('fs');
const path = require('path');
const scanImage = require('../functions/scanImage');
const scanController = {};

scanController.configScan = async (req, res, next) => {
  try {
    const directory = path.join(__dirname, `../images/temp`);
    const imageArr = await fs.promises.readdir(directory);
    const scanTextArr = await scanImage(imageArr);
    res.locals.result = scanTextArr[0];
    res.locals.originScan = scanTextArr[1];
    next();
  } catch (err) {
    next({
      log: 'error when configscan img',
      status: 500,
      message: {err: 'error when configscan img'},
    });
  }
};

module.exports = scanController;
