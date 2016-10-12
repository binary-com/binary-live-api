(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["binary-live-api"] = factory();
	else
		root["binary-live-api"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateAsLocalISOString = __webpack_require__(8);

var _dateAsLocalISOString2 = _interopRequireDefault(_dateAsLocalISOString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (date) {
    return (0, _dateAsLocalISOString2.default)(date).slice(0, 10);
};

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (x) {
    var secsAway = x * 60 * 60 * 24;
    return Math.floor(Date.now() / 1000) + secsAway;
};

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (epoch) {
    return new Date(epoch * 1000);
};

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (duration, unit) {
    switch (unit) {
        case 't':
        case 's':
            return duration;
        case 'm':
            return 60 * duration;
        case 'h':
            return 3600 * duration;
        case 'd':
            return 86400 * duration;
        default:
            throw new Error('Duration unit not valid: ' + unit + ', only allow [\'t\', \'s\', \'m\', \'h\', \'d\']');
    }
};

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr, key) {
    var result = {};
    arr.forEach(function (ele) {
        var kv = ele[key];
        if (!result[kv]) {
            result[kv] = [];
        }
        result[kv].push(ele);
    });
    return result;
};

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = [{ value: 'CALL', text: 'Rise', img: 'img/trade-call.svg', ticks: true, barrier: false }, { value: 'PUT', text: 'Fall', img: 'img/trade-put.svg', ticks: true, barrier: false }, { value: 'HIGHER', text: 'Higher', img: 'img/trade-higher.svg', ticks: false, barrier: false }, { value: 'LOWER', text: 'Lower', img: 'img/trade-lower.svg', ticks: false, barrier: false }, { value: 'DIGITMATCH', text: 'Digit Match', img: 'img/trade-digitmatch.svg', ticks: true, barrier: true }, { value: 'DIGITDIFF', text: 'Digit Differs', img: 'img/trade-digitdiff.svg', tick: true, barrier: true }, { value: 'DIGITOVER', text: 'Digit Over', img: 'img/trade-digitover.svg', tick: true, barrier: true }, { value: 'DIGITUNDER', text: 'Digit Under', img: 'img/trade-digitunder.svg', tick: true, barrier: true }, { value: 'DIGITEVEN', text: 'Digit Even', img: 'img/trade-digiteven.svg', tick: true, barrier: false }, { value: 'DIGITODD', text: 'Digit Odd', img: 'img/trade-digitodd.svg', tick: true, barrier: false }, { value: 'ASIANU', text: 'Asian Up', img: 'img/trade-asianu.svg', ticks: true, barrier: false }, { value: 'ASIAND', text: 'Asian Down', img: 'img/trade-asiand.svg', ticks: true, barrier: false }, { value: 'EXPIRYRANGE', text: 'Ends Between', img: 'img/trade-expiryrange.svg', ticks: false, barrier: false }, { value: 'EXPIRYMISS', text: 'Ends Outside', img: 'img/trade-expirymiss.svg', ticks: false, barrier: false }, { value: 'RANGE', text: 'Stays Between', img: 'img/trade-range.svg', ticks: false, barrier: false }, { value: 'UPORDOWN', text: 'Goes Outside', img: 'img/trade-upordown.svg', ticks: false, barrier: false }, { value: 'ONETOUCH', text: 'Touches', img: 'img/trade-onetouch.svg', ticks: false, barrier: false }, { value: 'NOTOUCH', text: 'Does Not Touch', img: 'img/trade-notouch.svg', ticks: false, barrier: false }, { value: 'SPREADU', text: 'Spread Long', img: 'img/trade-spreadu.svg', ticks: false, barrier: false }, { value: 'SPREADD', text: 'Spread Short', img: 'img/trade-spreadu.svg', ticks: false, barrier: false }];

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (barrier, entrySpot, lastTickQuote) {
    return +barrier + (+entrySpot || lastTickQuote);
};

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (contract, lastTickQuote) {
    var barrierEntryName = arguments.length <= 2 || arguments[2] === undefined ? 'barrier' : arguments[2];

    var barrierValue = +contract[barrierEntryName];
    if (!barrierValue) {
        return lastTickQuote;
    }
    if (contract.barrierType !== 'relative') {
        return barrierValue;
    }
    if (typeof contract.entry_spot === 'undefined' && typeof lastTickQuote === 'undefined') {
        throw new Error('Relative barrier can not be calculated');
    }
    return barrierValue + (+contract.entry_spot || lastTickQuote);
};

/***/ },
/* 8 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (date) {
    return new Date(date - date.getTimezoneOffset() * 60 * 1000).toISOString();
};

/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return Math.floor(Date.now() / 1000);
};

/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (a, b) {
    var aH = +a.slice(0, 2);
    var aM = +a.slice(3, 5);
    var aS = +a.slice(6);

    var bH = +b.slice(0, 2);
    var bM = +b.slice(3, 5);
    var bS = +b.slice(6);

    if (aH !== bH) {
        return aH > bH;
    } else if (aM !== bM) {
        return aM > bM;
    }
    return aS > bS;
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xDayEpoch = __webpack_require__(1);

var _xDayEpoch2 = _interopRequireDefault(_xDayEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return (0, _xDayEpoch2.default)(-1);
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _durationSecHelper = __webpack_require__(21);

var _durationSecHelper2 = _interopRequireDefault(_durationSecHelper);

var _extractMinMaxInUnits = __webpack_require__(23);

var _extractMinMaxInUnits2 = _interopRequireDefault(_extractMinMaxInUnits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contracts, type) {
    if (type.indexOf('SPREAD') > -1) {
        return [];
    }

    var tickContracts = contracts.filter(function (c) {
        return c.min_contract_duration.slice(-1) === 't';
    });
    var tickDuration = tickContracts.length > 0 ? { min: 5, max: 10, unit: 't' } : undefined;

    var nonTickContracts = contracts.filter(function (c) {
        return c.min_contract_duration.slice(-1) !== 't';
    });
    if (nonTickContracts.length === 0) {
        return tickDuration ? [tickDuration] : [];
    }
    var nonTickMinSec = nonTickContracts.map(function (c) {
        return (0, _durationSecHelper2.default)(c.min_contract_duration);
    }).filter(function (d) {
        return !!d;
    }).reduce(function (a, b) {
        return Math.min(a, b);
    });

    var nonTickMaxSec = nonTickContracts.map(function (c) {
        return (0, _durationSecHelper2.default)(c.max_contract_duration);
    }).filter(function (d) {
        return !!d;
    }).reduce(function (a, b) {
        return Math.max(a, b);
    });

    var nonTicksDuration = (0, _extractMinMaxInUnits2.default)(nonTickMinSec, nonTickMaxSec);
    if (tickDuration) {
        nonTicksDuration.unshift(tickDuration);
    }

    return nonTicksDuration;
};

/***/ },
/* 13 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr1, arr2) {
    var eq = arguments.length <= 2 || arguments[2] === undefined ? function (a, b) {
        return a === b;
    } : arguments[2];

    var len1 = arr1.length;
    var len2 = arr2.length;
    var lengthDiff = Math.abs(len1 - len2);

    switch (lengthDiff) {
        case 0:
            if (len1 === 0) return false;
            if (len1 === 1) return !eq(arr1[0], arr2[0]);

            return eq(arr1[arr1.length - 1], arr2[arr2.length - 2]) || eq(arr1[arr1.length - 2], arr2[arr2.length - 1]);

        case 1:
            if (len1 === 0 || len2 === 0) return true;

            return eq(arr1[arr1.length - 1], arr2[arr2.length - 2]) || eq(arr1[arr1.length - 2], arr2[arr2.length - 1]);

        default:
            return false;
    }
};

/***/ },
/* 14 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LiveEvents = function () {
    function LiveEvents() {
        _classCallCheck(this, LiveEvents);

        this.messageHandlers = {};
    }

    _createClass(LiveEvents, [{
        key: 'emitSingle',
        value: function emitSingle(msgType, msgData) {
            var handlers = this.messageHandlers[msgType] || [];
            handlers.forEach(function (handler) {
                handler(msgData);
            });
        }
    }, {
        key: 'emitWildcard',
        value: function emitWildcard(msgData) {
            var handlers = this.messageHandlers['*'] || [];
            handlers.forEach(function (handler) {
                handler(msgData);
            });
        }
    }, {
        key: 'emit',
        value: function emit(msgType, msgData) {
            this.emitSingle(msgType, msgData);
            this.emitWildcard(msgData);
        }
    }, {
        key: 'on',
        value: function on(msgType, callback) {
            if (!this.messageHandlers[msgType]) {
                this.messageHandlers[msgType] = [callback];
            } else {
                this.messageHandlers[msgType].push(callback);
            }
        }
    }, {
        key: 'ignoreAll',
        value: function ignoreAll(msgType) {
            delete this.messageHandlers[msgType];
        }
    }]);

    return LiveEvents;
}();

exports.default = LiveEvents;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.helpers = exports.autoAdjustGetData = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getDataForSymbol = getDataForSymbol;
exports.getDataForContract = getDataForContract;

var _binaryUtils = __webpack_require__(25);

var responseSizeLimit = 700;

var granularities = [60, 120, 180, 300, 600, 900, 1800, 3600, 7200, 14400, 28800, 86400];

var ohlcDataToTicks = function ohlcDataToTicks(candles) {
    return candles.map(function (data) {
        return { quote: +data.open, epoch: +data.epoch };
    });
};

var autoAdjustGetData = exports.autoAdjustGetData = function autoAdjustGetData(api, symbol, start, end) {
    var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'ticks';
    var subscribe = arguments[5];
    var extra = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

    var secs = end - start;
    var ticksCount = secs / 2;
    if (ticksCount >= responseSizeLimit || style === 'candles') {
        var _ret = function () {
            var idealGranularity = secs / responseSizeLimit;
            var finalGranularity = 60;
            granularities.forEach(function (g, i) {
                if (idealGranularity > g && idealGranularity <= granularities[i + 1]) {
                    finalGranularity = granularities[i + 1];
                }
            });
            finalGranularity = Math.min(86400, finalGranularity);

            return {
                v: api.getTickHistory(symbol, {
                    start: start,
                    end: end,
                    adjust_start_time: 1,
                    count: responseSizeLimit,
                    style: 'candles',
                    granularity: finalGranularity,
                    subscribe: subscribe ? 1 : undefined
                }).then(function (r) {
                    if (style === 'ticks') {
                        return _extends({}, extra, {
                            ticks: ohlcDataToTicks(r.candles),
                            symbol: symbol
                        });
                    }
                    return _extends({}, extra, {
                        candles: r.candles,
                        symbol: symbol
                    });
                })
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return api.getTickHistory(symbol, {
        start: start,
        end: end,
        adjust_start_time: 1,
        count: responseSizeLimit,
        style: 'ticks',
        subscribe: subscribe ? 1 : undefined
    }).then(function (r) {
        var ticks = r.history.times.map(function (t, idx) {
            var quote = r.history.prices[idx];
            return { epoch: +t, quote: +quote };
        });
        return _extends({}, extra, {
            ticks: ticks,
            symbol: symbol
        });
    });
};

function getDataForSymbol(api, symbol) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ticks';
    var subscribe = arguments[4];

    var end = (0, _binaryUtils.nowAsEpoch)();
    var start = end - duration;
    return autoAdjustGetData(api, symbol, start, end, style, subscribe);
}

/**
 * get data of contract
 * @param api                      - will be injected by library
 * @param getContract              - function that accept nothing and return a Promise containing contract
 * @param durationCount            - number of duration
 * @param durationType             - type of duration, check http://api.highcharts.com/highstock#rangeSelector.buttons
 * @param style                    - one of ['ticks', 'candles'], this will affect the return data shape,
 *                                   internally library might not always use this param when requesting, eg. when data is too large,
 *                                   library will use `candles` instead of `ticks`, this is handle by library so user do not need to worry
 * @param granularity              - default to 60, check https://developers.binary.com/api/#ticks_history
 * @returns {*|Promise.<TResult>}
 */
