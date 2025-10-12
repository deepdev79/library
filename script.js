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

function createTable() {
  // myLibrary.forEach((element) => {
  //   const tr = document.createElement("tr");
  //   Object.values(element).forEach((value) => {
  //     const td = document.createElement("td");
  //     if (typeof value === "boolean") {
  // const checkbox = document.createElement("input");
  // checkbox.type = "checkbox";
  // checkbox.name = "myCheckboxName";
  // if (value === true) checkbox.checked = true;
  // else checkbox.checked = false;
  // td.appendChild(checkbox);
  //     } else td.textContent = value;
  //     tr.appendChild(td);
  //   });
  //   tbody.appendChild(tr);
  // });

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

  function addDelBut(tr, id) {
    const td = document.createElement("td");
    const delButton = document.createElement("button");
    delButton.textContent = "Del";
    delButton.className = "btn";
    delButton.id = id;
    td.appendChild(delButton);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const tr = document.createElement("tr");
    for (const [key, value] of Object.entries(myLibrary[i])) {
      const td = document.createElement("td");
      addingColmns(td, tr, key, value);
      // if (key === "id") continue;
      // else if (key === "status") {
      //   const checkbox = document.createElement("input");
      //   checkbox.type = "checkbox";
      //   checkbox.name = "myCheckboxName";
      //   if (value === true) checkbox.checked = true;
      //   else checkbox.checked = false;
      //   td.appendChild(checkbox);
      // } else td.textContent = value;
      // tr.appendChild(td);
    }
    // console.log(myLibrary[i].id);
    addDelBut(tr, myLibrary[i].id);
  }
  table.appendChild(tbody);
}
createTable();

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

// btn.addEventListener("click", () => {
//   dispForm.classList.remove("hidden");
// });

function deleteRow(btn) {
  const delEntry = btn.id;
  myLibrary = myLibrary.filter((obj) => obj.id !== delEntry);
  console.log(myLibrary);

  let row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

const btn = document.querySelectorAll(".btn");
btn.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (e.target.innerText === "Add Book") dispForm.classList.remove("hidden");
    else if (e.target.innerText === "Del") {
      deleteRow(button);
    }
  })
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  const book = new Book(
    data.Book,
    data.Author,
    Number(data.Pages),
    data.status
  );
  addBookToLibrary(book);
  appendNewBook();
  console.log(myLibrary);
  form.reset();
  dispForm.classList.add("hidden");
});
