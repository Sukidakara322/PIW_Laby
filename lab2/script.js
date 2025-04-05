"use strict";

const newListName = document.getElementById("newListName");
const createListButton = document.getElementById("createListButton");
const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const prioritySelector = document.getElementById("prioritySelector");
const listSelect = document.getElementById("listSelect");
const listsContainer = document.getElementById("listsContainer");
const searchInput = document.getElementById("searchInput");
const caseInsensitive = document.getElementById("caseInsensitive");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const modalConfirm = document.getElementById("modalConfirm");
const modalCancel = document.getElementById("modalCancel");

let lists = {};
let lastDeletedTask = null;
let onConfirmCallback = null;

function createList(name) {
  if (lists[name]) return;

  const listDiv = document.createElement("div");
  listDiv.classList.add("list");

  const title = document.createElement("h2");
  title.textContent = name;

  const listUL = document.createElement("ul");
  listUL.id = `list-${name}`;

  title.addEventListener("click", () => {
    listUL.classList.toggle("hidden");
  });

  listDiv.appendChild(title);
  listDiv.appendChild(listUL);
  listsContainer.appendChild(listDiv);

  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  listSelect.appendChild(option);

  lists[name] = [];
}

function addTask(text, priority, listName) {
  const li = document.createElement("li");
  li.classList.add(priority);

  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-button";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    showModal(text, () => {
      lastDeletedTask = { li, listName };
      lists[listName] = lists[listName].filter((item) => item !== li);
      renderList(listName);
    });
  };
  li.appendChild(deleteBtn);

  li.addEventListener("click", (e) => {
    if (e.target === deleteBtn) return;
    if (!li.classList.contains("done")) {
      li.classList.add("done");

      const date = document.createElement("span");
      date.className = "date";
      date.textContent = `(Completed: ${new Date().toLocaleString()})`;
      li.appendChild(date);
    } else {
      li.classList.remove("done");
      const date = li.querySelector(".date");
      if (date) date.remove();
    }
  });

  lists[listName].push(li);
  renderList(listName);
}

function renderList(name) {
  const listUL = document.getElementById(`list-${name}`);
  listUL.innerHTML = "";
  const searchText = searchInput.value;
  const insensitive = caseInsensitive.checked;

  lists[name].forEach((task) => {
    const content = task.querySelector("span").textContent;
    const match = insensitive
      ? content.toLowerCase().includes(searchText.toLowerCase())
      : content.includes(searchText);
    if (match) listUL.appendChild(task);
  });
}

createListButton.addEventListener("click", () => {
  const name = newListName.value.trim();
  if (name) {
    createList(name);
    newListName.value = "";
  }
});

addTaskButton.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const priority = prioritySelector.value;
  const listName = listSelect.value;
  if (!text || !listName) return;
  addTask(text, priority, listName);
  taskInput.value = "";
});

searchInput.addEventListener("input", () => {
  Object.keys(lists).forEach(renderList);
});

caseInsensitive.addEventListener("change", () => {
  Object.keys(lists).forEach(renderList);
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z" && lastDeletedTask) {
    const { li, listName } = lastDeletedTask;
    lists[listName].push(li);
    lastDeletedTask = null;
    renderList(listName);
  }
});

function showModal(taskText, onConfirm) {
  modalText.textContent = `Czy na pewno chcesz usunąć zadanie o treści: "${taskText}"?`;
  modal.classList.remove("hidden");
  onConfirmCallback = onConfirm;
}

modalConfirm.onclick = () => {
  if (onConfirmCallback) onConfirmCallback();
  modal.classList.add("hidden");
  onConfirmCallback = null;
};

modalCancel.onclick = () => {
  modal.classList.add("hidden");
  onConfirmCallback = null;
};