function getDataForContract(api, getContract, duration) {
    var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ticks';
    var subscribe = arguments[4];

    var getAllData = function getAllData() {
        return getContract().then(function (contract) {
            var symbol = contract.underlying;

            var _computeStartEndForCo = (0, _binaryUtils.computeStartEndForContract)(contract);

            var start = _computeStartEndForCo.start;
            var end = _computeStartEndForCo.end;

            return autoAdjustGetData(api, symbol, start, end, style, subscribe, { isSold: !!contract.sell_time });
        });
    };

    if (!duration) {
        return getAllData();
    }

    return getContract().then(function (contract) {
        var symbol = contract.underlying;
        var startTime = +contract.date_start;

        // handle Contract not started yet
        if (startTime > (0, _binaryUtils.nowAsEpoch)()) {
            return autoAdjustGetData(api, symbol, (0, _binaryUtils.nowAsEpoch)() - 600, (0, _binaryUtils.nowAsEpoch)(), style, subscribe, { isSold: !!contract.sell_time });
        }

        var sellT = contract.sell_time;
        var end = sellT || (0, _binaryUtils.nowAsEpoch)();

        var buffer = (end - startTime) * 0.05;

        var start = Math.min(startTime - buffer, end - duration);
        return autoAdjustGetData(api, symbol, Math.round(start), Math.round(end), style, subscribe, { isSold: !!contract.sell_time });
    });
}

var helpers = exports.helpers = {
    autoAdjustGetData: autoAdjustGetData
};

