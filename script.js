

let myLibrary = [];
const cardContainer = document.querySelector('.card-container');
const inputContainer = document.querySelector('.input-container');
const submitWindow = document.querySelector('.form-window');
const submitBtn = document.querySelector('.submit-btn');
const addBookBtn = document.querySelector('.add-book-btn');

/*function Book(title, author, pages, read = false){
    this.title   = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}*/

class Book {
    constructor(title, author, pages, read = false){
        this.title   = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(name, author, pages, read) {
    myLibrary.push(new Book(name, author, pages, read));
}


addBookBtn.addEventListener('click', () => {
    submitWindow.style.display = 'inline-block';
});

submitBtn.addEventListener('click',() => {
    const title = document.querySelector('#title-input');
    const author = document.querySelector('#author-input');
    const pages = document.querySelector('#pages-input');
    const read = document.querySelector('#read-input');
    if(!checkIfTextFieldsAreEmpty(title, author, pages)) {
        addBookToLibrary(title.value, author.value, pages.value, read.checked);
        emptyInputFields(title, author, pages, read);
        submitWindow.style.display = 'none';
        deleteAllCard(false);
        DisplayLibrary();
    }
    saveLibraryToLocalStorage();
    
});

function emptyInputFields(title, author, pages, read){
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

function checkIfTextFieldsAreEmpty(title, author, pages){
    return (!title.checkValidity()) ? true : (!author.checkValidity()) ? true : (!pages.checkValidity()) ? true : false;
}



function DisplayLibrary(){
    

    myLibrary.forEach((e, i) => {
        const card = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h2');
        const nameText = document.createElement('p');
        const pagesText = document.createElement('p');
        const readBook = document.createElement('p');
        const btn = document.createElement('button');
        const readBtn = document.createElement('button');

        card.classList.add('card');
        card.setAttribute('data-index', `${i}`);

        nameText.id = 'name';
        pagesText.id = 'pages';
        readBook.id = 'read';
        img.src = 'images/books.jpg';
        btn.classList.add('delete-btn');
        (e.read) ? readBtn.classList.add('btn-read') : readBtn.classList.add('btn-not-read')

        title.textContent = `Title: ${e.title}`;
        nameText.textContent = `Author: ${e.author}`;
        pagesText.textContent = `${e.pages} pages long`;
        readBook.textContent = `${(e.read) ? 'I have read this book' : 'I have not read this book'}`;
        readBtn.textContent = `${(e.read) ? "Didn't read" : 'Read it'}`;
        btn.textContent = 'Delete';

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(nameText);
        card.appendChild(pagesText);
        card.appendChild(readBook);
        card.appendChild(readBtn);
        card.appendChild(btn);
        cardContainer.appendChild(card);


        btn.addEventListener('click',deleteBtnEvent);
        readBtn.addEventListener('click', changeReadStatus);
    });
};


function deleteBtnEvent(e) {
    const index = e.target.closest('.card').getAttribute('data-index');
    myLibrary.splice(index, 1);
    deleteAllCard(false);
    saveLibraryToLocalStorage();
    DisplayLibrary();
    
};

function changeReadStatus(e) {
    const index = e.target.closest('.card').getAttribute('data-index');
    const readTextNode = e.target.closest('.card').querySelector('#read');

    if(myLibrary[index].read){
        myLibrary[index].read = false;
        readTextNode.textContent = 'I have not read this book';
        e.target.classList.remove('btn-read');
        e.target.classList.add('btn-not-read');
        e.target.textContent = 'Read it';
    }
    else {
        myLibrary[index].read = true;
        readTextNode.textContent = 'I have read this book';
        e.target.classList.remove('btn-not-read');
        e.target.classList.add('btn-read');
        e.target.textContent = "Didn't read";
    }

    saveLibraryToLocalStorage();

}


function deleteCard(card) {
    while(card.lastChild){
        card.removeChild(card.lastChild);
    }
    card.remove();
};

function deleteAllCard(emptyLibrary){
    const cardList = document.querySelectorAll('.card');
    cardList.forEach(card => {
        deleteCard(card);
    });
    if(emptyLibrary){
        myLibrary = [];
    }
}

function saveLibraryToLocalStorage(){
    localStorage.clear();
    myLibrary.forEach((e, i) => {
        localStorage.setItem(`book${i}`, JSON.stringify(myLibrary[i]));
    })
}

function readFormLocalStorage(){
    for(let i = 0; i < localStorage.length; i++){
        const bookObj = JSON.parse(localStorage.getItem(`book${i}`));
        addBookToLibrary(bookObj.title, bookObj.author, bookObj.pages, bookObj.read);
    }
}

readFormLocalStorage();
DisplayLibrary();
saveLibraryToLocalStorage();