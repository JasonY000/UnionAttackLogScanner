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

cleanUpController.finalize = (req, res, next) => {
  try {
    //console.log(req.body);
    const memberList = req.body.members;
    const allData = req.body.data.flat();

    const filtered = [];
    const filterReg4 = /[,]/g;

    allData.forEach((char) => {
      if (
        memberList[char] !== undefined &&
        typeof filtered[filtered.length - 1] !== 'string'
      ) {
        filtered.push(memberList[char]);
      } else if (
        filterReg4.test(char) &&
        typeof filtered[filtered.length - 1] === 'string'
      ) {
        filtered.push(parseFloat(char.replace(/[, ]/g, '')));
      } else if (char.length > 5 && /^\d+$/.test(char)) {
        filtered.push(parseFloat(char));
      }
    });

    const track = {};
    for (let i = 0; i < filtered.length; i += 2) {
      if (track[filtered[i]] === undefined) {
        track[filtered[i]] = { attack: 1, damage: filtered[i + 1] };
      } else {
        track[filtered[i]].attack++;
        track[filtered[i]].damage = track[filtered[i]].damage +=
          filtered[i + 1];
      }
    }
    res.locals.result = track;
    next();
  } catch (err) {
    next({
      log: 'error in clearUp.finalize',
      status: 500,
      message: { err: 'error in clearUp.onlyName' },
    });
  }
};
module.exports = cleanUpController;
