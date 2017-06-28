/* global todos */

function updateTodos () {
  const xhr = new window.XMLHttpRequest()
  xhr.open('POST', '/successive/todo', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(todos, null, 2))
}
function completeTask (e) {
  this.textContent = this.textContent === 'false' ? 'true' : 'false'
  const list = Array.prototype.slice.call(document.querySelectorAll('.todo'), 0)
  const idx = list.indexOf(this.parentNode)
  todos[idx].completed = this.textContent
  updateTodos()
}
function removeTask (e) {
  const list = Array.prototype.slice.call(document.querySelectorAll('.todo'), 0)
  const idx = list.indexOf(this.parentNode)
  todos.splice(idx, 1)
  document.querySelector('.todos').removeChild(this.parentNode)
  updateTodos()
}
function editTask (e) {
  const list = Array.prototype.slice.call(document.querySelectorAll('.todo'), 0)
  const idx = list.indexOf(this.parentNode)
  const elem = this.parentNode.querySelector('.desc')
  elem.setAttribute('contenteditable', true)
  elem.focus()
  const confirmEdit = () => {
    elem.setAttribute('contenteditable', false)
    elem.removeEventListener('blur', confirmEdit)
    todos[idx].desc = elem.textContent
    updateTodos()
  }
  elem.addEventListener('blur', confirmEdit)
}

document.querySelectorAll('.todo').forEach(elem => {
  elem.querySelector('.completed').addEventListener('click', completeTask)
  elem.querySelector('.remove').addEventListener('click', removeTask)
  elem.querySelector('.edit').addEventListener('click', editTask)
})
document.querySelector('.add-new-item').addEventListener('click', function (e) {
  const input = document.querySelector('.new-item')
  if (!input.value) {
    return
  }
  const li = document.createElement('li')
  li.className = 'todo'
  const s0 = document.createElement('span')
  const s1 = document.createElement('span')
  const s2 = document.createElement('span')
  const s3 = document.createElement('span')
  s0.className = 'edit'
  s1.className = 'desc'
  s2.className = 'completed'
  s3.className = 'remove'
  s0.setAttribute('title', 'Edit Item')
  s2.setAttribute('title', 'Complete Item')
  s3.setAttribute('title', 'Remove Item')
  s0.addEventListener('click', editTask)
  s2.addEventListener('click', completeTask)
  s3.addEventListener('click', removeTask)
  s0.appendChild(document.createTextNode('&#9998'))
  s1.appendChild(document.createTextNode(input.value))
  s2.appendChild(document.createTextNode('false'))
  s3.appendChild(document.createTextNode('✕'))
  li.appendChild(s0)
  li.appendChild(s1)
  li.appendChild(s2)
  li.appendChild(s3)
  document.querySelector('.todos').appendChild(li)
  todos.push({
    'desc': input.value,
    'completed': 'false'
  })
  input.value = ''
  updateTodos()
})
