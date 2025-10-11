"use strict";

const table = document.querySelector(".book-table");
const tbody = document.createElement("tbody");
const btn = document.querySelector(".btn");
const dispForm = document.querySelector(".bform");
const form = document.querySelector(".book");

const myLibrary = [];
function Book(title, author, pages, status, pending) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.pending = pending;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("Harry Potter", "J.k.", 543, true, "pen");
const book2 = new Book("Game of thrones", "R.R.", 663, false, "pen");
addBookToLibrary(book1);
addBookToLibrary(book2);

function createTable() {
  myLibrary.forEach((element) => {
    const tr = document.createElement("tr");
    Object.values(element).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}
createTable();

function appendNewBook() {
  const tr = document.createElement("tr");
  let entry = myLibrary[myLibrary.length - 1];
  Object.values(entry).forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
  table.appendChild(tbody);
}

btn.addEventListener("click", () => {
  dispForm.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  const book = new Book(
    data.Book,
    data.Author,
    Number(data.Pages),
    data.status,
    "pen"
  );
  addBookToLibrary(book);
  appendNewBook();
  console.log(myLibrary);
  form.reset();
  dispForm.classList.add("hidden");
});
