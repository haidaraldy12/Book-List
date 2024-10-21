// document.addEventListener('DOMContentLoaded', function () {
//   const submitForm = document.getElementById('bookForm');
//   submitForm.addEventListener('submit', function (event) {
//       event.preventDefault();
//       addTodo();
//   });
// });

// // Variabel tampungan todo
// const todos = [];

// // Definisikan custom-event dengan nama render-todo
// const RENDER_EVENT = 'render-todo';

// // Membuat fungsi addTodo
// function addTodo() {
//   const title = document.getElementById('bookFormTitle').value;
//   const author = document.getElementById('bookFormAuthor').value;
//   const year = document.getElementById('bookFormYear').value;
//   const isCompleted = document.getElementById('bookFormIsComplete').checked;

//   const generatedID = generateID();
//   const todoObject = generateTodoObject(generatedID, title, author, year, isCompleted);
//   todos.push(todoObject);

//   document.dispatchEvent(new Event(RENDER_EVENT));

//   // Reset form input setelah submit
//   document.getElementById('bookFormTitle').value = "";
//   document.getElementById('bookFormAuthor').value = "";
//   document.getElementById('bookFormYear').value = "";
//   document.getElementById('bookFormIsComplete').checked = false;
// }

// // Membuat Unique ID
// function generateID() {
//   return +new Date();
// }

// function generateTodoObject(id, title, author, year, isCompleted) {
//   return {
//       id,
//       title,
//       author,
//       year,
//       isCompleted,
//   };
// }



// document.addEventListener(RENDER_EVENT, function (e) {
//   console.log(todos);
//   const unCompletedTODOList = document.querySelector('.belumSelesai');
//   const completedTODOList = document.querySelector('.selesai');

//   // Kosongkan list buku yang sudah ada sebelumnya tanpa menghapus <h2>
//   const incompleteBookItems = unCompletedTODOList.querySelectorAll('[data-bookid]');
//   incompleteBookItems.forEach(item => item.remove());

//   completedTODOList.innerHTML = "";  // Bagian selesai bisa tetap kosongkan karena tidak ada judul tetap

//   for (const todoItem of todos) {
//       const todoElement = makeTodo(todoItem);

//       if (!todoItem.isCompleted) {
//           unCompletedTODOList.append(todoElement);
//       } else {
//           completedTODOList.append(todoElement);
//       }
//   }
//   e.preventDefault();
// });

// // document.addEventListener(RENDER_EVENT, function (e) {
// //   const unCompletedTODOList = document.querySelector('.belumSelesai');
// //   const completedTODOList = document.querySelector('.selesai');

// //   // Kosongkan list terlebih dahulu
// //   unCompletedTODOList.innerHTML = '';
// //   completedTODOList.innerHTML = '';

// //   for (const todoItem of todos) {
// //     const todoElement = makeTodo(todoItem);
// //     e.preventDefault();

// //     if (!todoItem.isCompleted) {
// //       unCompletedTODOList.append(todoElement);
// //     } else {
// //       completedTODOList.append(todoElement);
// //     }
// //   }
// // });


// function makeTodo(todoObject) {
//   // const section = document.createElement('section');
//   // section.classList.add('belumSelesai');

//   // const judulH2 = document.createElement('h2');
//   // judulH2.innerHTML = 'Belum Selesai Dibaca';

//   // section.append(judulH2);

//   const container = document.createElement('div');
//   container.id = 'incompleteBookList';

//   const bookElement = document.createElement('div');
//   bookElement.setAttribute('data-bookid', todoObject.id);
//   bookElement.setAttribute('data-testid', 'bookItem');

//   const bookTitle = document.createElement('h3');
//   bookTitle.setAttribute('data-testid', 'bookItemTitle');
//   bookTitle.innerText = todoObject.title;

//   const bookAuthor = document.createElement('p');
//   bookAuthor.setAttribute('data-testid', 'bookItemAuthor');
//   bookAuthor.innerText = `Penulis : ${todoObject.author}`;

