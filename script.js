"use strict";

const table = document.querySelector(".book-table");
const tbody = document.createElement("tbody");

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
  console.log(myLibrary);
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
