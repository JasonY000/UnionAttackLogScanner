const fs = require('fs');
const path = require('path');

const cleanUpController = {};

cleanUpController.onlyName = (req, res, next) => {
  try {
    next();
  } catch (err) {
    next({
      log: 'error in clearUp.onlyName',
      status: 500,
      message: { err: 'error in clearUp.onlyName' },
    });
  }
};

module.exports = cleanUpController;
