"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; } // src/index.js
// Export the component so it can be imported by other applications
var _default = exports["default"] = _App["default"]; // If using as a standalone app too
if (document.getElementById('root')) {
  // Use dynamic import with the modern JSX transform
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require('react'));
  }).then(function (React) {
    Promise.resolve().then(function () {
      return _interopRequireWildcard(require('react-dom/client'));
    }).then(function (_ref) {
      var createRoot = _ref.createRoot;
      var root = createRoot(document.getElementById('root'));
      root.render(React.createElement(_App["default"]));
    });
  });
}