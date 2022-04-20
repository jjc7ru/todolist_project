// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.
const Todo = require("./todo.js");

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError("can only add Todo objects");
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  };

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  };

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  forEach(callback) {
    return this.todos.forEach(callback);
  }

  filter(callback) {
    let list = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        list.add(todo);
      }
    });
    return list;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  };

  allDone() {
    return this.filter(todo => todo.isDone());
  };

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  };

  markDone(title) {
    let todo = this.findByTitle(title);
    if (!todo) return;
    todo.markDone();
  };

  markAllDone() {
    this.forEach(todo => todo.markDone());
  };

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  };

  _validateIndex(index) { // _ in name suggests a "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join('\n');
    return title + '\n' + list;
  }
  
  toArray() {
    return this.todos.slice();
  };
}

module.exports = TodoList;
