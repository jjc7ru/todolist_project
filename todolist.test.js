const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });
  
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('todolist is an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first element is todo1', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last element is todo3', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift gets the first element and removes it from the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pops the last element and removes it from the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('returns false if every todo is not done', () => {
    expect(list.isDone()).toBe(false);
  });

  test('throws TypeError when adding a non Todo object', () => {
    expect(() => list.add('hello')).toThrow(TypeError);
    expect(() => list.add(5)).toThrow(TypeError);
  });

  test('throws ReferenceError if invalid idx. Otherwise return the value', () => {
    expect(() => list.itemAt(100)).toThrow(ReferenceError);
    expect(list.itemAt(1)).toEqual(todo2);
  });

  test('throws ReferenceError if invalid idx. Otherwise marks todo done', () => {
    expect(() => list.markDoneAt(100)).toThrow(ReferenceError);
    
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('marks the item undone. throws Reference error if invalid idx', () => {
    expect(() => list.markUndoneAt(100)).toThrow(ReferenceError);

    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);

    list.markUndoneAt(1);
    
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('marks all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('throws ReferenceError if invalid idx. Otherwise, removes todo', () => {
    expect(() => list.removeAt(100)).toThrow(ReferenceError);

    let todo = list.removeAt(1);
    expect(todo).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });
  
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);

    let oneDoneString = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    list.markDoneAt(1);
    expect(list.toString()).toBe(oneDoneString);

    let allDoneString = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(allDoneString);
  });

  test('forEach works on TodoList', () => {
    let out = [];
    list.forEach(todo => out.push(todo));
    expect(out).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns TodoList with filtered todos', () => {
    list.markDoneAt(1);
    let filtered = list.filter(todo => todo.isDone());
    expect(filtered.toArray()).toEqual([todo2]);
    expect(filtered instanceof TodoList).toBe(true);
  });

  test('find by title in todo list and return the todo object', () => {
    expect(list.findByTitle('Clean room')).toEqual(todo2);
  });

  test('returns a TodoList list of todos that are done', () => {
    list.markDoneAt(1);
    expect(list.allDone().allDone().toArray()).toEqual([todo2]);
  });

  test('returns a TodoList list of todos that are not done', () => {
    list.markDoneAt(1);
    expect(list.allNotDone().toArray()).toEqual([todo1, todo3]);
  });
  
  test('marks todo by title', () => {
    list.markDone('Clean room');
    expect(todo2.isDone()).toBe(true);
    expect(list.markDone('Hello world')).toBe(undefined);
  });

  test('marks all todos as undone', () => {
    list.markAllDone();
    list.markAllUndone();
    expect(todo1.isDone()).toBe(false);
    expect(todo1.isDone()).toBe(false);
    expect(todo1.isDone()).toBe(false);
  });

});




















