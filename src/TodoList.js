class ToDoItem {
  constructor(id, text) {
    this.id = id
    this.text = text
    this.status = 'incomplete'
    this.date = new Date().toLocaleDateString('de-DE')
  }
}

class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const item = new ToDoItem(this.id, str)
    this.items.push(item)
    return item
  }

  showAll() {
    const res = this.items.map((item) => item)

    res.forEach((item) => {
      if (item.text.length > 20) {
        item.text = item.text.slice(0, 20) + '...'
      }
    })

    return res
  }

  updateStatus(id) {
    const item = this.findBy(id)
    item.status = item.status === 'incomplete' ? 'complete' : 'incomplete'
    return item
  }

  getByStatus(status) {
    return this.items.filter((item) => item.status === status)
  }

  findBy(id) {
    const item = this.items.find((item) => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }

  updateText(id, text) {
    const item = this.findBy(id)
    item.text = text
    return item
  }

  searchByDate(date) {
    const res = this.items.filter((item) => item.date === date)
    return res
  }
}

module.exports = { TodoList, ToDoItem }
