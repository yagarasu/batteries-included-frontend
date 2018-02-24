webpackJsonp([0],{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Application = __webpack_require__(16);

var _Application2 = _interopRequireDefault(_Application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _Application2.default();

app.mount(document.getElementById('app'));

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(2);

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getPackageWeight = function getPackageWeight(packageInstance) {
  return packageInstance.info && packageInstance.info.weight || 0;
};

var Application = function () {
  function Application() {
    _classCallCheck(this, Application);

    this.packages = {};
    this.flags = {
      bootstrapped: false
    };
  }

  _createClass(Application, [{
    key: 'is',
    value: function is(flag) {
      return this.flags[flag] || false;
    }
  }, {
    key: 'mark',
    value: function mark(flag) {
      this.flags[flag] = true;
    }
  }, {
    key: 'unmark',
    value: function unmark(flag) {
      this.flags[flag] = false;
    }
  }, {
    key: 'bootstrap',
    value: function bootstrap() {
      this.invokeHook('prebootstrap');
      // Create history
      // Bootstrap services
      this.mark('bootstrapped');
      this.invokeHook('postbootstrap');
    }
  }, {
    key: 'mount',
    value: function mount(domElement) {
      // ReactDOM
      _reactDom2.default.render(React.createElement(
        'div',
        null,
        'ok'
      ), domElement);
    }
  }, {
    key: 'register',
    value: function register(PackageClass) {
      if (this.is('bootstrapped')) {
        throw new Error('Registering packages must occur before bootstrapping.');
      }
      var packageName = PackageClass.name;
      if (this.packages[packageName]) {
        throw new Error('Package "' + packageName + '" already registered.');
      }
      this.packages[packageName] = new PackageClass(this);
      return this;
    }
  }, {
    key: 'registerMany',
    value: function registerMany(packageClasses) {
      var _this = this;

      if (this.is('bootstrapped')) {
        throw new Error('Registering packages must occur before bootstrapping.');
      }
      packageClasses.forEach(function (packageClass) {
        return _this.register(packageClass);
      });
    }
  }, {
    key: 'resolve',
    value: function resolve(packageName) {
      if (this.packages[packageName]) {
        return this.packages[packageName];
      }
      throw new Error('Package "' + packageName + '" is not registered.');
    }
  }, {
    key: 'getSortedPackages',
    value: function getSortedPackages() {
      return Object.values(this.packages).sort(function (a, b) {
        var aw = getPackageWeight(a);
        var bw = getPackageWeight(b);
        return bw - aw;
      });
    }
  }, {
    key: 'invokeHook',
    value: function invokeHook(hook) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      this.getSortedPackages().forEach(function (packageInstance) {
        if (typeof pacpackageInstancekage[hook] === 'function') packageInstance[hook].apply(packageInstance, params);
      });
    }
  }, {
    key: 'composeHook',
    value: function composeHook(hook) {
      for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      this.getSortedPackages().reduce(function (prev, packageInstance) {
        if (typeof packageInstance[hook] === 'function') {
          return [].concat(_toConsumableArray(prev), _toConsumableArray(packageInstance[hook].apply(packageInstance, params)));
        }
        return prev;
      }, []);
    }
  }, {
    key: 'mergeHook',
    value: function mergeHook(hook) {
      for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        params[_key3 - 1] = arguments[_key3];
      }

      this.getSortedPackages().reduce(function (prev, packageInstance) {
        if (typeof packageInstance[hook] === 'function') {
          return _extends({}, prev, packageInstance[hook].apply(packageInstance, params));
        }
        return prev;
      });
    }
  }, {
    key: 'perPackageHook',
    value: function perPackageHook(hook) {
      for (var _len4 = arguments.length, params = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        params[_key4 - 1] = arguments[_key4];
      }

      this.getSortedPackages().reduce(function (prev, packageInstance) {
        var packageName = packageInstance.name;
        if (typeof packageInstance[hook] === 'function') {
          return _extends({}, prev, _defineProperty({}, packageName, packageInstance[hook].apply(packageInstance, params)));
        }
        return prev;
      });
    }
  }]);

  return Application;
}();

exports.default = Application;

/***/ })

},[15]);