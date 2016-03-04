'use strict';

// function to calculate response time by ms
var responseTime = function (obj) {
    if (!obj) {
        return process.hrtime();
    } else {
        var diff = process.hrtime(obj);
        return (diff[0] * 1e9 + diff[1]) / 1e6;
    }
};

module.exports = responseTime;
