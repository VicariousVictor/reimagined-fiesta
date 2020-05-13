// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
  let oranges = document.getElementById("update").value;
  let peach = document.getElementById("delete").value;
  fetch('/', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      toNotDoList: peach,
      toDoList: oranges,
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
  let apples = document.getElementById("delete").value;
  console.log(apples);
  fetch('/', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      toDoList: apples
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No CIT Student quotes to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(console.error)
})