/***/ },
/* 16 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr) {
    return arr.reduce(function (obj, x) {
        Object.keys(x).forEach(function (key) {
            if (Array.isArray(obj[key])) {
                obj[key].push(x[key]);
            } else {
                obj[key] = [x[key]];
            }
        });
        return obj;
    }, {});
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _commonRelativeBarrier = __webpack_require__(6);

var _commonRelativeBarrier2 = _interopRequireDefault(_commonRelativeBarrier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contract, lastTickQuote) {
    return (0, _commonRelativeBarrier2.default)(contract.barrier, contract.entry_spot, lastTickQuote);
};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateAsLocalISOString = __webpack_require__(8);

var _dateAsLocalISOString2 = _interopRequireDefault(_dateAsLocalISOString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (date) {
    return (0, _dateAsLocalISOString2.default)(date).slice(11, 19);
};

/***/ },
/* 19 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sec) {
    var minute = Math.floor(sec / 60);
    var hour = Math.floor(minute / 60);
    var day = Math.floor(hour / 24);

    return [sec, minute, hour, day];
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _timeStringBigger = __webpack_require__(10);

var _timeStringBigger2 = _interopRequireDefault(_timeStringBigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (a, b) {
    if (a === b) {
        return false;
    }
    return !(0, _timeStringBigger2.default)(a, b);
};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _durationToSecs = __webpack_require__(3);

var _durationToSecs2 = _interopRequireDefault(_durationToSecs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (duration) {
    var d = +duration.slice(0, -1);
    var u = duration.slice(-1);
    return (0, _durationToSecs2.default)(d, u);
};

/***/ },
/* 22 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['t', 's', 'm', 'h', 'd'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _durationUnits = __webpack_require__(22);

var _durationUnits2 = _interopRequireDefault(_durationUnits);

var _splitSecsToUnits = __webpack_require__(19);

var _splitSecsToUnits2 = _interopRequireDefault(_splitSecsToUnits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// block is a structure that describes min and max of specific time unit
var blockIsValid = function blockIsValid(minArg, maxArg, unit) {
    if (maxArg <= 1) {
        return false;
    }
    switch (unit) {
        case 's':
            return minArg < 60;
        case 'm':
            return minArg < 60;
        case 'h':
            return minArg < 24;
        case 'd':
        default:
            return true;
    }
};

exports.default = function (minInSecs, maxInSecs) {
    var minInUnits = (0, _splitSecsToUnits2.default)(minInSecs);
    var maxInUnits = (0, _splitSecsToUnits2.default)(maxInSecs);

    var durations = [];
    for (var i = 0; i < minInUnits.length; i++) {
        var unit = _durationUnits2.default[i + 1];
        var minI = minInUnits[i];
        var maxI = maxInUnits[i];
        if (blockIsValid(minI, maxI, unit)) {
            durations.push({
                unit: unit,
                min: minI > 0 ? minI : 1,
                max: maxI });
        }
    }
    return durations;
};

/***/ },
/* 24 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (duration) {
    return !!duration && duration.slice(-1) === 't';
};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayEqual = __webpack_require__(42);

Object.defineProperty(exports, 'arrayEqual', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_arrayEqual).default;
  }
});

var _arrayMax = __webpack_require__(43);

Object.defineProperty(exports, 'arrayMax', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_arrayMax).default;
  }
});

var _arrayMin = __webpack_require__(44);

Object.defineProperty(exports, 'arrayMin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_arrayMin).default;
  }
});

var _arrayToObject = __webpack_require__(16);

Object.defineProperty(exports, 'arrayToObject', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_arrayToObject).default;
  }
});

var _getLast = __webpack_require__(45);

Object.defineProperty(exports, 'getLast', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLast).default;
  }
});

var _mergeSortedArrays = __webpack_require__(47);

Object.defineProperty(exports, 'mergeSortedArrays', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mergeSortedArrays).default;
  }
});

var _sequence = __webpack_require__(48);

Object.defineProperty(exports, 'sequence', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sequence).default;
  }
});

var _groupArrayToNestedArray = __webpack_require__(46);

Object.defineProperty(exports, 'groupArrayToNestedArray', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_groupArrayToNestedArray).default;
  }
});

var _barrier2FromContract = __webpack_require__(49);

Object.defineProperty(exports, 'barrier2FromContract', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_barrier2FromContract).default;
  }
});

var _barrierFromContract = __webpack_require__(50);

Object.defineProperty(exports, 'barrierFromContract', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_barrierFromContract).default;
  }
});

var _callPutBarrier = __webpack_require__(51);

Object.defineProperty(exports, 'callPutBarrier', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_callPutBarrier).default;
  }
});

var _commonRelativeBarrier = __webpack_require__(6);

Object.defineProperty(exports, 'commonRelativeBarrier', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_commonRelativeBarrier).default;
  }
});

var _extractBarrier = __webpack_require__(52);

Object.defineProperty(exports, 'extractBarrier', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extractBarrier).default;
  }
});

var _getAbsoluteBarrierFromContract = __webpack_require__(7);

Object.defineProperty(exports, 'getAbsoluteBarrierFromContract', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getAbsoluteBarrierFromContract).default;
  }
});

var _relativeBarrier = __webpack_require__(17);

Object.defineProperty(exports, 'relativeBarrier', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_relativeBarrier).default;
  }
});

var _relativeBarrier2 = __webpack_require__(53);

Object.defineProperty(exports, 'relativeBarrier2', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_relativeBarrier2).default;
  }
});

var _dateAsLocalISOString = __webpack_require__(8);

Object.defineProperty(exports, 'dateAsLocalISOString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dateAsLocalISOString).default;
  }
});

var _dateToDateString = __webpack_require__(0);

Object.defineProperty(exports, 'dateToDateString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dateToDateString).default;
  }
});

var _dateToEpoch = __webpack_require__(54);

Object.defineProperty(exports, 'dateToEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dateToEpoch).default;
  }
});

var _dateToGMTString = __webpack_require__(55);

Object.defineProperty(exports, 'dateToGMTString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dateToGMTString).default;
  }
});

var _dateToTimeString = __webpack_require__(18);

Object.defineProperty(exports, 'dateToTimeString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dateToTimeString).default;
  }
});

var _dateToUTCTimeString = __webpack_require__(56);

Object.defineProperty(exports, 'dateToUTCTimeString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dateToUTCTimeString).default;
  }
});

var _epochToDate = __webpack_require__(2);

Object.defineProperty(exports, 'epochToDate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_epochToDate).default;
  }
});

var _epochToDateString = __webpack_require__(57);

Object.defineProperty(exports, 'epochToDateString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_epochToDateString).default;
  }
});

var _epochToDateTimeString = __webpack_require__(58);

Object.defineProperty(exports, 'epochToDateTimeString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_epochToDateTimeString).default;
  }
});

var _epochToTimeString = __webpack_require__(59);

Object.defineProperty(exports, 'epochToTimeString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_epochToTimeString).default;
  }
});

var _epochToUTCDateString = __webpack_require__(60);

Object.defineProperty(exports, 'epochToUTCDateString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_epochToUTCDateString).default;
  }
});

var _epochToUTCTimeString = __webpack_require__(61);

Object.defineProperty(exports, 'epochToUTCTimeString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_epochToUTCTimeString).default;
  }
});

var _getLastXMonthEpoch = __webpack_require__(62);

Object.defineProperty(exports, 'getLastXMonthEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLastXMonthEpoch).default;
  }
});

var _isDateValid = __webpack_require__(63);

Object.defineProperty(exports, 'isDateValid', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isDateValid).default;
  }
});

var _last30DaysEpoch = __webpack_require__(65);

Object.defineProperty(exports, 'last30DaysEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_last30DaysEpoch).default;
  }
});

var _last7DaysEpoch = __webpack_require__(66);

Object.defineProperty(exports, 'last7DaysEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_last7DaysEpoch).default;
  }
});

var _nextXDay = __webpack_require__(67);

Object.defineProperty(exports, 'nextXDay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nextXDay).default;
  }
});

var _nowAsEpoch = __webpack_require__(9);

Object.defineProperty(exports, 'nowAsEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nowAsEpoch).default;
  }
});

var _oneYearAfterStr = __webpack_require__(68);

Object.defineProperty(exports, 'oneYearAfterStr', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_oneYearAfterStr).default;
  }
});

var _secondsToTimeString = __webpack_require__(71);

Object.defineProperty(exports, 'secondsToTimeString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_secondsToTimeString).default;
  }
});

var _splitSecsToUnits = __webpack_require__(19);

Object.defineProperty(exports, 'splitSecsToUnits', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_splitSecsToUnits).default;
  }
});

var _timeStringBigger = __webpack_require__(10);

Object.defineProperty(exports, 'timeStringBigger', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeStringBigger).default;
  }
});

var _timeStringIsBetween = __webpack_require__(73);

Object.defineProperty(exports, 'timeStringIsBetween', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeStringIsBetween).default;
  }
});

var _timeStringSmaller = __webpack_require__(20);

Object.defineProperty(exports, 'timeStringSmaller', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeStringSmaller).default;
  }
});

var _timeStringToSeconds = __webpack_require__(74);

Object.defineProperty(exports, 'timeStringToSeconds', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeStringToSeconds).default;
  }
});

var _todayEpoch = __webpack_require__(75);

Object.defineProperty(exports, 'todayEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_todayEpoch).default;
  }
});

var _todayLocaleString = __webpack_require__(76);

Object.defineProperty(exports, 'todayLocaleString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_todayLocaleString).default;
  }
});

var _todayUTCString = __webpack_require__(77);

Object.defineProperty(exports, 'todayUTCString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_todayUTCString).default;
  }
});

var _xDayEpoch = __webpack_require__(1);

Object.defineProperty(exports, 'xDayEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_xDayEpoch).default;
  }
});

var _xMonthsAfter = __webpack_require__(78);

Object.defineProperty(exports, 'xMonthsAfter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_xMonthsAfter).default;
  }
});

var _yesterdayEpoch = __webpack_require__(11);

Object.defineProperty(exports, 'yesterdayEpoch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_yesterdayEpoch).default;
  }
});

var _yesterdayString = __webpack_require__(79);

Object.defineProperty(exports, 'yesterdayString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_yesterdayString).default;
  }
});

var _yesterdayUTCString = __webpack_require__(80);

Object.defineProperty(exports, 'yesterdayUTCString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_yesterdayUTCString).default;
  }
});

var _returnValidDate = __webpack_require__(69);

Object.defineProperty(exports, 'returnValidDate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_returnValidDate).default;
  }
});

var _returnValidTime = __webpack_require__(70);

Object.defineProperty(exports, 'returnValidTime', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_returnValidTime).default;
  }
});

var _isValidTime = __webpack_require__(64);

Object.defineProperty(exports, 'isValidTime', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isValidTime).default;
  }
});

var _timeLeftToNextRealityCheck = __webpack_require__(72);

Object.defineProperty(exports, 'timeLeftToNextRealityCheck', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeLeftToNextRealityCheck).default;
  }
});

var _durationSecHelper = __webpack_require__(21);

Object.defineProperty(exports, 'durationSecHelper', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_durationSecHelper).default;
  }
});

var _durationText = __webpack_require__(88);

Object.defineProperty(exports, 'durationText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_durationText).default;
  }
});

var _durationToSecs = __webpack_require__(3);

Object.defineProperty(exports, 'durationToSecs', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_durationToSecs).default;
  }
});

var _durationUnits = __webpack_require__(22);

Object.defineProperty(exports, 'durationUnits', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_durationUnits).default;
  }
});

var _extractDuration = __webpack_require__(89);

Object.defineProperty(exports, 'extractDuration', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extractDuration).default;
  }
});

var _extractDurationHelper = __webpack_require__(12);

Object.defineProperty(exports, 'extractDurationHelper', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extractDurationHelper).default;
  }
});

var _extractForwardStartingDuration = __webpack_require__(90);

Object.defineProperty(exports, 'extractForwardStartingDuration', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extractForwardStartingDuration).default;
  }
});

var _extractMinMaxInUnits = __webpack_require__(23);

Object.defineProperty(exports, 'extractMinMaxInUnits', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extractMinMaxInUnits).default;
  }
});

var _isDurationLessThan2Mins = __webpack_require__(91);

Object.defineProperty(exports, 'isDurationLessThan2Mins', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isDurationLessThan2Mins).default;
  }
});

var _isDurationTick = __webpack_require__(24);

Object.defineProperty(exports, 'isDurationTick', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isDurationTick).default;
  }
});

var _isDurationWithinRange = __webpack_require__(92);

Object.defineProperty(exports, 'isDurationWithinRange', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isDurationWithinRange).default;
  }
});

var _calculateLastDigitStats = __webpack_require__(101);

Object.defineProperty(exports, 'calculateLastDigitStats', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_calculateLastDigitStats).default;
  }
});

var _digitsToPips = __webpack_require__(102);

Object.defineProperty(exports, 'digitsToPips', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_digitsToPips).default;
  }
});

var _getLastDigit = __webpack_require__(26);

Object.defineProperty(exports, 'getLastDigit', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLastDigit).default;
  }
});

var _noOfDecimals = __webpack_require__(103);

Object.defineProperty(exports, 'noOfDecimals', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_noOfDecimals).default;
  }
});

var _numberToSignedString = __webpack_require__(104);

Object.defineProperty(exports, 'numberToSignedString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_numberToSignedString).default;
  }
});

var _pipSizeToStepSize = __webpack_require__(105);

Object.defineProperty(exports, 'pipSizeToStepSize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pipSizeToStepSize).default;
  }
});

var _pipsToDigits = __webpack_require__(106);

Object.defineProperty(exports, 'pipsToDigits', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pipsToDigits).default;
  }
});

var _toMoney = __webpack_require__(107);

Object.defineProperty(exports, 'toMoney', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toMoney).default;
  }
});

var _filterDeep = __webpack_require__(108);

Object.defineProperty(exports, 'filterDeep', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_filterDeep).default;
  }
});

var _findDeep = __webpack_require__(109);

Object.defineProperty(exports, 'findDeep', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findDeep).default;
  }
});

var _groupByKey = __webpack_require__(4);

Object.defineProperty(exports, 'groupByKey', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_groupByKey).default;
  }
});

var _immutableChildrenToJS = __webpack_require__(110);

Object.defineProperty(exports, 'immutableChildrenToJS', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_immutableChildrenToJS).default;
  }
});

var _areArraysEqual = __webpack_require__(111);

Object.defineProperty(exports, 'areArraysEqual', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_areArraysEqual).default;
  }
});

var _areCandleArrayEqual = __webpack_require__(112);

Object.defineProperty(exports, 'areCandleArrayEqual', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_areCandleArrayEqual).default;
  }
});

var _areTickArraysEqual = __webpack_require__(113);

Object.defineProperty(exports, 'areTickArraysEqual', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_areTickArraysEqual).default;
  }
});

var _doArrayDifferJustOneEntry = __webpack_require__(13);

Object.defineProperty(exports, 'doArrayDifferJustOneEntry', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doArrayDifferJustOneEntry).default;
  }
});

var _doCandleEqual = __webpack_require__(27);

Object.defineProperty(exports, 'doCandleEqual', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doCandleEqual).default;
  }
});

var _doCandlesDifferJustOneEntry = __webpack_require__(114);

Object.defineProperty(exports, 'doCandlesDifferJustOneEntry', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doCandlesDifferJustOneEntry).default;
  }
});

var _doTicksDifferJustOneEntry = __webpack_require__(115);

Object.defineProperty(exports, 'doTicksDifferJustOneEntry', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doTicksDifferJustOneEntry).default;
  }
});

var _doTicksEqual = __webpack_require__(28);

Object.defineProperty(exports, 'doTicksEqual', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doTicksEqual).default;
  }
});

var _getLastOHLCTick = __webpack_require__(116);

Object.defineProperty(exports, 'getLastOHLCTick', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLastOHLCTick).default;
  }
});

var _getLastTickQuote = __webpack_require__(117);

Object.defineProperty(exports, 'getLastTickQuote', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLastTickQuote).default;
  }
});

var _historyToTicks = __webpack_require__(118);

Object.defineProperty(exports, 'historyToTicks', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_historyToTicks).default;
  }
});

var _ohlcToData = __webpack_require__(119);

Object.defineProperty(exports, 'ohlcToData', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ohlcToData).default;
  }
});

var _ohlcToTicks = __webpack_require__(120);

Object.defineProperty(exports, 'ohlcToTicks', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ohlcToTicks).default;
  }
});

var _tickToData = __webpack_require__(121);

Object.defineProperty(exports, 'tickToData', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tickToData).default;
  }
});

var _askPriceFromProposal = __webpack_require__(122);

Object.defineProperty(exports, 'askPriceFromProposal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_askPriceFromProposal).default;
  }
});

var _computeStartEndForContract = __webpack_require__(123);

Object.defineProperty(exports, 'computeStartEndForContract', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_computeStartEndForContract).default;
  }
});

var _contractCategoryToText = __webpack_require__(124);

Object.defineProperty(exports, 'contractCategoryToText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_contractCategoryToText).default;
  }
});

var _contractCodeToText = __webpack_require__(125);

Object.defineProperty(exports, 'contractCodeToText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_contractCodeToText).default;
  }
});

var _extractSpreadInfo = __webpack_require__(126);

Object.defineProperty(exports, 'extractSpreadInfo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extractSpreadInfo).default;
  }
});

var _isIntraday = __webpack_require__(127);

Object.defineProperty(exports, 'isIntraday', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isIntraday).default;
  }
});

var _normalizedContractFor = __webpack_require__(128);

Object.defineProperty(exports, 'normalizedContractFor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_normalizedContractFor).default;
  }
});

var _tradeToFriendlyType = __webpack_require__(129);

Object.defineProperty(exports, 'tradeToFriendlyType', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tradeToFriendlyType).default;
  }
});

var _tradeTypeCodeToText = __webpack_require__(29);

Object.defineProperty(exports, 'tradeTypeCodeToText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tradeTypeCodeToText).default;
  }
});

var _tradeTypeTextToCode = __webpack_require__(130);

Object.defineProperty(exports, 'tradeTypeTextToCode', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tradeTypeTextToCode).default;
  }
});

var _tradeTypes = __webpack_require__(5);

Object.defineProperty(exports, 'tradeTypes', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tradeTypes).default;
  }
});

var _typeHasBarrier = __webpack_require__(30);

Object.defineProperty(exports, 'typeHasBarrier', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_typeHasBarrier).default;
  }
});

var _Analytics = __webpack_require__(93);

Object.defineProperty(exports, 'Analytics', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Analytics).default;
  }
});

var _brandColor = __webpack_require__(94);

Object.defineProperty(exports, 'brandColor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_brandColor).default;
  }
});

var _directionClassName = __webpack_require__(95);

Object.defineProperty(exports, 'directionClassName', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_directionClassName).default;
  }
});

var _errorToString = __webpack_require__(96);

Object.defineProperty(exports, 'errorToString', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_errorToString).default;
  }
});

var _getUniqueId = __webpack_require__(97);

Object.defineProperty(exports, 'getUniqueId', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getUniqueId).default;
  }
});

var _isMobile = __webpack_require__(98);

Object.defineProperty(exports, 'isMobile', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isMobile).default;
  }
});

var _isValidEmail = __webpack_require__(99);

Object.defineProperty(exports, 'isValidEmail', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isValidEmail).default;
  }
});

var _isValidPassword = __webpack_require__(100);

Object.defineProperty(exports, 'isValidPassword', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isValidPassword).default;
  }
});

var _addFullscreenEventListener = __webpack_require__(81);

Object.defineProperty(exports, 'addFullscreenEventListener', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_addFullscreenEventListener).default;
  }
});

var _exitFullscreen = __webpack_require__(82);

Object.defineProperty(exports, 'exitFullscreen', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_exitFullscreen).default;
  }
});

var _removeFullscreenEventListener = __webpack_require__(83);

Object.defineProperty(exports, 'removeFullscreenEventListener', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_removeFullscreenEventListener).default;
  }
});

var _requestFullscreen = __webpack_require__(84);

Object.defineProperty(exports, 'requestFullscreen', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_requestFullscreen).default;
  }
});

var _showInfo = __webpack_require__(86);

Object.defineProperty(exports, 'showInfo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_showInfo).default;
  }
});

var _showError = __webpack_require__(85);

Object.defineProperty(exports, 'showError', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_showError).default;
  }
});

var _windowResizeEvent = __webpack_require__(87);

Object.defineProperty(exports, 'windowResizeEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_windowResizeEvent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 26 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value, pips) {
    return +value.toFixed(pips).slice(-1);
};

/***/ },
/* 27 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ohlc1, ohlc2) {
    return !ohlc1 && ohlc1 === ohlc2 || !!ohlc1 && !!ohlc2 && ohlc1.epoch === ohlc2.epoch && ohlc1.close === ohlc2.close;
};

/***/ },
/* 28 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (tick1, tick2) {
    return !tick1 && tick1 === tick2 || !!tick1 && !!tick2 && tick1.epoch === tick2.epoch && tick1.quote === tick2.quote;
};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tradeTypes = __webpack_require__(5);

var _tradeTypes2 = _interopRequireDefault(_tradeTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (code) {
    var tradeType = _tradeTypes2.default.find(function (x) {
        return x.value === code;
    });
    return tradeType ? tradeType.text : 'Unknown';
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tradeTypes = __webpack_require__(5);

var _tradeTypes2 = _interopRequireDefault(_tradeTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (type) {
    var typeDetails = _tradeTypes2.default.find(function (x) {
        return x.value === type;
    });
    return !!(typeDetails && typeDetails.barrier);
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = exports.helpers = exports.LiveApi = exports.LiveEvents = undefined;

var _LiveEvents = __webpack_require__(14);

Object.defineProperty(exports, 'LiveEvents', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LiveEvents).default;
  }
});

var _LiveApi = __webpack_require__(33);

Object.defineProperty(exports, 'LiveApi', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LiveApi).default;
  }
});

var _custom = __webpack_require__(15);

Object.defineProperty(exports, 'helpers', {
  enumerable: true,
  get: function get() {
    return _custom.helpers;
  }
});

var _OAuth2 = __webpack_require__(34);

var _OAuth = _interopRequireWildcard(_OAuth2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.OAuth = _OAuth;

/***/ },
/* 32 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getInitialState = function getInitialState() {
    return {
        token: undefined,
        balance: false,
        contracts: new Set(),
        allContract: false,
        transactions: false,
        ticks: new Set(),
        ticksHistory: new Map(),
        candlesHistory: new Map(),
        proposals: new Set(),
        streamIdMapping: new Map()
    };
};

var ApiState = function ApiState() {
    var _this = this;

    _classCallCheck(this, ApiState);

    this.resetState = function () {
        _this.state = getInitialState();
    };

    this.getState = function () {
        return _this.state;
    };

    this.authorize = function (token) {
        _this.state.token = token;
    };

    this.subscribeToBalance = function () {
        _this.state.balance = true;
    };

    this.unsubscribeFromBalance = function () {
        _this.state.balance = false;
    };

    this.subscribeToOpenContract = function (contractId, streamId) {
        if (streamId) {
            _this.state.contracts.add(contractId);
            _this.state.streamIdMapping.set(streamId, contractId);
        }
    };

    this.unsubscribeFromAllProposalsOpenContract = function () {
        _this.state.contracts.clear();
        _this.state.allContract = false;
    };

    this.subscribeToAllOpenContracts = function () {
        _this.state.allContract = true;
    };

    this.subscribeToTransactions = function () {
        _this.state.transactions = true;
    };

    this.unsubscribeFromTransactions = function () {
        _this.state.transactions = false;
    };

    this.subscribeToTick = function (symbol) {
        _this.state.ticks.add(symbol);
    };

    this.subscribeToTicks = function (symbols) {
        symbols.forEach(_this.subscribeToTick);
    };

    this.unsubscribeFromAllTicks = function () {
        _this.state.ticks.clear();
        _this.state.ticksHistory.clear();
    };

    this.unsubscribeFromAllCandles = function () {
        _this.state.candlesHistory.clear();
    };

    this.getTickHistory = function (symbol, params) {
        if (params && params.subscribe === 1) {
            if (params.style === 'candles') {
                _this.state.candlesHistory.set(symbol, params);
            } else {
                _this.state.ticksHistory.set(symbol, params);
            }
        }
    };

    this.subscribeToPriceForContractProposal = function (options, streamId) {
        if (streamId) {
            _this.state.proposals.add(options);
            _this.state.streamIdMapping.set(streamId, options);
        }
    };

    this.unsubscribeFromAllProposals = function () {
        _this.state.proposals.clear();
    };

    this.unsubscribeByID = function (id) {
        _this.state.streamIdMapping.forEach(function (payload, streamId) {
            if (streamId === id) {
                _this.state.contracts.delete(payload);
                _this.state.proposals.delete(payload);
            }
        });
        _this.state.streamIdMapping.delete(id);
    };

    this.state = getInitialState();
}

// special care needed to forget subscription, as backends rely on
// and id instead of more natural keys like symbol and payload
;

exports.default = ApiState;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binaryUtils = __webpack_require__(25);

var _LiveEvents = __webpack_require__(14);

var _LiveEvents2 = _interopRequireDefault(_LiveEvents);

var _ServerError = __webpack_require__(35);

var _ServerError2 = _interopRequireDefault(_ServerError);

var _calls = __webpack_require__(37);

var calls = _interopRequireWildcard(_calls);

var _ApiState = __webpack_require__(32);

var _ApiState2 = _interopRequireDefault(_ApiState);

var _custom = __webpack_require__(15);

var customCalls = _interopRequireWildcard(_custom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _binaryUtils.getUniqueId)(); // skip 0 value
var defaultApiUrl = 'wss://ws.binaryws.com/websockets/v3';
var nullFunc = function nullFunc() {};
var MockWebSocket = nullFunc;
var WebSocket = typeof window !== 'undefined' ? window.WebSocket : MockWebSocket;

var shouldIgnoreError = function shouldIgnoreError(error) {
    return error.message.includes('You are already subscribed to') || error.message.includes('Input validation failed: forget');
};

var LiveApi = function () {
    function LiveApi(initParams) {
        var _this = this;

        _classCallCheck(this, LiveApi);

        this.onOpen = function () {
            _this.resubscribe();
            _this.executeBufferedExecutes();
        };

        this.disconnect = function () {
            _this.token = '';
            _this.socket.onclose = nullFunc;
            _this.socket.close();
        };

        this.resubscribe = function () {
            var _apiState$getState = _this.apiState.getState();

            var token = _apiState$getState.token;
            var contracts = _apiState$getState.contracts;
            var balance = _apiState$getState.balance;
            var allContract = _apiState$getState.allContract;
            var candlesHistory = _apiState$getState.candlesHistory;
            var transactions = _apiState$getState.transactions;
            var ticks = _apiState$getState.ticks;
            var ticksHistory = _apiState$getState.ticksHistory;
            var proposals = _apiState$getState.proposals;


            _this.onAuth = function () {
                if (balance) {
                    _this.subscribeToBalance();
                }

                if (transactions) {
                    _this.subscribeToTransactions();
                }

                if (allContract) {
                    _this.subscribeToAllOpenContracts();
                }

                contracts.forEach(function (id) {
                    return _this.subscribeToOpenContract(id);
                });

                _this.onAuth = function () {};
            };

            if (ticks.size !== 0) {
                _this.subscribeToTicks([].concat(_toConsumableArray(ticks)));
            }

            ticksHistory.forEach(function (param, symbol) {
                return _this.getTickHistory(symbol, param);
            });

            candlesHistory.forEach(function (param, symbol) {
                return _this.getTickHistory(symbol, param);
            });

            proposals.forEach(function (proposal) {
                return _this.subscribeToPriceForContractProposal(proposal);
            });

            if (token) {
                _this.authorize(token);
            } else {
                // this need to be called last as it mayb mutate
                // ticksHistory, candlesHistory and proposals
                _this.sendBufferedSends();
            }
        };

        this.changeLanguage = function (ln) {
            if (ln === _this.language) {
                return;
            }
            _this.socket.onclose = nullFunc;
            _this.socket.close();
            _this.language = ln;
            _this.connect();
        };

        this.isReady = function () {
            return !!_this.socket && _this.socket.readyState === 1;
        };

        this.sendBufferedSends = function () {
            if (_this.isReady()) {
                // TODO: test fail without this check, find out why!!??
                while (_this.bufferedSends.length > 0) {
                    _this.bufferedSends.shift()();
                }
            }
        };

        this.executeBufferedExecutes = function () {
            while (_this.bufferedExecutes.length > 0) {
                _this.bufferedExecutes.shift()();
            }
        };

        this.resolvePromiseForResponse = function (json) {
            if (typeof json.req_id === 'undefined') {
                return Promise.resolve();
            }

            var reqId = json.req_id.toString();
            var promise = _this.unresolvedPromises[reqId];

            if (!promise) {
                return Promise.resolve();
            }

            delete _this.unresolvedPromises[reqId];
            if (!json.error) {
                return promise.resolve(json);
            }

            if (!shouldIgnoreError(json.error)) {
                return promise.reject(new _ServerError2.default(json));
            }

            return Promise.resolve();
        };

        this.onMessage = function (message) {
            var json = JSON.parse(message.data);

            if (json.msg_type === 'authorize' && _this.onAuth) {
                _this.sendBufferedSends();
            }

            if (!json.error) {
                if (json.msg_type === 'authorize' && _this.onAuth) {
                    _this.onAuth();
                }
                _this.events.emit(json.msg_type, json);
            } else {
                _this.events.emit('error', json);
            }

            return _this.resolvePromiseForResponse(json);
        };

        this.generatePromiseForRequest = function (json) {
            var reqId = json.req_id.toString();

            return new Promise(function (resolve, reject) {
                _this.unresolvedPromises[reqId] = { resolve: resolve, reject: reject };
            });
        };

        this.sendAndUpdateState = function (callName) {
            var _this2 = this;

            for (var _len = arguments.length, param = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                param[_key - 1] = arguments[_key];
            }

            var reqId = (0, _binaryUtils.getUniqueId)();
            var actualPaylod = calls[callName].apply(calls, _toConsumableArray(param));
            var json = _extends({
                req_id: reqId
            }, actualPaylod);

            var socketSend = function socketSend() {
                _this2.sendSpy(JSON.stringify(json));
                _this2.socket.send(JSON.stringify(json));
                if (_this2.apiState[callName]) {
                    var _apiState;

                    (_apiState = _this2.apiState)[callName].apply(_apiState, _toConsumableArray(param));
                }
            };

            if (this.isReady()) {
                socketSend();
            } else {
                this.bufferedSends.push(socketSend);
            }

            if (typeof json.req_id !== 'undefined') {
                return this.generatePromiseForRequest(json).then(function (r) {
                    if (!_this2.apiState[callName]) return r;

                    // TODO: hackish and need redo, this depends on object identity to works!!!
                    if (r.proposal_open_contract && r.proposal_open_contract.id) {
                        var _apiState2;

                        (_apiState2 = _this2.apiState)[callName].apply(_apiState2, _toConsumableArray(param).concat([r.proposal_open_contract.id]));
                    } else if (r.proposal && r.proposal.id) {
                        var _apiState3;

                        (_apiState3 = _this2.apiState)[callName].apply(_apiState3, _toConsumableArray(param).concat([r.proposal.id]));
                    }
                    return r;
                });
            }

            return undefined;
        };

        this.execute = function (func) {
            if (_this.isReady()) {
                func();
            } else {
                _this.bufferedExecutes.push(func);
            }
        };

        this.send = function (json) {
            console.warn('This method is deprecated, you should use high-level methods, ' + 'please contact us if you need help in migration');
            var reqId = (0, _binaryUtils.getUniqueId)();
            return _this.sendRaw(_extends({
                req_id: reqId
            }, json));
        };

        this.sendRaw = function (json) {
            console.warn('This method is deprecated, you should use high-level methods, ' + 'please contact us if you need help in migration');
            var socketSend = function socketSend() {
                _this.sendSpy(JSON.stringify(json));
                _this.socket.send(JSON.stringify(json));
            };
            if (_this.isReady()) {
                socketSend();
            } else {
                _this.bufferedSends.push(socketSend);
            }

            if (typeof json.req_id !== 'undefined') {
                return _this.generatePromiseForRequest(json);
            }

            return undefined;
        };

        var _ref = initParams || {};

        var _ref$apiUrl = _ref.apiUrl;
        var apiUrl = _ref$apiUrl === undefined ? defaultApiUrl : _ref$apiUrl;
        var _ref$language = _ref.language;
        var language = _ref$language === undefined ? 'en' : _ref$language;
        var _ref$appId = _ref.appId;
        var appId = _ref$appId === undefined ? 0 : _ref$appId;
        var _ref$sendSpy = _ref.sendSpy;
        var sendSpy = _ref$sendSpy === undefined ? function () {} : _ref$sendSpy;
        var websocket = _ref.websocket;
        var connection = _ref.connection;
        var keepAlive = _ref.keepAlive;


        this.apiUrl = apiUrl;
        this.language = language;
        this.appId = appId;
        this.sendSpy = sendSpy;

        if (keepAlive) {
            setInterval(function () {
                return _this.ping();
            }, 60 * 1000);
        }

        if (websocket) {
            WebSocket = websocket;
        }

        this.bufferedSends = [];
        this.bufferedExecutes = [];
        this.unresolvedPromises = {};

        this.events = new _LiveEvents2.default();
        this.apiState = new _ApiState2.default();

        this.bindCallsAndStateMutators();

        this.connect(connection);
    }

    _createClass(LiveApi, [{
        key: 'bindCallsAndStateMutators',
        value: function bindCallsAndStateMutators() {
            var _this3 = this;

            Object.keys(calls).forEach(function (callName) {
                _this3[callName] = function () {
                    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        params[_key2] = arguments[_key2];
                    }

                    return _this3.sendAndUpdateState.apply(_this3, [callName].concat(params));
                };
            });

            Object.keys(customCalls).forEach(function (callName) {
                _this3[callName] = function () {
                    for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        params[_key3] = arguments[_key3];
                    }

                    return customCalls[callName].apply(customCalls, [_this3].concat(params));
                }; // seems to be a good place to do some simple cache
            });
        }
    }, {
        key: 'connect',
        value: function connect(connection) {
            var _this4 = this;

            var urlPlusParams = this.apiUrl + '?l=' + this.language + '&app_id=' + this.appId;

            Object.keys(this.unresolvedPromises).forEach(function (reqId) {
                var disconnectedError = new Error('Websocket disconnected before response received.');
                disconnectedError.name = 'DisconnectError';
                _this4.unresolvedPromises[reqId].reject(disconnectedError);
                delete _this4.unresolvedPromises[reqId];
            });

            try {
                this.socket = connection || new WebSocket(urlPlusParams);
            } catch (err) {
                // swallow connection error, we can't do anything about it
            } finally {
                this.socket.onopen = this.onOpen;
                this.socket.onclose = function () {
                    return _this4.connect();
                };
                this.socket.onmessage = this.onMessage;
            }
        }

        // TODO: should we deprecate this? preserve for backward compatibility


        // TODO: should we deprecate this? preserve for backward compatibility

    }]);

    return LiveApi;
}();

exports.default = LiveApi;

/***/ },
/* 34 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var oauthUrl = exports.oauthUrl = function oauthUrl(appId) {
    return 'https://www.binary.com/oauth2/authorize?app_id=' + appId;
};

var oauthUrlWithLanguage = exports.oauthUrlWithLanguage = function oauthUrlWithLanguage(appId, langCode) {
    return 'https://www.binary.com/oauth2/authorize?app_id=' + appId + '&l=' + langCode;
};

var parseOAuthResponse = exports.parseOAuthResponse = function parseOAuthResponse(responseUrl) {
    var matcher = /acct\d=(\w+)&token\d=([\w-]+)/g;
    var urlParts = responseUrl.split('/redirect?');
    if (urlParts.length !== 2) throw new Error('Not a valid url');

    var params = urlParts[1].split(matcher);

    var accounts = [];

    for (var i = 1; i < params.length; i += 3) {
        accounts.push({
            account: params[i],
            token: params[i + 1]
        });
    }

    return accounts;
};

/***/ },
/* 35 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerError = function (_Error) {
    _inherits(ServerError, _Error);

    function ServerError(errorObj) {
        _classCallCheck(this, ServerError);

        var _this = _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).call(this, errorObj));

        _this.stack = new Error().stack;
        _this.error = errorObj;
        _this.name = errorObj.error.code;

        var message = errorObj.error.message;
        var echo_req = errorObj.echo_req;


        var echoStr = JSON.stringify(echo_req, null, 2);
        _this.message = "[ServerError] " + message + "\n" + echoStr;
        return _this;
    }

    return ServerError;
}(Error);

exports.default = ServerError;

/***/ },
/* 36 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var deleteApiToken = exports.deleteApiToken = function deleteApiToken(token) {
    return {
        api_token: 1,
        delete_token: token
    };
};

var getApiTokens = exports.getApiTokens = function getApiTokens() {
    return {
        api_token: 1
    };
};

var createApiToken = exports.createApiToken = function createApiToken(token, scopes) {
    return {
        api_token: 1,
        new_token: token,
        new_token_scopes: scopes
    };
};

var changePassword = exports.changePassword = function changePassword(oldPassword, newPassword) {
    return {
        change_password: 1,
        old_password: oldPassword,
        new_password: newPassword
    };
};

var registerApplication = exports.registerApplication = function registerApplication(options) {
    return _extends({
        app_register: 1
    }, options);
};

var getAllAppList = exports.getAllAppList = function getAllAppList() {
    return {
        app_list: 1
    };
};

var getAppslistById = exports.getAppslistById = function getAppslistById(appid) {
    return {
        app_get: appid
    };
};

var deleteApplication = exports.deleteApplication = function deleteApplication(appid) {
    return {
        app_delete: appid
    };
};

var createRealAccountMaltaInvest = exports.createRealAccountMaltaInvest = function createRealAccountMaltaInvest(options) {
    return _extends({
        new_account_maltainvest: 1
    }, options);
};

var createRealAccount = exports.createRealAccount = function createRealAccount(options) {
    return _extends({
        new_account_real: 1
    }, options);
};

var setAccountCurrency = exports.setAccountCurrency = function setAccountCurrency(currency) {
    return {
        set_account_currency: currency
    };
};

var setSelfExclusion = exports.setSelfExclusion = function setSelfExclusion(options) {
    return _extends({
        set_self_exclusion: 1
    }, options);
};

var setAccountSettings = exports.setAccountSettings = function setAccountSettings(options) {
    return _extends({
        set_settings: 1
    }, options);
};

var setTnCApproval = exports.setTnCApproval = function setTnCApproval() {
    return {
        tnc_approval: 1
    };
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unauthenticated = __webpack_require__(41);

Object.keys(_unauthenticated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _unauthenticated[key];
    }
  });
});

var _read = __webpack_require__(39);

Object.keys(_read).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _read[key];
    }
  });
});

var _trade = __webpack_require__(40);

Object.keys(_trade).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _trade[key];
    }
  });
});

var _payments = __webpack_require__(38);

Object.keys(_payments).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _payments[key];
    }
  });
});

var _admin = __webpack_require__(36);

Object.keys(_admin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _admin[key];
    }
  });
});

/***/ },
/* 38 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getCashierLockStatus = exports.getCashierLockStatus = function getCashierLockStatus() {
    return {
        cashier_password: 1
    };
};

var setCashierLock = exports.setCashierLock = function setCashierLock(options) {
    return _extends({
        cashier_password: 1
    }, options);
};

var withdrawToPaymentAgent = exports.withdrawToPaymentAgent = function withdrawToPaymentAgent(options) {
    return _extends({
        paymentagent_withdraw: 1
    }, options);
};

var paymentAgentTransfer = exports.paymentAgentTransfer = function paymentAgentTransfer(options) {
    return _extends({
        paymentagent_transfer: 1
    }, options);
};

var transferBetweenAccounts = exports.transferBetweenAccounts = function transferBetweenAccounts(options) {
    return _extends({
        transfer_between_accounts: 1
    }, options);
};

/***/ },
/* 39 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getAccountLimits = exports.getAccountLimits = function getAccountLimits() {
    return {
        get_limits: 1
    };
};

var getAccountSettings = exports.getAccountSettings = function getAccountSettings() {
    return {
        get_settings: 1
    };
};

var getAccountStatus = exports.getAccountStatus = function getAccountStatus() {
    return {
        get_account_status: 1
    };
};

var getSelfExclusion = exports.getSelfExclusion = function getSelfExclusion() {
    return {
        get_self_exclusion: 1
    };
};

var logOut = exports.logOut = function logOut() {
    return {
        logout: 1
    };
};

var getStatement = exports.getStatement = function getStatement(options) {
    return _extends({
        statement: 1
    }, options);
};

var getPortfolio = exports.getPortfolio = function getPortfolio() {
    return {
        portfolio: 1
    };
};

var getProfitTable = exports.getProfitTable = function getProfitTable(options) {
    return _extends({
        profit_table: 1
    }, options);
};

var getRealityCheckSummary = exports.getRealityCheckSummary = function getRealityCheckSummary() {
    return {
        reality_check: 1
    };
};

var subscribeToBalance = exports.subscribeToBalance = function subscribeToBalance() {
    return {
        balance: 1,
        subscribe: 1
    };
};

var unsubscribeFromBalance = exports.unsubscribeFromBalance = function unsubscribeFromBalance() {
    return {
        balance: 1,
        subscribe: 0
    };
};

var subscribeToOpenContract = exports.subscribeToOpenContract = function subscribeToOpenContract(contractId) {
    return {
        proposal_open_contract: 1,
        subscribe: 1,
        contract_id: contractId
    };
};

var getContractInfo = exports.getContractInfo = function getContractInfo(contractId) {
    return {
        proposal_open_contract: 1,
        contract_id: contractId
    };
};

var subscribeToAllOpenContracts = exports.subscribeToAllOpenContracts = function subscribeToAllOpenContracts() {
    return {
        proposal_open_contract: 1,
        subscribe: 1
    };
};

var unsubscribeFromAllOpenContracts = exports.unsubscribeFromAllOpenContracts = function unsubscribeFromAllOpenContracts() {
    return {
        proposal_open_contract: 1,
        subscribe: 0
    };
};

var subscribeToTransactions = exports.subscribeToTransactions = function subscribeToTransactions() {
    return {
        transaction: 1,
        subscribe: 1
    };
};

var unsubscribeFromTransactions = exports.unsubscribeFromTransactions = function unsubscribeFromTransactions() {
    return {
        transaction: 1,
        subscribe: 0
    };
};

/***/ },
/* 40 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var buyContract = exports.buyContract = function buyContract(contractId, price) {
    return {
        buy: contractId,
        price: price
    };
};

var sellContract = exports.sellContract = function sellContract(contractId, price) {
    return {
        sell: contractId,
        price: price
    };
};

var sellExpiredContracts = exports.sellExpiredContracts = function sellExpiredContracts() {
    return {
        sell_expired: 1
    };
};

var topUpVirtualAccount = exports.topUpVirtualAccount = function topUpVirtualAccount() {
    return {
        topup_virtual: 1
    };
};

/***/ },
/* 41 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getActiveSymbolsBrief = exports.getActiveSymbolsBrief = function getActiveSymbolsBrief() {
    return {
        active_symbols: 'brief'
    };
};

var getActiveSymbolsFull = exports.getActiveSymbolsFull = function getActiveSymbolsFull() {
    return {
        active_symbols: 'full'
    };
};

var getAssetIndex = exports.getAssetIndex = function getAssetIndex() {
    return {
        asset_index: 1
    };
};

var authorize = exports.authorize = function authorize(token) {
    return {
        authorize: token
    };
};

var getContractsForSymbol = exports.getContractsForSymbol = function getContractsForSymbol(symbol) {
    return {
        contracts_for: symbol
    };
};

var unsubscribeFromTick = exports.unsubscribeFromTick = function unsubscribeFromTick(symbol) {
    return {
        forget: symbol
    };
};

var unsubscribeFromTicks = exports.unsubscribeFromTicks = function unsubscribeFromTicks(symbols) {
    return {
        forget: symbols
    };
};

var unsubscribeByID = exports.unsubscribeByID = function unsubscribeByID(id) {
    return {
        forget: id
    };
};

var unsubscribeFromAllTicks = exports.unsubscribeFromAllTicks = function unsubscribeFromAllTicks() {
    return {
        forget_all: 'ticks'
    };
};

var unsubscribeFromAllCandles = exports.unsubscribeFromAllCandles = function unsubscribeFromAllCandles() {
    return {
        forget_all: 'candles'
    };
};

var unsubscribeFromAllProposals = exports.unsubscribeFromAllProposals = function unsubscribeFromAllProposals() {
    return {
        forget_all: 'proposal'
    };
};

var unsubscribeFromAllPortfolios = exports.unsubscribeFromAllPortfolios = function unsubscribeFromAllPortfolios() {
    return {
        forget_all: 'portfolio'
    };
};

var unsubscribeFromAllProposalsOpenContract = exports.unsubscribeFromAllProposalsOpenContract = function unsubscribeFromAllProposalsOpenContract() {
    return {
        forget_all: 'proposal_open_contract'
    };
};

var getLandingCompany = exports.getLandingCompany = function getLandingCompany(landingCompany) {
    return {
        landing_company: landingCompany
    };
};

var getLandingCompanyDetails = exports.getLandingCompanyDetails = function getLandingCompanyDetails(landingCompany) {
    return {
        landing_company_details: landingCompany
    };
};

var createVirtualAccount = exports.createVirtualAccount = function createVirtualAccount(options) {
    return _extends({
        new_account_virtual: 1
    }, options);
};

var ping = exports.ping = function ping() {
    return {
        ping: 1
    };
};

var getPaymentAgentsForCountry = exports.getPaymentAgentsForCountry = function getPaymentAgentsForCountry(countryCode) {
    return {
        paymentagent_list: countryCode
    };
};

var getPayoutCurrencies = exports.getPayoutCurrencies = function getPayoutCurrencies() {
    return {
        payout_currencies: 1
    };
};

var getPriceProposalForContract = exports.getPriceProposalForContract = function getPriceProposalForContract(options) {
    return _extends({
        proposal: 1
    }, options);
};

var subscribeToPriceForContractProposal = exports.subscribeToPriceForContractProposal = function subscribeToPriceForContractProposal(options) {
    return _extends({
        proposal: 1,
        subscribe: 1
    }, options);
};

var getResidences = exports.getResidences = function getResidences() {
    return {
        residence_list: 1
    };
};

var getStatesForCountry = exports.getStatesForCountry = function getStatesForCountry(countryCode) {
    return {
        states_list: countryCode
    };
};

var subscribeToTick = exports.subscribeToTick = function subscribeToTick(symbol) {
    return {
        ticks: symbol
    };
};

var subscribeToTicks = exports.subscribeToTicks = function subscribeToTicks(symbols) {
    return {
        ticks: symbols
    };
};

var getTickHistory = exports.getTickHistory = function getTickHistory(symbol, options) {
    return _extends({
        ticks_history: symbol
    }, options || { end: 'latest' });
};

var getCandles = exports.getCandles = function getCandles(symbol, options) {
    return _extends({
        ticks_history: symbol,
        style: 'candles'
    }, options || { end: 'latest' });
};

var getCandlesForLastNDays = exports.getCandlesForLastNDays = function getCandlesForLastNDays(symbol, ndays) {
    return {
        ticks_history: symbol,
        style: 'candles',
        start: Math.floor(Date.now() / 1000) - (ndays - 1) * 60 * 60 * 24,
        end: 'latest',
        granularity: 60 * 60 * 24,
        count: 30
    };
};

var getServerTime = exports.getServerTime = function getServerTime() {
    return {
        time: 1
    };
};

var getTradingTimes = exports.getTradingTimes = function getTradingTimes(date) {
    return {
        trading_times: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    };
};

var verifyEmail = exports.verifyEmail = function verifyEmail(email, type) {
    return {
        verify_email: email,
        type: type
    };
};

var getWebsiteStatus = exports.getWebsiteStatus = function getWebsiteStatus() {
    return {
        website_status: 1
    };
};

/***/ },
/* 42 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (a, b) {
    if (a.length !== b.length) {
        return false;
    }

    return !a.some(function (x, idx) {
        return x !== b[idx];
    });
};

/***/ },
/* 43 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (arr) {
    return Math.max.apply(Math, _toConsumableArray(arr));
};

/***/ },
/* 44 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (arr) {
    return Math.min.apply(Math, _toConsumableArray(arr));
};

/***/ },
/* 45 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr) {
    return arr && (arr.length === 0 ? undefined : arr[arr.length - 1]);
};

/***/ },
/* 46 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr, key) {
    return arr.reduce(function (a, b) {
        var kv = b[key];
        var idx = a.findIndex(function (g) {
            return g.some(function (e) {
                return e[key] === kv;
            });
        });

        if (idx > -1) {
            a[idx].push(b);
        } else {
            a.push([b]);
        }
        return a;
    }, []);
};

/***/ },
/* 47 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr1, arr2) {
    var getter1 = arguments.length <= 2 || arguments[2] === undefined ? function (x) {
        return x;
    } : arguments[2];
    var getter2 = arguments.length <= 3 || arguments[3] === undefined ? function (x) {
        return x;
    } : arguments[3];
    var deduplication = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

    /**
     * compare element using getter
     * @param a
     * @param b
     * @returns {number}
     *   0  -> equal
     *   1  -> `a` bigger than `b`
     *   -1 -> `b` bigger than `a`
     */
    var compare = function compare(a, b) {
        var valA = getter1(a);
        var valB = getter2(b);

        if (valA > valB) {
            return 1;
        }

        if (valA < valB) {
            return -1;
        }

        return 0;
    };

    // clone so that does not change arguments
    var a1Clone = arr1.slice(0);
    var a2Clone = arr2.slice(0);

    var result = [];

    // loop until both array is empty
    while (a1Clone.length > 0 || a2Clone.length > 0) {
        var a1Head = a1Clone[0];
        var a2Head = a2Clone[0];

        if (!a1Head) {
            result = result.concat(a2Clone);
            break; // break if one of the array is empty
        }

        if (!a2Head) {
            result = result.concat(a1Clone);
            break; // break if one of the array is empty
        }

        var last = result.length > 0 && result[result.length - 1];
        var toAdd = void 0;
        switch (compare(a1Head, a2Head)) {
            case 0:
                {
                    if (deduplication) a2Clone.shift();
                    toAdd = a1Clone.shift();
                    break;
                }
            // a2Head is smaller
            case 1:
                {
                    toAdd = a2Clone.shift();
                    break;
                }
            // a1Head is smaller
            case -1:
                {
                    toAdd = a1Clone.shift();
                    break;
                }
            default: // impossible
        }

        // if dedup is true, do not append same element
        if (deduplication && last && getter1(last) === getter2(toAdd)) {
            break;
        }
        result.push(toAdd);
    }

    return result;
};

