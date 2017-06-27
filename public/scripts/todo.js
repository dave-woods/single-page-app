function updateTodos () {
  const xhr = new XMLHttpRequest()
  xhr.open("POST", "/successive/todo", true)
  xhr.setRequestHeader("Content-type", "application/json")
  xhr.send(JSON.stringify(todos, null, 2))
}
function completeTask (e) {
  this.innerHTML = this.innerHTML === 'false' ? 'true' : 'false'
  const list = Array.prototype.slice.call(document.querySelectorAll('.todo'), 0)
  const idx = list.indexOf(this.parentNode.parentNode)
  todos[idx].completed = this.innerHTML
  updateTodos()
}
function removeTask (e) {
  const list = Array.prototype.slice.call(document.querySelectorAll('.todo'), 0)
  const idx = list.indexOf(this.parentNode.parentNode)
  todos.splice(idx, 1)
  document.querySelector('.todos').removeChild(this.parentNode.parentNode)
  updateTodos()
}
document.querySelectorAll('.todo').forEach(elem => {
  elem.querySelector('.completed').addEventListener('click', completeTask)
  elem.querySelector('.remove').addEventListener('click', removeTask)
})
document.querySelector('.add-new-item').addEventListener('click', function (e) {
  const input = document.querySelector('.new-item')
  if (!input.value)
    return
  const li = document.createElement('li')
  li.className = 'todo'
  const s1 = document.createElement('span')
  const s = document.createElement('span')
  const s2 = document.createElement('span')
  const s3 = document.createElement('span')
  s1.className = 'desc'
  s2.className = 'completed'
  s3.className = 'remove'
  s2.setAttribute('title', 'Complete Item')
  s3.setAttribute('title', 'Remove Item')
  s2.addEventListener('click', completeTask)
  s3.addEventListener('click', removeTask)
  s1.appendChild(document.createTextNode(input.value))
  s2.appendChild(document.createTextNode('false'))
  s3.appendChild(document.createTextNode('✕'))
  li.appendChild(s1)
  s.appendChild(s2)
  s.appendChild(s3)
  li.appendChild(s)
  document.querySelector('.todos').appendChild(li)
  todos.push({
    "desc": input.value,
    "completed": "false"
  })
  input.value = ''
  updateTodos()
})
