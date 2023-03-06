// Add your domain model below

| Objects  | Properties            | Messages               | Notes                                                           | Scenario              | Output                             | Example                                                                        |
| -------- | --------------------- | ---------------------- | --------------------------------------------------------------- | --------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| TodoList | id @Int, items @Array | create(@String)        | id increments, status starts off incomplete, adds item to array |                       | todo item                          | `create('hello') => {id: 1, text: "hello", status: "incomplete"}`              |
|          |                       | showAll()              |                                                                 |                       | all items                          | `showAll() => [{id: 1, text: "hello", status: "incomplete"}]`                  |
|          |                       |                        | only return first 20 chars                                      | item.text.length > 20 | first 20 chars of text + ...       | `showAll() => [{id: 1, text: "Some task with a ver...", status: "incomplete"}] |
|          |                       | updateStatus(@Int)     | finds item, then updates status property                        | item exists           | updated todo item                  | `updateStatus(1) => {id: 1, text: "hello", status: "complete"}`                |
|          |                       |                        |                                                                 | item does not exist   | thrown error                       | `updateStatus(1) => thrown error "Item not Found"`                             |
|          |                       | getByStatus(@String)   |                                                                 |                       | array, filtered by property status | `getByStatus("incomplete") => [{id: 1, text: "hello", status: "incomplete"}]`  |
|          |                       | findBy(@Int)           |                                                                 | item exists           | item                               | `findBy(1) => {id: 1, text: "hello", status: "incomplete"}`                    |
|          |                       |                        |                                                                 | item does not exist   | thrown error                       | `findBy(1) => thrown error "Item not Found"`                                   |
|          |                       | deleteBy(@Int)         | finds item, then removes it from array                          | item exists           | item                               | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete"}`               |
|          |                       |                        |                                                                 | item does not exist   | thrown error                       | `deleteBy(@Int) => thrown error "Item not Found"`                              |
|          |                       | updateText(@Int, @str) | should update the text by id                                    | item exists           | updated item                       | `updateText(@int, @str) => {id: 1, text: 'updated text', status: incomplete}   |

---Converting the to do item to a class

CLASS ToDoItem
PROPERTIES

- id: @integer
- text: @string
- status: @string
- date: @string
