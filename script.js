let books = [
    // {
    // title: "Harry Potter",
    // author: "JK Rowling",
    // genre: "Mystery",
    // pages: 300,
    // read: true,
    // id: 1597750453607,
    // },
    // {
    // title: "Twilight",
    // author: "Catherin Hardwicke",
    // genre: "Romance",
    // pages: 433,
    // read: false,
    // id: 1597750478241,
    // },
    // {
    // title: "Tongavola",
    // author: "Tambinarivo Emilio Jerome",
    // genre: "Educative",
    // pages: 513,
    // read: true,
    // id: 1597750525481,
    // },
];

// add an element to the list with the form
// The element is added on the list
// reset the form after submission
// Not add an empty element
// delete an element
// edit the state of an element
// save new element to local storage
// save the new state of object in local storage
// form validation?
const form = document.querySelector('form');
const tableList = document.querySelector('tbody');

const showBooks = () => {
    const html = books.map(book => {
        return  `
        <tr>
            <td class="left">${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.pages}</td>
            <td>
                <button
                value="${book.id}"
                class="check"
                area-label="Update read attribute of ${book.title}">
                    <img ${book.read ? '' : 'hidden'}
                    src="./assets/icons/checked.svg"
                    alt="the book ${book.title} is read"/>

                    <img ${book.read ? 'hidden' : ''}
                    src="./assets/icons/unchecked.svg"
                    alt="the book ${book.title} is not yet read"/>
                </button>
            </td>
            <td>
                <button
                value="${book.id}" 
                class="delete"
                area-label="Delete ${book.title} book">
                    <img 
                    src="./assets/icons/trash.svg" 
                    alt="Delete ${book.title} fron the list"/>
                </button>
            </td>
        </tr>
        `;
    }).join('');
    tableList.innerHTML = html;
};
// showBooks();

const addBook = e => {
    e.preventDefault();
    console.log(e);
    const formEl = e.currentTarget;
    const newBook = {
        title: formEl.title.value,
        author: formEl.author.value,
        genre: formEl.genre.value,
        pages: formEl.pages.value,
        read: formEl.read.value === true,
        id: Date.now(),
    };
    console.log(newBook);
    books.push(newBook);
    tableList.dispatchEvent(new CustomEvent('listUpdate'));
    formEl.reset();
};

const handleClick = e => {
    console.log(e.target);
    // Update read attribute
    const checkBtn = e.target.closest('button.check');
    if (checkBtn) {
        const id = Number(checkBtn.value);
        console.log('UPDATE THAT BOOK PLEASE');
        updateRead(id);
    }
    // Delete book
    const deleteBtn = e.target.closest('button.delete');
    if (deleteBtn) {
        const id = Number(deleteBook.value);
        console.log('DELETE THAT BOOK PLEASE');
        deleteBook(id);
    }
};

const deleteBook = idToDelete => {
    books = books.filter(book => book.id !== idToDelete);
    tableList.dispatchEvent(new CustomEvent('listUpdate'));
};

const updateRead = id => {
    const bookToUpdate = books.find(book => book.id === id);
    console.log(bookToUpdate);

    // objects and arrays are passed by reference (and not by a value)
    bookToUpdate.read = !bookToUpdate.read;
    console.log(books);
    // if we just update the attribute here, it will be also ipdated to the books 
    tableList.dispatchEvent(new CustomEvent('listUpdate'));
};

const initLocalStorage = () => {
    const booksLs = JSON.parse(localStorage.getItem('books'));
    console.log(booksLs);
    if(booksLs) {
        books = booksLs;
    }
    tableList.dispatchEvent(new CustomEvent('listUpdate'));
};

const updateLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(books));
};

form.addEventListener('submit', addBook);
tableList.addEventListener('listUpdate', showBooks);
window.addEventListener('DOMContentLoaded', showBooks);
tableList.addEventListener('click', handleClick);
tableList.addEventListener('listUpdate', updateLocalStorage);

initLocalStorage();