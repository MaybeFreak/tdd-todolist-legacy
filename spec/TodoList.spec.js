const { TodoList, ToDoItem } = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it('creates a todo item', () => {
    // set up
    const expected = new ToDoItem(1, 'turn the heating on!')

    // execute
    const result = todoList.create('turn the heating on!')

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up
    const item1 = new ToDoItem(1, 'turn the heating on!')
    const item2 = new ToDoItem(2, 'Do the washing up')

    const expected = [item1, item2]

    // execute
    todoList.create('turn the heating on!')
    todoList.create('Do the washing up')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')

    const expected = new ToDoItem(1, 'turn the heating on!')
    expected.status = 'complete'

    // execute
    const result = todoList.updateStatus(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.updateStatus(1)).toThrowError('Item not found')
  })

  it('gets incomplete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.updateStatus(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus('incomplete')

    // verify
    expect(result).toEqual(expected)
  })

  it('gets complete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.updateStatus(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus('complete')

    // verify
    expect(result).toEqual(expected)
  })

  it('finds item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = new ToDoItem(1, 'turn the heating on!')

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('findBy throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  it('deletes item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = new ToDoItem(1, 'turn the heating on!')

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it('limit the text to 20 chars followed by ...', () => {
    //set up
    const item1 = todoList.create(
      'Some task with a very long text to test the limiting.'
    )
    const expected = new ToDoItem(1, 'Some task with a ver...')

    //execute
    const result = todoList.showAll()

    //verify
    expect(result).toEqual([expected])
  })

  it('should show the full text when returning a specific item', () => {
    //set up
    const item1 = todoList.create(
      'Some task with a very long text to test the limiting.'
    )
    const expected = new ToDoItem(
      1,
      'Some task with a very long text to test the limiting.'
    )

    //execute
    const result = todoList.findBy(1)

    //verify
    expect(result).toEqual(expected)
  })

  it('each item should have a date on when it was created', () => {
    //set up
    const item1 = todoList.create('this task should have a date')
    const expected = new Date().toLocaleDateString('de-DE')

    //execute
    const result = todoList.showAll()

    //verfiy
    expect(result[0].date).toEqual(expected)
  })

  it('can search by date', () => {
    //set up
    const item1 = todoList.create('item we want')
    const item2 = todoList.create('item we dont want')
    todoList.items[1].date = '3.3.2023'

    const expected = new ToDoItem(1, 'item we want')

    //exectue
    const result = todoList.searchByDate(new Date().toLocaleDateString('de-DE'))

    //verify
    expect(result).toEqual([expected])
  })

  it('should be able to update the status of a task', () => {
    //set up
    const item1 = {
      id: 1,
      text: 'update me',
      status: 'complete',
      date: new Date().toLocaleDateString('de-DE')
    }
    todoList.items.push(item1)
    const expected = {
      id: 1,
      text: 'update me',
      status: 'incomplete',
      date: new Date().toLocaleDateString('de-DE')
    }

    //execute
    const result = todoList.updateStatus(1)

    //verify
    expect(result).toEqual(expected)
  })

  it('should be able to update text', () => {
    //setup
    const item1 = {
      id: 1,
      text: 'update me',
      status: 'incomplete',
      date: new Date().toLocaleDateString('de-DE')
    }
    todoList.items.push(item1)
    const expected = {
      id: 1,
      text: 'i am updated',
      status: 'incomplete',
      date: new Date().toLocaleDateString('de-DE')
    }

    //execute
    const result = todoList.updateText(1, expected.text)

    //verify
    expect(result).toEqual(expected)
  })
})
