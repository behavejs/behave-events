"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _get = function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

var _inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) subClass.__proto__ = superClass;
};

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var EventEmitter = _interopRequire(require("events"));

var defer = require("Q").defer;
var BehaveEvents = (function (EventEmitter) {
  function BehaveEvents() {
    _get(Object.getPrototypeOf(BehaveEvents.prototype), "constructor", this).apply(this, arguments);

    this.__transactions = {};
    this.__responses = {};
    this.__commands = {};
  }

  _inherits(BehaveEvents, EventEmitter);

  _prototypeProperties(BehaveEvents, null, {
    transaction: {
      value: function transaction(id, fn) {
        if (this.__transactions[id]) throw new Error("duplicate transactions!");
        if (typeof fn !== "function") throw new Error("handler must be a function!");
        this.__transactions[id] = fn;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    transact: {
      value: function transact(id) {
        var opts = arguments[1] === undefined ? {} : arguments[1];
        if (!this.__transactions[id]) return;
        var deferred = defer();
        this.__transactions[id](opts, deferred.resolve, deferred.reject);
        return deferred.promise;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    stopTransacting: {
      value: function stopTransacting(id) {
        delete this.__transactions[id];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    response: {
      value: function response(id, fn) {
        if (this.__responses[id]) throw new Error("duplicate responses!");
        if (typeof fn !== "function") throw new Error("handler must be a function!");
        this.__responses[id] = fn;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    request: {
      value: function request(id) {
        if (!this.__responses[id]) return;
        return this.__responses[id]();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    stopResponding: {
      value: function stopResponding(id) {
        delete this.__responses[id];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    command: {
      value: function command(id, fn) {
        if (this.__commands[id]) throw new Error("duplicate commands!");
        if (typeof fn !== "function") throw new Error("handler must be a function!");
        this.__commands[id] = fn;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    execute: {
      value: function execute(id) {
        var opts = arguments[1] === undefined ? {} : arguments[1];
        if (!this.__commands[id]) return;
        this.__commands[id](opts);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    stopExecuting: {
      value: function stopExecuting(id) {
        delete this.__commands[id];
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return BehaveEvents;
})(EventEmitter);

module.exports = BehaveEvents;