//   const bookYear = document.createElement('p');
//   bookYear.setAttribute('data-testid', 'bookItemYear');
//   bookYear.innerText = `Tahun : ${todoObject.year}`; 

//   const buttonContainer = document.createElement('div');

//   const completedButton = document.createElement('button');
//   completedButton.classList.add('completedButton');
//   completedButton.setAttribute('data-testid', 'bookItemIsCompleteButton');

//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('deleteButton');
//   deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');

//   const editButton = document.createElement('button');
//   editButton.classList.add('editButton');
//   editButton.setAttribute('data-testid', 'bookItemEditButton');

//   completedButton.innerText = "Selesai Dibaca";
//   deleteButton.innerText = "Hapus Buku";
//   editButton.innerText = "Edit Buku";


//   buttonContainer.appendChild(completedButton);
//   buttonContainer.appendChild(deleteButton);
//   buttonContainer.appendChild(editButton);

//   bookElement.append(bookTitle);
//   bookElement.append(bookAuthor);
//   bookElement.append(bookYear);

//   bookElement.append(buttonContainer);

//   container.append(bookElement);
//   // section.appendChild(container);

//   return container;
// }


// document.addEventListener("DOMContentLoaded", function () {
//   const bookForm = document.getElementById("bookForm");
//   const incompleteBookList = document.querySelector(".belumSelesai");
//   const completeBookList = document.querySelector(".selesai");
//   const searchForm = document.getElementById("searchBook");
//   let editingBook = null;

//   // Muat buku dari local storage
//   loadBooksFromStorage();

//   // Fungsi submit form buku
//   bookForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const title = document.getElementById("bookFormTitle").value;
//     const author = document.getElementById("bookFormAuthor").value;
//     const year = document.getElementById("bookFormYear").value;
//     let isComplete = document.getElementById("bookFormIsComplete").checked;

//     if (editingBook) {
//       updateBook(editingBook, title, author, year, isComplete);
//       bookForm.reset();
//       editingBook = null;
//       saveBooksToStorage();
//       return;
//     }

//     const bookItem = createBookItem(title, author, year, isComplete);
//     if (isComplete) {
//       completeBookList.appendChild(bookItem);
//     } else {
//       incompleteBookList.appendChild(bookItem);
//     }

//     bookForm.reset();
//     saveBooksToStorage();
//   });

//   // Fungsi untuk pencarian buku berdasarkan judul
//   searchForm.addEventListener("submit", function (e) {
//     e.preventDefault();
    
//     const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();
//     const allBooks = document.querySelectorAll(".bookItem");

//     allBooks.forEach(function (book) {
//       const bookTitle = book.querySelector("h3").textContent.toLowerCase();
//       if (bookTitle.includes(searchTitle)) {
//         book.style.display = "block"; // Tampilkan buku jika sesuai dengan pencarian
//       } else {
//         book.style.display = "none"; // Sembunyikan buku jika tidak sesuai
//       }
//     });
//   });

//   // Fungsi untuk membuat elemen buku
//   function createBookItem(title, author, year, isComplete) {
//     const bookItem = document.createElement("div");
//     bookItem.classList.add("bookItem");
//     bookItem.classList.add("card");

//     const bookTitle = document.createElement("h3");
//     bookTitle.textContent = title;

//     const bookAuthor = document.createElement("p");
//     bookAuthor.textContent = `Penulis: ${author}`;

//     const bookYear = document.createElement("p");
//     bookYear.textContent = `Tahun: ${year}`;

//     const buttonContainer = document.createElement("div");

//     const completeButton = document.createElement("button");
//     completeButton.textContent = isComplete ? "Belum Selesai dibaca" : "Selesai dibaca";
//     completeButton.classList.add(isComplete ? "greenButton" : "greenButton");

//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Hapus Buku";
//     deleteButton.classList.add("redButton");

//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit Buku";
//     editButton.classList.add("orangeButton");

//     buttonContainer.appendChild(completeButton);
//     buttonContainer.appendChild(deleteButton);
//     buttonContainer.appendChild(editButton);

//     bookItem.appendChild(bookTitle);
//     bookItem.appendChild(bookAuthor);
//     bookItem.appendChild(bookYear);
//     bookItem.appendChild(buttonContainer);

