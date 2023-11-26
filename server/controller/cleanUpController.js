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
      message: {err: 'error in clearUp.onlyName'},
    });
  }
};

cleanUpController.finalize = (req, res, next) => {
  try {
    //console.log(req.body);
    const memberList = req.body.members;
    const allData = [...req.body.data.flat()];
    console.log(allData);
    const filtered = [];
    const filterReg4 = /[,]/g;
    allData.forEach((char) => {
      let temp = char;
      //console.log(temp, /^\d+$/.test(temp));
      if (
        memberList[temp] &&
        typeof filtered[filtered.length - 1] === 'string'
      ) {
        let closest = filtered.indexOf(memberList[temp]);
        if (closest === undefined || closest === -1) {
          filtered.push(70000000, memberList[temp]);
        } else {
          filtered.push(filtered[1], memberList[temp]);
        }
      } else if (
        //last in array is a number
        memberList[temp] !== undefined &&
        typeof filtered[filtered.length - 1] !== 'string'
      ) {
        filtered.push(memberList[temp]);
      } else if (
        //last in array is a name
        filterReg4.test(temp) &&
        typeof filtered[filtered.length - 1] === 'string'
      ) {
        filtered.push(+temp.replace(/[,. a-zA-Z]+/g, ''));
      } else if (
        typeof filtered[filtered.length - 1] === 'string' &&
        temp.length >= 5 &&
        /^\d+$/.test(temp)
      ) {
        //its a number with no ,
        filtered.push(+temp);
      }
    });
    //console.log(filtered);
    const track = {};
    for (let i = 0; i < filtered.length; i += 2) {
      if (track[filtered[i]] === undefined) {
        track[filtered[i]] = {attack: 1, damage: filtered[i + 1]};
      } else {
        track[filtered[i]].attack++;
        track[filtered[i]].damage = track[filtered[i]].damage +=
          filtered[i + 1];
      }
    }
    //console.log(track);
    res.locals.result = track;
    next();
  } catch (err) {
    next({
      log: 'error in clearUp.finalize',
      status: 500,
      message: {err: 'error in clearUp.onlyName'},
    });
  }
};
module.exports = cleanUpController;