/***/ },
/* 48 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (n) {
    return Array.from(Array(n).keys());
};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getAbsoluteBarrierFromContract = __webpack_require__(7);

var _getAbsoluteBarrierFromContract2 = _interopRequireDefault(_getAbsoluteBarrierFromContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contract, lastTickQuote) {
    return (0, _getAbsoluteBarrierFromContract2.default)(contract, lastTickQuote, 'barrier2');
};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getAbsoluteBarrierFromContract = __webpack_require__(7);

var _getAbsoluteBarrierFromContract2 = _interopRequireDefault(_getAbsoluteBarrierFromContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contract, lastTickQuote) {
    return (0, _getAbsoluteBarrierFromContract2.default)(contract, lastTickQuote, 'barrier');
};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _relativeBarrier = __webpack_require__(17);

var _relativeBarrier2 = _interopRequireDefault(_relativeBarrier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contract, lastTickQuote) {
    return contract.barrier ? (0, _relativeBarrier2.default)(contract, lastTickQuote) : +contract.entry_spot || lastTickQuote;
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _groupByKey = __webpack_require__(4);

var _groupByKey2 = _interopRequireDefault(_groupByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractDigitBarrierHelper = function extractDigitBarrierHelper(contractsGroupedByExpiry) {
    var expiryTypes = Object.keys(contractsGroupedByExpiry);
    var result = {};
    expiryTypes.forEach(function (et) {
        var contractsByExpiry = contractsGroupedByExpiry[et];
        result[et] = [{
            name: 'Digit',
            values: contractsByExpiry[0].last_digit_range,
            defaultValue: contractsByExpiry[0].last_digit_range[0]
        }];
    });
    return result;
};

var extract2BarriersHelper = function extract2BarriersHelper(contractsGroupedByExpiry) {
    var expiryTypes = Object.keys(contractsGroupedByExpiry);
    var result = {};
    expiryTypes.forEach(function (et) {
        var contractsByExpiry = contractsGroupedByExpiry[et];
        result[et] = [{ name: 'High barrier', defaultValue: contractsByExpiry[0].high_barrier }, { name: 'Low barrier', defaultValue: contractsByExpiry[0].low_barrier }];
    });
    return result;
};

var extract1BarrierHelper = function extract1BarrierHelper(contractGroupedByExpiry, barrierName) {
    var expiryTypes = Object.keys(contractGroupedByExpiry);
    var result = {};
    expiryTypes.forEach(function (et) {
        var contractsByExpiry = contractGroupedByExpiry[et];
        var contractWithBarrier = contractsByExpiry.find(function (c) {
            return !!c.barrier;
        });
        if (!contractWithBarrier) {
            return;
        }
        result[et] = [{ name: barrierName, defaultValue: contractWithBarrier.barrier }];
    });
    return result;
};

exports.default = function (contracts, type) {
    var groupByExpiryType = (0, _groupByKey2.default)(contracts, 'expiry_type');

    switch (type) {
        // types with 1 barrier
        case 'CALL':
            return extract1BarrierHelper(groupByExpiryType, 'Higher than');
        case 'PUT':
            return extract1BarrierHelper(groupByExpiryType, 'Lower than');
        case 'ONETOUCH':
        case 'NOTOUCH':
            return extract1BarrierHelper(groupByExpiryType, 'Touch spot');

        // types with 2 barriers
        case 'EXPIRYMISS':
        case 'EXPIRYRANGE':
        case 'RANGE':
        case 'UPORDOWN':
            return extract2BarriersHelper(groupByExpiryType);

        // special case: digit type
        case 'DIGITMATCH':
        case 'DIGITDIFF':
        case 'DIGITOVER':
        case 'DIGITUNDER':
            return extractDigitBarrierHelper(groupByExpiryType);

        // These types do not have barrier
        case 'DIGITODD':
        case 'DIGITEVEN':
        case 'ASIANU':
        case 'ASIAND':
        case 'SPREADU':
        case 'SPREADD':
            return undefined;
        default:
            {
                throw new Error('Unknown trade type: ' + type);
            }
    }
};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _commonRelativeBarrier = __webpack_require__(6);

var _commonRelativeBarrier2 = _interopRequireDefault(_commonRelativeBarrier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contract, lastTickQuote) {
    return (0, _commonRelativeBarrier2.default)(contract.barrier2, contract.entry_spot, lastTickQuote);
};

/***/ },
/* 54 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (date) {
    return Math.floor(date.getTime() / 1000);
};

/***/ },
/* 55 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

/***/ },
/* 56 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (date) {
    return date.toISOString().slice(11, 19);
};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _epochToDate = __webpack_require__(2);

var _epochToDate2 = _interopRequireDefault(_epochToDate);

var _dateToDateString = __webpack_require__(0);

var _dateToDateString2 = _interopRequireDefault(_dateToDateString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var epoch = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    return (0, _dateToDateString2.default)((0, _epochToDate2.default)(epoch));
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _epochToDate = __webpack_require__(2);

var _epochToDate2 = _interopRequireDefault(_epochToDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (epoch) {
    return (0, _epochToDate2.default)(epoch).toUTCString();
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateToTimeString = __webpack_require__(18);

var _dateToTimeString2 = _interopRequireDefault(_dateToTimeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (epoch) {
    return (0, _dateToTimeString2.default)(new Date(epoch * 1000));
};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _epochToDate = __webpack_require__(2);

var _epochToDate2 = _interopRequireDefault(_epochToDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var epoch = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    return (0, _epochToDate2.default)(epoch).toISOString().slice(0, 10);
};

/***/ },
/* 61 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (epoch) {
    return new Date(epoch * 1000).toISOString().slice(11, 19);
};

/***/ },
/* 62 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (x) {
	var d = new Date();
	d.setMonth(d.getMonth() - x);
	return Math.floor(d.getTime() / 1000);
};

/***/ },
/* 63 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (date) {
    return !isNaN(date.getTime());
};

/***/ },
/* 64 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (time) {
    return time.split(':').map(function (val, ind) {
        switch (ind) {
            case 0:
                return parseInt(val, 0) < 24;
            case 1:
                return parseInt(val, 0) <= 59;
            default:
                return parseInt(val, 0) <= 59;
        }
    }).indexOf(false) > -1;
};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xDayEpoch = __webpack_require__(1);

var _xDayEpoch2 = _interopRequireDefault(_xDayEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return (0, _xDayEpoch2.default)(-29);
};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xDayEpoch = __webpack_require__(1);

var _xDayEpoch2 = _interopRequireDefault(_xDayEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return (0, _xDayEpoch2.default)(-6);
};

/***/ },
/* 67 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (x) {
    var tmr = new Date();
    tmr.setDate(tmr.getDate() + x);
    return tmr;
};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dateToDateString = __webpack_require__(0);

var _dateToDateString2 = _interopRequireDefault(_dateToDateString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var d = new Date();
	d.setFullYear(new Date().getFullYear() + 1);
	return (0, _dateToDateString2.default)(d);
};

/***/ },
/* 69 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (inputValue, bridge) {
    return inputValue.split(bridge).map(function (obj) {
        switch (obj.length) {
            case 0:
                return '01';
            case 1:
                return '0' + (obj === '0' ? '1' : obj);
            default:
                return obj;
        }
    }).join(bridge);
};

/***/ },
/* 70 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (inputValue, bridge) {
    return inputValue.split(bridge).map(function (obj) {
        switch (obj.length) {
            case 0:
                return '00';
            case 1:
                return '0' + obj;
            default:
                return obj;
        }
    }).join(bridge);
};

/***/ },
/* 71 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (secs) {
    var days = Math.floor(secs / 60 / 60 / 24);
    var hours = Math.floor(secs % (60 * 60 * 24) / (60 * 60));
    var minutes = Math.floor(secs % (60 * 60) / 60);
    var seconds = Math.floor(secs % 60);
    return (days > 0 ? days + ' day(s)' : '') + (hours > 0 ? hours + ' hour(s)' : '') + (minutes > 0 ? minutes + ' minute(s)' : '') + (seconds > 0 ? seconds + ' second(s)' : '');
};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nowAsEpoch = __webpack_require__(9);

var _nowAsEpoch2 = _interopRequireDefault(_nowAsEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (loginTime, interval) {
    return interval - ((0, _nowAsEpoch2.default)() - loginTime) % interval;
};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _timeStringBigger = __webpack_require__(10);

var _timeStringBigger2 = _interopRequireDefault(_timeStringBigger);

var _timeStringSmaller = __webpack_require__(20);

var _timeStringSmaller2 = _interopRequireDefault(_timeStringSmaller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (start, end, target) {
    if ((0, _timeStringBigger2.default)(end, start)) {
        return (0, _timeStringBigger2.default)(target, start) && (0, _timeStringSmaller2.default)(target, end);
    }
    /**
     * if open time is bigger than close time
     * target should not between close and open time
     * eg. '09:00:00' is not between '23:00:00' (start) and '08:00:00'(close)
     * because it is between '08:00:00' to '23:00:00'
     * */

    return !((0, _timeStringBigger2.default)(target, end) && (0, _timeStringSmaller2.default)(target, start));
};