//     completeButton.addEventListener("click", function () {
//       if (isComplete) {
//         incompleteBookList.appendChild(bookItem);
//         completeButton.textContent = "Selesai dibaca";
//       } else {
//         completeBookList.appendChild(bookItem);
//         completeButton.textContent = "Belum Selesai dibaca";
//       }
//       isComplete = !isComplete;
//       saveBooksToStorage(); // Simpan ke local storage saat status diubah
//     });

//     deleteButton.addEventListener("click", function () {
//       bookItem.remove();
//       saveBooksToStorage(); // Simpan ke local storage setelah dihapus
//     });

//     editButton.addEventListener("click", function () {
//       editBook(bookItem, title, author, year, isComplete);
//     });

//     return bookItem;
//   }

//   function editBook(bookItem, title, author, year, isComplete) {
//     document.getElementById("bookFormTitle").value = title;
//     document.getElementById("bookFormAuthor").value = author;
//     document.getElementById("bookFormYear").value = year;
//     document.getElementById("bookFormIsComplete").checked = isComplete;

//     editingBook = bookItem;
//   }

//   function updateBook(bookItem, newTitle, newAuthor, newYear, newIsComplete) {
//     bookItem.querySelector("h3").textContent = newTitle;
//     bookItem.querySelector("p:nth-of-type(1)").textContent = `Penulis: ${newAuthor}`;
//     bookItem.querySelector("p:nth-of-type(2)").textContent = `Tahun: ${newYear}`;

//     const completeButton = bookItem.querySelector("button:nth-of-type(1)");
//     completeButton.textContent = newIsComplete ? "Belum Selesai dibaca" : "Selesai dibaca";

//     if (newIsComplete) {
//       completeBookList.appendChild(bookItem);
//     } else {
//       incompleteBookList.appendChild(bookItem);
//     }
    
//     saveBooksToStorage(); // Simpan ke local storage setelah diperbarui
//   }

//   function saveBooksToStorage() {
//     const books = [];
//     const allBooks = document.querySelectorAll(".bookItem");

//     allBooks.forEach(bookItem => {
//       const title = bookItem.querySelector("h3").textContent;
//       const author = bookItem.querySelector("p:nth-of-type(1)").textContent.replace('Penulis: ', '');
//       const year = bookItem.querySelector("p:nth-of-type(2)").textContent.replace('Tahun: ', '');
//       const isComplete = bookItem.querySelector("button:nth-of-type(1)").textContent.includes("Belum Selesai dibaca");

//       books.push({ title, author, year, isComplete });
//     });

//     localStorage.setItem("books", JSON.stringify(books));
//   }

//   function loadBooksFromStorage() {
//     const books = JSON.parse(localStorage.getItem("books")) || [];

//     books.forEach(book => {
//       const bookItem = createBookItem(book.title, book.author, book.year, book.isComplete);
//       if (book.isComplete) {
//         completeBookList.appendChild(bookItem);
//       } else {
//         incompleteBookList.appendChild(bookItem);
//       }
//     });
//   }
// });


