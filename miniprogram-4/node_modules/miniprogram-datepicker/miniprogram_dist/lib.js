module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _calendar = __webpack_require__(3);

var _calendar2 = _interopRequireDefault(_calendar);

var _lodash = __webpack_require__(4);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YEAR_START = 1900;
var YEAR_END = 2100;
var MONTH_START = 1;
var MONTH_END = 12;
var DAY_START = 1;
exports.default = {
    getToday: function getToday() {
        return _calendar2.default.solar2lunar();
    },
    validateValue: function validateValue(value) {
        var year = parseInt(value === null || value === void 0 ? void 0 : value.year, 10);
        var month = parseInt(value === null || value === void 0 ? void 0 : value.month, 10);
        var day = parseInt(value === null || value === void 0 ? void 0 : value.day, 10);
        var isLeapMonth = !!(value === null || value === void 0 ? void 0 : value.isLeapMonth);
        var isLunarCalendar = !!(value === null || value === void 0 ? void 0 : value.isLunarCalendar);
        var validated = isLunarCalendar ? _calendar2.default.lunar2solar(year, month, day, isLeapMonth) : _calendar2.default.solar2lunar(year, month, day);
        var date = validated === -1 ? this.getToday() : validated;
        return {
            year: isLunarCalendar ? date.lYear : date.cYear,
            month: isLunarCalendar ? date.lMonth : date.cMonth,
            day: isLunarCalendar ? date.lDay : date.cDay,
            isLeapMonth: isLunarCalendar ? date.isLeap : false,
            isLunarCalendar: isLunarCalendar
        };
    },
    getDefaultValue: function getDefaultValue() {
        var today = new Date();
        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
            isLeapMonth: false,
            isLunarCalendar: false
        };
    },
    getDefaultObjectMultiArray: function getDefaultObjectMultiArray() {
        return [[{
            label: '某年',
            value: 0
        }], [{
            label: '某月',
            value: 0,
            isLeap: false
        }], [{
            label: '某日',
            value: 0
        }]];
    },
    getColumn: function getColumn(start, end, callback) {
        var ret = [];
        for (var i = start; i <= end; i++) {
            ret.push(callback.call(this, i));
        }
        return ret;
    },
    getColumnItem: function getColumnItem(column, index) {
        if (column[index] === undefined) {
            index = column.length - 1;
        }
        return column[index];
    },
    getYearColumnItem: function getYearColumnItem(year) {
        return {
            label: year + '\u5E74',
            value: year
        };
    },
    getYearColumn: function getYearColumn() {
        return this.getColumn(YEAR_START, YEAR_END, this.getYearColumnItem);
    },
    getYearIndex: function getYearIndex(year) {
        return year - YEAR_START;
    },
    getMonthColumnItemLabel: function getMonthColumnItemLabel(month, isLeapMonth, isLunarCalendar) {
        if (isLunarCalendar) {
            var chinaMonth = _calendar2.default.toChinaMonth(month); // 调用前校验过参数，忽略错误的情况
            if (isLeapMonth) {
                chinaMonth = '\u95F0' + chinaMonth;
            }
            return chinaMonth;
        }
        return month + '\u6708';
    },
    getMonthColumnItem: function getMonthColumnItem(month, isLeapMonth, isLunarCalendar) {
        return {
            label: this.getMonthColumnItemLabel(month, isLeapMonth, isLunarCalendar),
            value: month,
            isLeap: isLeapMonth
        };
    },
    getSolarMonthColumnItem: function getSolarMonthColumnItem(month) {
        return this.getMonthColumnItem(month, false, false);
    },
    getLunarNotLeapMonthColumnItem: function getLunarNotLeapMonthColumnItem(month) {
        return this.getMonthColumnItem(month, false, true);
    },
    getLunarLeapMonthColumnItem: function getLunarLeapMonthColumnItem(month) {
        return this.getMonthColumnItem(month, true, true);
    },
    getSolarMonthColumn: function getSolarMonthColumn() {
        return this.getColumn(MONTH_START, MONTH_END, this.getSolarMonthColumnItem);
    },
    getLunarMonthColumn: function getLunarMonthColumn(year) {
        var column = this.getColumn(MONTH_START, MONTH_END, this.getLunarNotLeapMonthColumnItem);
        var leapMonth = _calendar2.default.leapMonth(year);
        if (leapMonth !== 0) {
            column.splice(leapMonth, 0, this.getLunarLeapMonthColumnItem(leapMonth));
        }
        return column;
    },
    getMonthColumn: function getMonthColumn(year, isLunarCalendar) {
        return isLunarCalendar ? this.getLunarMonthColumn(year) : this.getSolarMonthColumn();
    },
    getMonthIndex: function getMonthIndex(monthColumn, month, isLeapMonth) {
        return (0, _lodash2.default)(monthColumn, {
            value: month,
            isLeap: isLeapMonth
        });
    },
    getDayColumnItemLabel: function getDayColumnItemLabel(year, month, day, isLeapMonth, isLunarCalendar, isShowWeek) {
        var label = isLunarCalendar ? _calendar2.default.toChinaDay(day) : day + '\u65E5';
        if (isShowWeek) {
            var ncWeek = (isLunarCalendar ? _calendar2.default.lunar2solar(year, month, day, isLeapMonth) : _calendar2.default.solar2lunar(year, month, day)).ncWeek; // 调用前校验过参数，忽略错误的情况
            label = label + " " + ncWeek;
        }
        return label;
    },
    getDayColumnItem: function getDayColumnItem(year, month, day, isLeapMonth, isLunarCalendar, isShowWeek) {
        var label = this.getDayColumnItemLabel(year, month, day, isLeapMonth, isLunarCalendar, isShowWeek);
        return {
            label: label,
            value: day
        };
    },
    getSolarDayColumnItem: function getSolarDayColumnItem(year, month, day, isShowWeek) {
        return this.getDayColumnItem(year, month, day, false, false, isShowWeek);
    },
    getLunarDayColumnItem: function getLunarDayColumnItem(year, month, day, isLeapMonth, isShowWeek) {
        return this.getDayColumnItem(year, month, day, isLeapMonth, true, isShowWeek);
    },
    getSolarDays: function getSolarDays(year, month) {
        return _calendar2.default.solarDays(year, month);
    },
    getLunarDays: function getLunarDays(year, month, isLeapMonth) {
        return isLeapMonth ? _calendar2.default.leapDays(year) : _calendar2.default.monthDays(year, month);
    },
    getSolarDayColumn: function getSolarDayColumn(year, month, isShowWeek) {
        var _this = this;
        return this.getColumn(DAY_START, this.getSolarDays(year, month), function (day) {
            return _this.getSolarDayColumnItem(year, month, day, isShowWeek);
        });
    },
    getLunarDayColumn: function getLunarDayColumn(year, month, isLeapMonth, isShowWeek) {
        var _this = this;
        return this.getColumn(DAY_START, this.getLunarDays(year, month, isLeapMonth), function (day) {
            return _this.getLunarDayColumnItem(year, month, day, isLeapMonth, isShowWeek);
        });
    },
    getDayColumn: function getDayColumn(year, month, isLeapMonth, isLunarCalendar, isShowWeek) {
        return isLunarCalendar ? this.getLunarDayColumn(year, month, isLeapMonth, isShowWeek) : this.getSolarDayColumn(year, month, isShowWeek);
    },
    getDayIndex: function getDayIndex(day) {
        return day - DAY_START;
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("calendar");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash.findindex");

/***/ })
/******/ ]);