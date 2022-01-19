const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

btnTask.addEventListener('click', () => {
  createTask();
});

inputTask.addEventListener('keypress', (e) => {
  const keyPress = e.keyCode;
  const enterKeyCode = 13;

  if (keyPress === enterKeyCode) {
    createTask();
  }
});

document.addEventListener('click', (e) => {
  const element = e.target;

  if (element.classList.contains('btn-delete')) {
    element.parentElement.remove();
    refreshTaskList();
  }
});

function createTask() {
  const inputValue = inputTask.value;

  if (!inputValue) return;

  appendTask(inputValue);
}

function appendTask(task) {
  const li = createHtmlLi();

  li.innerText = task;
  tasks.appendChild(li);

  clearInput();
  createDeleteButton(li);
  refreshTaskList();
}

function createHtmlLi() {
  const li = document.createElement('li');
  return li;
}

function clearInput() {
  inputTask.value = '';
  inputTask.focus();
}

function createDeleteButton(li) {
  const deleteBtn = document.createElement('button');
  
  li.innerText += ' ';
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('class', 'btn-delete');
  li.appendChild(deleteBtn);
}

function refreshTaskList() {
  const liTasks = tasks.querySelectorAll('li');
  const taskList = [];

  for (let task of liTasks) {
    let taskTxt = task.innerText;
    taskTxt = taskTxt.replace('Delete', '').trim();
    taskList.push(taskTxt);
  }

  writeTaskInLocalStorage(taskList);
}

function writeTaskInLocalStorage(taskList) {
  const tasksJSON = JSON.stringify(taskList);
  localStorage.setItem('tasks', tasksJSON);
}

function readTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  const taskList = JSON.parse(tasks);

  for (let task of taskList) {
    appendTask(task);
  }
}
readTasksFromLocalStorage();
