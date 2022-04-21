"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.
var Todo = require("./todo.js");

var TodoList = /*#__PURE__*/function () {
  function TodoList(title) {
    _classCallCheck(this, TodoList);

    this.title = title;
    this.todos = [];
  }

  _createClass(TodoList, [{
    key: "add",
    value: function add(todo) {
      if (todo instanceof Todo) {
        this.todos.push(todo);
      } else {
        throw new TypeError("can only add Todo objects");
      }
    }
  }, {
    key: "size",
    value: function size() {
      return this.todos.length;
    }
  }, {
    key: "first",
    value: function first() {
      return this.todos[0];
    }
  }, {
    key: "last",
    value: function last() {
      return this.todos[this.size() - 1];
    }
  }, {
    key: "itemAt",
    value: function itemAt(index) {
      this._validateIndex(index);

      return this.todos[index];
    }
  }, {
    key: "markDoneAt",
    value: function markDoneAt(index) {
      this.itemAt(index).markDone();
    }
  }, {
    key: "markUndoneAt",
    value: function markUndoneAt(index) {
      this.itemAt(index).markUndone();
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.todos.every(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "shift",
    value: function shift() {
      return this.todos.shift();
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.todos.pop();
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      this._validateIndex(index);

      return this.todos.splice(index, 1);
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      return this.todos.forEach(callback);
    }
  }, {
    key: "filter",
    value: function filter(callback) {
      var list = new TodoList(this.title);
      this.forEach(function (todo) {
        if (callback(todo)) {
          list.add(todo);
        }
      });
      return list;
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(title) {
      return this.filter(function (todo) {
        return todo.getTitle() === title;
      }).first();
    }
  }, {
    key: "allDone",
    value: function allDone() {
      return this.filter(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "allNotDone",
    value: function allNotDone() {
      return this.filter(function (todo) {
        return !todo.isDone();
      });
    }
  }, {
    key: "markDone",
    value: function markDone(title) {
      var todo = this.findByTitle(title);
      if (!todo) return;
      todo.markDone();
    }
  }, {
    key: "markAllDone",
    value: function markAllDone() {
      this.forEach(function (todo) {
        return todo.markDone();
      });
    }
  }, {
    key: "markAllUndone",
    value: function markAllUndone() {
      this.forEach(function (todo) {
        return todo.markUndone();
      });
    }
  }, {
    key: "_validateIndex",
    value: function _validateIndex(index) {
      // _ in name suggests a "private" method
      if (!(index in this.todos)) {
        throw new ReferenceError("invalid index: ".concat(index));
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      var title = "---- ".concat(this.title, " ----");
      var list = this.todos.map(function (todo) {
        return todo.toString();
      }).join('\n');
      return title + '\n' + list;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.todos.slice();
    }
  }]);

  return TodoList;
}();

module.exports = TodoList;