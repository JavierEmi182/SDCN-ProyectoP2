'use strict';

const clearenceCodes = ['CLI-01', 'WLK-02', 'ADM-03', 'ANYONE'];

const clearenceType = {
  CLIENTE: clearenceCodes[0],
  PASEADOR: clearenceCodes[1],
  ADMIN: clearenceCodes[2],
  ANYONE: clearenceCodes[3]
};

const clearenceLimits = {
  'CLI-01': 25,
  'WLK-02': 35,
  'ADM-03': 60,
  ANYONE: 10
};

module.exports = { clearenceType, clearenceLimits, clearenceCodes };