document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  const incompleteBookList = document.querySelector(".belumSelesai");
  const completeBookList = document.querySelector(".selesai");
  const searchForm = document.getElementById("searchBook");
  let editingBook = null;

  // Muat buku dari local storage
  loadBooksFromStorage();

  // Fungsi submit form buku
  bookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = parseInt(document.getElementById("bookFormYear").value); // Pastikan year jadi number
    let isComplete = document.getElementById("bookFormIsComplete").checked;

    if (editingBook) {
      updateBook(editingBook, title, author, year, isComplete);
      bookForm.reset();
      editingBook = null;
      saveBooksToStorage();
      return;
    }

    const generatedID = generateID(); // Generate ID untuk setiap buku
    const bookItem = createBookItem(generatedID, title, author, year, isComplete);
    if (isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }

    bookForm.reset();
    saveBooksToStorage();
  });

  // Fungsi untuk pencarian buku berdasarkan judul
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();
    const allBooks = document.querySelectorAll(".bookItem");

    allBooks.forEach(function (book) {
      const bookTitle = book.querySelector("h3").textContent.toLowerCase();
      if (bookTitle.includes(searchTitle)) {
        book.style.display = "block"; // Tampilkan buku jika sesuai dengan pencarian
      } else {
        book.style.display = "none"; // Sembunyikan buku jika tidak sesuai
      }
    });
  });

  // Fungsi untuk membuat elemen buku
  function createBookItem(id, title, author, year, isComplete) {
    const bookItem = document.createElement("div");
    bookItem.classList.add("bookItem");
    bookItem.classList.add("card");
    bookItem.setAttribute("data-bookid", id); // Tambahkan id sebagai atribut data

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Penulis: ${author}`;

    const bookYear = document.createElement("p");
    bookYear.textContent = `Tahun: ${year}`;

    const buttonContainer = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.textContent = isComplete ? "Belum Selesai dibaca" : "Selesai dibaca";
    completeButton.classList.add(isComplete ? "greenButton" : "greenButton");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus Buku";
    deleteButton.classList.add("redButton");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit Buku";
    editButton.classList.add("orangeButton");

    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookYear);
    bookItem.appendChild(buttonContainer);

    completeButton.addEventListener("click", function () {
      if (isComplete) {
        incompleteBookList.appendChild(bookItem);
        completeButton.textContent = "Selesai dibaca";
      } else {
        completeBookList.appendChild(bookItem);
        completeButton.textContent = "Belum Selesai dibaca";
      }
      isComplete = !isComplete;
      saveBooksToStorage(); // Simpan ke local storage saat status diubah
    });

    deleteButton.addEventListener("click", function () {
      bookItem.remove();
      saveBooksToStorage(); // Simpan ke local storage setelah dihapus
    });

    editButton.addEventListener("click", function () {
      editBook(bookItem, title, author, year, isComplete);
    });

    return bookItem;
  }

  function editBook(bookItem, title, author, year, isComplete) {
    document.getElementById("bookFormTitle").value = title;
    document.getElementById("bookFormAuthor").value = author;
    document.getElementById("bookFormYear").value = year;
    document.getElementById("bookFormIsComplete").checked = isComplete;

    editingBook = bookItem;
  }

  function updateBook(bookItem, newTitle, newAuthor, newYear, newIsComplete) {
    bookItem.querySelector("h3").textContent = newTitle;
    bookItem.querySelector("p:nth-of-type(1)").textContent = `Penulis: ${newAuthor}`;
    bookItem.querySelector("p:nth-of-type(2)").textContent = `Tahun: ${newYear}`;

    const completeButton = bookItem.querySelector("button:nth-of-type(1)");
    completeButton.textContent = newIsComplete ? "Belum Selesai dibaca" : "Selesai dibaca";

    if (newIsComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }

    saveBooksToStorage(); // Simpan ke local storage setelah diperbarui
  }

  function saveBooksToStorage() {
    const books = [];
    const allBooks = document.querySelectorAll(".bookItem");

    allBooks.forEach(bookItem => {
      const id = bookItem.getAttribute("data-bookid"); // Simpan id
      const title = bookItem.querySelector("h3").textContent;
      const author = bookItem.querySelector("p:nth-of-type(1)").textContent.replace('Penulis: ', '');
      const year = parseInt(bookItem.querySelector("p:nth-of-type(2)").textContent.replace('Tahun: ', '')); // Pastikan year jadi number
      const isComplete = bookItem.querySelector("button:nth-of-type(1)").textContent.includes("Belum Selesai dibaca");

      books.push({ id, title, author, year, isComplete });
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  function loadBooksFromStorage() {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    books.forEach(book => {
      const bookItem = createBookItem(book.id, book.title, book.author, book.year, book.isComplete);
      if (book.isComplete) {
        completeBookList.appendChild(bookItem);
      } else {
        incompleteBookList.appendChild(bookItem);
      }
    });
  }

  function generateID() {
    return +new Date(); // Generate ID unik menggunakan timestamp
  }
});


