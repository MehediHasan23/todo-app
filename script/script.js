(function () {

  let task = document.getElementById('task')
  let btn = document.getElementById('btn')
  let taskList = document.getElementById('task__list')



  /* added event in task input field */

  task.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      let taskInput = (task.value).toUpperCase().trim();
      if ((!taskInput)) {
        alert('Plz give minimum a task')
        return;
      }
      addItem(taskInput)
      task.value = '';
    }
  })

  /* added event in add-btn */

  btn.addEventListener('click', function (e) {
    let taskInput = (task.value).toUpperCase().trim();
    if ((!taskInput)) {
      alert('Plz give minimum a task')
      return;
    }
    addItem(taskInput)
    task.value = '';
  })


  /* added New Item */

  function addItem(newTask) {
    let item = document.createElement('div')
    item.className = 'item'
    item.innerHTML = `
          <li>${newTask}</li>
          <button class="edit"><i class="fas fa-pen"></i></button>
          <button class="check"><i class="fas fa-check"></i></button>
          <button class="delete"><i class="fas fa-trash"></i></button>`

    taskList.appendChild(item)

    let tasks = getDataLocalStorage()
    let uniqueName = newTask;
    tasks.forEach((task) => {
      if (task.trim() === newTask) {
        uniqueName += ' '
      }
    })
    tasks.push(uniqueName)
    setDataLocalStorage(tasks)

  }


  /* added event in task-List */

  taskList.addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
      deleteItem(e)
    }
    else if (e.target.className === 'check') {
      completed(e)
    }
    if (e.target.className === 'edit') {
      edit(e)
    }
  })


  /* delete item */

  function deleteItem(e) {
    e.target.parentElement.remove()
    let task = e.target.parentElement.firstElementChild.innerHTML
    deleteDataFromLocalStorage(task)
  }

  /* delete data from localStorage */

  function deleteDataFromLocalStorage(task) {

    let tasks = getDataLocalStorage()
    console.log(tasks);
    let index = tasks.indexOf(task)
    tasks.splice(index, 1)
    setDataLocalStorage(tasks)
  }



  /* completed item */

  function completed(e) {
    e.target.parentElement.firstElementChild.classList.toggle('complete__task');
  }



  /* edit item */

  function edit(e) {
    let li = e.target.parentElement.firstElementChild;
    let oldText = li.innerHTML;
    li.innerHTML = ''


    /* create a input field */
    let input = document.createElement('input');
    input.type = 'text'
    input.classList = 'edit__input';
    li.appendChild(input)
    input.value = oldText;
    e.target.style.display = 'none'

    input.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        li.innerHTML = event.target.value.toUpperCase();
        e.target.style.display = 'inline'
      }
    })
  }



  /* local storage */

  // onload function 
  window.onload = function (e) {
    let tasks = getDataLocalStorage()
    tasks.forEach((task) => {
      showData(task)
    })

  }

  /* get item from local storage */
  function getDataLocalStorage() {
    let tasks;

    let item = (localStorage.getItem('tasks'))

    if (item) {
      tasks = JSON.parse(item)
    } else {
      tasks = []
    }
    return tasks;
  }


  /* show data in UI */
  function showData(task) {
    let item = document.createElement('div')
    item.className = 'item'
    item.innerHTML = `
          <li>${task}</li>
          <button class="edit"><i class="fas fa-pen"></i></button>
          <button class="check"><i class="fas fa-check"></i></button>
          <button class="delete"><i class="fas fa-trash"></i></button>`

    taskList.appendChild(item)
  }


  /* set data in local storage */

  function setDataLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

})()