/***/ },
/* 74 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

// only supported format = "hh:mm", seconds are not supported
exports.default = function (timeString) {
    var h = +timeString.slice(0, 2);
    var m = +timeString.slice(3, 5);

    return h * 3600 + m * 60;
};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xDayEpoch = __webpack_require__(1);

var _xDayEpoch2 = _interopRequireDefault(_xDayEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return (0, _xDayEpoch2.default)(0);
};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateToDateString = __webpack_require__(0);

var _dateToDateString2 = _interopRequireDefault(_dateToDateString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return (0, _dateToDateString2.default)(new Date());
};

/***/ },
/* 77 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return new Date().toISOString().slice(0, 10);
};

/***/ },
/* 78 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (m) {
	return new Date(new Date().setMonth(new Date().getMonth() + m));
};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateToDateString = __webpack_require__(0);

var _dateToDateString2 = _interopRequireDefault(_dateToDateString);

var _yesterdayEpoch = __webpack_require__(11);

var _yesterdayEpoch2 = _interopRequireDefault(_yesterdayEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return (0, _dateToDateString2.default)(new Date((0, _yesterdayEpoch2.default)() * 1000));
};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _yesterdayEpoch = __webpack_require__(11);

var _yesterdayEpoch2 = _interopRequireDefault(_yesterdayEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return new Date((0, _yesterdayEpoch2.default)() * 1000).toISOString().slice(0, 10);
};

/***/ },
/* 81 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (handler) {
    document.addEventListener('fullscreenchange', function () {
        return handler(document.fullscreen);
    });
    document.addEventListener('webkitfullscreenchange', function () {
        return handler(document.webkitIsFullScreen);
    });
    document.addEventListener('mozfullscreenchange', function () {
        return handler(document.mozFullScreen);
    });
    document.addEventListener('MSFullscreenChange', function () {
        return handler(document.msFullscreenElement);
    });
};

/***/ },
/* 82 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};

/***/ },
/* 83 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (handler) {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler);
    document.removeEventListener('mozfullscreenchange', handler);
    document.removeEventListener('MSFullscreenChange', handler);
};

/***/ },
/* 84 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
};

/***/ },
/* 85 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeof alert !== 'undefined' ? alert : function () {};

/***/ },
/* 86 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeof alert !== 'undefined' ? alert : function () {};

/***/ },
/* 87 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    if (typeof window === 'undefined') return;
    setTimeout(function () {
        return window.dispatchEvent(new Event('resize'));
    }, 100);
};

/***/ },
/* 88 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (unit) {
    return {
        t: 'Ticks',
        s: 'Seconds',
        m: 'Minutes',
        h: 'Hours',
        d: 'Days'
    }[unit];
};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extractDurationHelper = __webpack_require__(12);

var _extractDurationHelper2 = _interopRequireDefault(_extractDurationHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contracts, type) {
    var contractsOfType = contracts.filter(function (c) {
        return c.contract_type === type;
    });
    var nonForwardStartingContracts = contractsOfType.filter(function (c) {
        return !c.forward_starting_options;
    });

    if (nonForwardStartingContracts.length === 0) {
        return undefined;
    }

    return (0, _extractDurationHelper2.default)(nonForwardStartingContracts, type);
};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _arrayToObject = __webpack_require__(16);

var _arrayToObject2 = _interopRequireDefault(_arrayToObject);

var _groupByKey = __webpack_require__(4);

var _groupByKey2 = _interopRequireDefault(_groupByKey);

var _extractDurationHelper = __webpack_require__(12);

var _extractDurationHelper2 = _interopRequireDefault(_extractDurationHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contracts, type) {
    var forwardStartingContracts = contracts.filter(function (c) {
        return !!c.forward_starting_options && c.contract_type === type;
    });
    if (forwardStartingContracts.length === 0) {
        return undefined;
    }

    if (forwardStartingContracts.length > 1) {
        throw new Error('Can not have more than one contract with forward starting options');
    }

    var forwardOptions = forwardStartingContracts[0].forward_starting_options;
    var groupByDate = (0, _groupByKey2.default)(forwardOptions || [], 'date');
    var forwardStartingRange = [];
    Object.keys(groupByDate).sort(function (a, b) {
        return +a - +b;
    }).forEach(function (date) {
        var timesPerDateArr = groupByDate[date].map(function (obj) {
            var open = new Date(obj.open * 1000);
            var close = new Date(obj.close * 1000);
            return { open: open, close: close };
        });
        var timesPerDateObj = (0, _arrayToObject2.default)(timesPerDateArr);
        forwardStartingRange.push(_extends({ date: new Date(date * 1000) }, timesPerDateObj));
    });

    var forwardStartingDurations = (0, _extractDurationHelper2.default)(forwardStartingContracts, type);
    return {
        range: forwardStartingRange,
        options: forwardStartingDurations
    };
};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isDurationTick = __webpack_require__(24);

var _isDurationTick2 = _interopRequireDefault(_isDurationTick);

var _durationToSecs = __webpack_require__(3);

var _durationToSecs2 = _interopRequireDefault(_durationToSecs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (duration, durationUnit) {
    return (0, _isDurationTick2.default)(durationUnit) || (0, _durationToSecs2.default)(duration, durationUnit) < 120;
};

/***/ },
/* 92 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (duration, durationUnit, ranges) {
    var relatedBlock = ranges.find(function (r) {
        return r.unit === durationUnit;
    });

    if (!relatedBlock) {
        return false;
    }

    return duration <= relatedBlock.max && duration >= relatedBlock.min;
};

/***/ },
/* 93 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var nullFunc = function nullFunc() {};

var analytics = function analytics(ga) {
    return ga || typeof window !== 'undefined' && window.ga || nullFunc;
};

var trackUserId = exports.trackUserId = function trackUserId(userId, ga) {
    return analytics(ga)('set', 'userId', userId);
};

var trackRoute = exports.trackRoute = function trackRoute(route, ga) {
    return analytics(ga)('send', 'pageview', route);
};

var trackEvent = exports.trackEvent = function trackEvent(category, action, label, ga) {
    return analytics(ga)('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label
    });
};

/***/ },
/* 94 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (percentage) {
    return "rgba(42, 48, 82, " + percentage + ")";
};

/***/ },
/* 95 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value) {
    return value < 0 && 'number-negative' || value > 0 && 'number-positive' || '';
};

/***/ },
/* 96 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (text) {
    return text.split(')').length > 1 ? text.split(')')[1] : text;
};

/***/ },
/* 97 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniqueId = 0;

exports.default = function () {
  return uniqueId++;
};

/***/ },
/* 98 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return typeof window !== 'undefined' && /Mobile/.test(window.navigator.userAgent);
};

/***/ },
/* 99 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (email) {
    return (/\S+@\S+\.\S+/.test(email)
    );
};

/***/ },
/* 100 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (password) {
    return (/^[ -~]{6,25}$/.test(password)
    );
};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getLastDigit = __webpack_require__(26);

var _getLastDigit2 = _interopRequireDefault(_getLastDigit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ticks, pips) {
    return ticks.reduce(function (acc, x) {
        var digit = (0, _getLastDigit2.default)(x.quote, pips);
        acc[digit]++;
        return acc;
    }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]).map(function (x) {
        return ticks.length && x / ticks.length * 100;
    });
};

/***/ },
/* 102 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (digits) {
    return Math.pow(10, -digits);
};

/***/ },
/* 103 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (n) {
    var numStr = n.toString();
    return numStr.includes('.') ? numStr.split('.')[1].length : 0;
};

/***/ },
/* 104 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (n) {
    return n > 0 ? '+' + n : n.toString();
};

/***/ },
/* 105 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (pipSize) {
    if (isNaN(pipSize)) {
        return '0.01';
    }
    var zeros = Array(pipSize).join('0');
    return '0.' + zeros + 1;
};

/***/ },
/* 106 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (pips) {
    return Math.abs(Math.log10(pips));
};

/***/ },
/* 107 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value) {
    return (+value).toFixed(2);
};

/***/ },
/* 108 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj, predicate) {
    return Object.keys(obj).reduce(function (acc, key) {
        if (predicate(obj[key])) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};

/***/ },
/* 109 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Find if certain value is true in the object
 * @param obj
 * @param predicate     (object, index) => true|false
 * @returns {boolean}
 */
