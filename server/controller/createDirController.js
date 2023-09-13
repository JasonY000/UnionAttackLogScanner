const fs = require('fs');
const path = require('path');

const dirController = {};

dirController.create = (req, res, next) => {
  try {
    const { userID } = req.body;
    const dir = path.join(__dirname, `../images/${userID}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    next();
  } catch (err) {
    next({
      log: 'error when creating folder',
      status: 500,
      message: { err },
    });
  }
};
dirController.move = async (req, res, next) => {
  try {
  } catch (err) {}
};

dirController.remove = async (req, res, next) => {
  try {
    const directory = path.join(__dirname, `../images/temp`);
    const files = await fs.promises.readdir(directory);
    for (const file of files) {
      //console.log('removing', file);
      await fs.promises.unlink(path.join(directory, file));
    }
    next();
  } catch (err) {
    next({
      log: 'error when removing img',
      status: 500,
      message: { err: err },
    });
  }
};
module.exports = dirController;
