"use strict";

const table = document.querySelector(".book-table");
const tbody = document.createElement("tbody");
const dispForm = document.querySelector(".bform");
const form = document.querySelector(".book");

let myLibrary = [];
function Book(title, author, pages, status) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("Harry Potter", "J.k.", 543, true);
const book2 = new Book("Game of thrones", "R.R.", 663, false);
addBookToLibrary(book1);
addBookToLibrary(book2);

//column for every row

function addingColmns(td, tr, key, value) {
  if (key === "id") return;
  else if (key === "status") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "myCheckboxName";

    if (value === true) checkbox.checked = true;
    else checkbox.checked = false;
    td.appendChild(checkbox);
  } else td.textContent = value;
  tr.appendChild(td);
}

//delete button for every row

function addDelBut(tr, id) {
  const td = document.createElement("td");
  const delButton = document.createElement("button");
  delButton.textContent = "Del";
  delButton.className = "btn2";
  delButton.id = id;
  td.appendChild(delButton);
  tr.appendChild(td);
  tbody.appendChild(tr);
}

//create table first time

function createTable() {
  for (let i = 0; i < myLibrary.length; i++) {
    const tr = document.createElement("tr");
    for (const [key, value] of Object.entries(myLibrary[i])) {
      const td = document.createElement("td");
      addingColmns(td, tr, key, value);
    }
    addDelBut(tr, myLibrary[i].id);
  }
  table.appendChild(tbody);
}
createTable();

//Delete Row

function deleteRow(btn) {
  const delEntry = btn.id;
  myLibrary = myLibrary.filter((obj) => obj.id !== delEntry);
  console.log(myLibrary);
  let row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

// Add new book to mylibrary
function appendNewBook() {
  const tr = document.createElement("tr");
  let entry = myLibrary[myLibrary.length - 1];
  for (const [key, value] of Object.entries(entry)) {
    const td = document.createElement("td");
    addingColmns(td, tr, key, value);
  }
  addDelBut(tr, entry.id);
  table.appendChild(tbody);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  let readStatus;
  if (data.status == "true") readStatus = true;
  else readStatus = false;
  const book = new Book(data.Book, data.Author, Number(data.Pages), readStatus);
  addBookToLibrary(book);
  appendNewBook();
  form.reset();
  dispForm.classList.add("hidden");
});

const btn = document.querySelectorAll(".btn");

btn.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (e.target.innerText === "Add Book") dispForm.classList.remove("hidden");
    else if (e.target.innerText === "Cancel") {
      e.preventDefault();
      form.reset();
      dispForm.classList.add("hidden");
    }
  })
);

table.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn2")) deleteRow(e.target);
});