var findDeep = function findDeep(obj, predicate) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null || obj === undefined) {
        return false;
    }

    var allChildren = Object.keys(obj).map(function (k) {
        return obj[k];
    });
    var childrenMeetPredicate = allChildren.map(function (child, k) {
        return predicate(child, k);
    });
    if (childrenMeetPredicate.indexOf(true) > -1) {
        return true;
    }
    var childrenResult = allChildren.map(function (child) {
        return findDeep(child, predicate);
    });
    return childrenResult.indexOf(true) > -1;
};

exports.default = findDeep;

/***/ },
/* 110 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var toPlainJS = exports.toPlainJS = function toPlainJS(obj) {
    return obj && (typeof obj.toJS === 'undefined' ? obj : obj.toJS());
};

exports.default = function (obj) {
    return obj && Object.keys(obj).reduce(function (acc, key) {
        acc[key] = toPlainJS(obj[key]);
        return acc;
    }, {});
};

/***/ },
/* 111 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr1, arr2) {
    return arr1.length === arr2.length && arr1.every(function (x, idx) {
        return x === arr2[idx];
    });
};

/***/ },
/* 112 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ohlc1, ohlc2) {
    var o1Len = ohlc1.length;
    var o2Len = ohlc2.length;

    if (o1Len !== o2Len) {
        return false;
    }

    if (o1Len === 0) {
        return true;
    }

    var o1Last = ohlc1[o1Len - 1];
    var o2Last = ohlc2[o2Len - 1];

    return o1Last.epoch === o2Last.epoch && o1Last.close === o2Last.close;
};

/***/ },
/* 113 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ticks1, ticks2) {
    return ticks1.length === ticks2.length && (ticks1.length === 0 || ticks1[ticks1.length - 1].epoch === ticks2[ticks2.length - 1].epoch);
};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _doCandleEqual = __webpack_require__(27);

var _doCandleEqual2 = _interopRequireDefault(_doCandleEqual);

var _doArrayDifferJustOneEntry = __webpack_require__(13);

var _doArrayDifferJustOneEntry2 = _interopRequireDefault(_doArrayDifferJustOneEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (candles1, candles2) {
    return (0, _doArrayDifferJustOneEntry2.default)(candles1, candles2, _doCandleEqual2.default);
};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _doTicksEqual = __webpack_require__(28);

var _doTicksEqual2 = _interopRequireDefault(_doTicksEqual);

var _doArrayDifferJustOneEntry = __webpack_require__(13);

var _doArrayDifferJustOneEntry2 = _interopRequireDefault(_doArrayDifferJustOneEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ticks1, ticks2) {
    return (0, _doArrayDifferJustOneEntry2.default)(ticks1, ticks2, _doTicksEqual2.default);
};

/***/ },
/* 116 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (candles) {
    return candles && (candles.length === 0 ? undefined : +candles[candles.length - 1].close);
};

/***/ },
/* 117 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ticks) {
    return ticks && ticks.length > 0 ? ticks[ticks.length - 1].quote : undefined;
};

/***/ },
/* 118 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

// a zip + map, but I do not find we need it much, so no need to generalize
exports.default = function (history) {
    return history.times.map(function (t, idx) {
        return {
            epoch: +t,
            quote: +history.prices[idx]
        };
    });
};

/***/ },
/* 119 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

// open_time is used when data is stream
exports.default = function (candle) {
    return [+(candle.open_time || candle.epoch) * 1000, +candle.open, +candle.high, +candle.low, +candle.close];
};

/***/ },
/* 120 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (candles) {
    return candles.map(function (data) {
        return { quote: +data.open, epoch: +data.epoch };
    });
};

/***/ },
/* 121 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (tick) {
    return [+tick.epoch * 1000, +tick.quote];
};

/***/ },
/* 122 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (proposal) {
    return proposal && +proposal.ask_price;
};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nowAsEpoch = __webpack_require__(9);

var _nowAsEpoch2 = _interopRequireDefault(_nowAsEpoch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contract) {
    var nowEpoch = (0, _nowAsEpoch2.default)();
    if (contract.tick_count) {
        var _start = +contract.date_start - 5;
        var exitTime = +contract.exit_tick_time + 5;
        var _end = exitTime || nowEpoch;
        return { start: _start, end: _end };
    }

    var bufferSize = 0.05; // 5 % buffer
    var contractStart = +contract.date_start;
    var contractEnd = +contract.exit_tick_time || +contract.date_expiry;

    if (contractEnd <= contractStart) {
        var e = new RangeError('Contract ends time is earlier than start time');
        e.name = 'ContractEndsBeforeStart';
        throw e;
    }

    var buffer = (contractEnd - contractStart) * bufferSize;
    var bufferedExitTime = contractEnd + buffer;

    var start = buffer ? contractStart - buffer : contractStart;
    var end = contractEnd ? bufferedExitTime : nowEpoch;

    return {
        end: Math.round(end),
        start: Math.round(start)
    };
};

/***/ },
/* 124 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (category) {
    return {
        callput: 'Up/Down',
        risefall: 'Rise/Fall',
        higherlower: 'Higher/Lower',
        asian: 'Asians',
        digits: 'Digits',
        endsinout: 'Ends In/Out',
        staysinout: 'Stays In/Out',
        touchnotouch: 'Touch/No Touch',
        spreads: 'Spreads'
    }[category];
};

/***/ },
/* 125 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (code) {
	return {
		contract_id: 'Contract ID',
		purchase_time: 'Purchase Time',
		ask_price: 'Ask Price',
		bid_price: 'Bid Price',
		date_start: 'Start Time',
		date_expiry: 'Expiry Time',
		date_settlement: 'Settlement Time',
		expiry_time: 'Expiry Time',

		current_spot: 'Current Spot',
		current_spot_time: 'Current Spot Time',
		entry_spot: 'Entry Spot',
		entry_tick_time: 'Entry Spot Time',
		sell_price: 'Sell Price',
		payout: 'Potential Payout',
		buy_price: 'Purchase Price',

		barrier: 'Barrier',
		low_barrier: 'Low Barrier',
		high_barrier: 'High Barrier',

		sell_time: 'Sell Time',

		exit_tick_time: 'Exit Spot Time', // to be confirmed
		exit_tick: 'Exit Spot', // to show both or not?

		sell_spot_time: 'DO NOT USE',
		entry_tick: 'DO NOT USE',
		sell_spot: 'DO NOT USE'
	}[code];
};

/***/ },
/* 126 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (contracts) {
    return {
        amountPerPoint: contracts[0].amount_per_point,
        stopType: contracts[0].stop_type,
        stopLoss: contracts[0].stop_loss,
        stopProfit: contracts[0].stop_profit
    };
};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _durationToSecs = __webpack_require__(3);

var _durationToSecs2 = _interopRequireDefault(_durationToSecs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (duration, unit) {
    return (0, _durationToSecs2.default)(duration, unit) < 60 * 60 * 24;
};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _groupByKey = __webpack_require__(4);

var _groupByKey2 = _interopRequireDefault(_groupByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contracts) {
    var extraRemoved = contracts.map(function (contract) {
        return {
            amount_per_point: contract.amount_per_point,
            barrier: contract.barrier,
            barriers: contract.barriers,
            contract_category: contract.contract_category,
            contract_category_display: contract.contract_category_display,
            contract_display: contract.contract_display,
            contract_type: contract.contract_type,
            expiry_type: contract.expiry_type,
            forward_starting_options: contract.forward_starting_options,
            high_barrier: contract.high_barrier,
            last_digit_range: contract.last_digit_range,
            low_barrier: contract.low_barrier,
            min_contract_duration: contract.min_contract_duration,
            max_contract_duration: contract.max_contract_duration,
            stop_type: contract.stop_type,
            stop_loss: contract.stop_loss,
            stop_profit: contract.stop_profit
        };
    });

    var groupByCategory = (0, _groupByKey2.default)(extraRemoved, 'contract_category');
    var allCategory = Object.keys(groupByCategory);
    allCategory.forEach(function (c) {
        var relatedContracts = groupByCategory[c];
        var groupByType = (0, _groupByKey2.default)(relatedContracts, 'contract_type');
        groupByCategory[c] = groupByType;
    });

    return groupByCategory;
};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tradeTypeCodeToText = __webpack_require__(29);

var _tradeTypeCodeToText2 = _interopRequireDefault(_tradeTypeCodeToText);

var _typeHasBarrier = __webpack_require__(30);

var _typeHasBarrier2 = _interopRequireDefault(_typeHasBarrier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (code, barrier) {
    return (0, _tradeTypeCodeToText2.default)(code) + ((0, _typeHasBarrier2.default)(code) ? ' ' + barrier : '');
};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tradeTypes = __webpack_require__(5);

var _tradeTypes2 = _interopRequireDefault(_tradeTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (text) {
    var tradeType = _tradeTypes2.default.find(function (x) {
        return x.text === text;
    });
    if (!tradeType) throw new Error('Unknown trade type text');
    return tradeType.value;
};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=binary-live-api.js.map