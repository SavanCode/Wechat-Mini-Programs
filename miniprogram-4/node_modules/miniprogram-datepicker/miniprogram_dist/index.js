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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lib = __webpack_require__(1);

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    options: {
        pureDataPattern: /^value|showWeek|isRendered|isLunarCalendar/
    },
    properties: {
        value: {
            type: Object,
            value: _lib2.default.getDefaultValue()
        },
        showWeek: {
            type: Boolean,
            value: true
        }
    },
    data: {
        isRendered: false,
        isLunarCalendar: false,
        objectMultiArray: _lib2.default.getDefaultObjectMultiArray(),
        multiIndex: [0, 0, 0]
    },
    observers: {
        'value, showWeek': function valueShowWeek(value, isShowWeek) {
            this._render && this._render(value, isShowWeek);
        }
    },
    lifetimes: {
        attached: function attached() {
            if (this.data.isRendered === false) {
                this._triggerRender();
            }
        }
    },
    methods: {
        _render: function _render(value, isShowWeek) {
            var _this = this;
            var _a = _lib2.default.validateValue(value),
                year = _a.year,
                month = _a.month,
                day = _a.day,
                isLeapMonth = _a.isLeapMonth,
                isLunarCalendar = _a.isLunarCalendar;
            var yearColumn = _lib2.default.getYearColumn();
            var monthColumn = _lib2.default.getMonthColumn(year, isLunarCalendar);
            var dayColumn = _lib2.default.getDayColumn(year, month, isLeapMonth, isLunarCalendar, isShowWeek);
            this.setData({
                isRendered: true,
                isLunarCalendar: isLunarCalendar,
                objectMultiArray: [yearColumn, monthColumn, dayColumn]
            });
            setTimeout(function () {
                _this.setData({
                    multiIndex: [_lib2.default.getYearIndex(year), _lib2.default.getMonthIndex(monthColumn, month, isLeapMonth), _lib2.default.getDayIndex(day)]
                });
            }, 100);
        },
        _triggerRender: function _triggerRender() {
            this.setData({
                showWeek: this.data.showWeek
            });
        },
        bindColumnChange: function bindColumnChange(e) {
            var _a;
            var _b = e.detail,
                column = _b.column,
                value = _b.value;
            var _c = this.data,
                isShowWeek = _c.showWeek,
                isLunarCalendar = _c.isLunarCalendar;
            this.setData((_a = {}, _a["multiIndex[" + column + "]"] = value, _a));
            var _d = this.data.multiIndex,
                yearIndex = _d[0],
                monthIndex = _d[1],
                dayIndex = _d[2];
            var yearColumn = _lib2.default.getYearColumn();
            var year = _lib2.default.getColumnItem(yearColumn, yearIndex).value;
            var monthColumn = _lib2.default.getMonthColumn(year, isLunarCalendar);
            var _e = _lib2.default.getColumnItem(monthColumn, monthIndex),
                month = _e.value,
                isLeapMonth = _e.isLeap;
            var dayColumn = _lib2.default.getDayColumn(year, month, isLeapMonth, isLunarCalendar, isShowWeek);
            var day = _lib2.default.getColumnItem(dayColumn, dayIndex).value;
            this._render({
                year: year,
                month: month,
                day: day,
                isLeapMonth: isLeapMonth,
                isLunarCalendar: isLunarCalendar
            }, isShowWeek);
        },
        bindCancel: function bindCancel() {
            this._triggerRender();
        },
        bindChange: function bindChange() {
            var _a = this.data,
                objectMultiArray = _a.objectMultiArray,
                multiIndex = _a.multiIndex,
                isLunarCalendar = _a.isLunarCalendar;
            var yearColumn = objectMultiArray[0],
                monthColumn = objectMultiArray[1],
                dayColumn = objectMultiArray[2];
            var yearIndex = multiIndex[0],
                monthIndex = multiIndex[1],
                dayIndex = multiIndex[2];
            var year = _lib2.default.getColumnItem(yearColumn, yearIndex).value;
            var _b = _lib2.default.getColumnItem(monthColumn, monthIndex),
                month = _b.value,
                isLeapMonth = _b.isLeap;
            var day = _lib2.default.getColumnItem(dayColumn, dayIndex).value;
            var value = {
                year: year,
                month: month,
                day: day,
                isLeapMonth: isLeapMonth,
                isLunarCalendar: isLunarCalendar
            };
            this.triggerEvent('change', { value: value });
        }
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("./lib");

/***/ })
/******/ ]);