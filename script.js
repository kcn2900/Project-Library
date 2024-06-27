const myLibrary = [];
const gridDiv = document.querySelector(".grid");
const form = document.querySelector("#form");
const newBookBtn = document.querySelector(".new");

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.info = () => {
        let statusText = "";
        switch (readStatus) {
            case 1:
                statusText = "Reading";
                break;
            case 2:
                statusText = "Finished Reading";
                break;
            default:
                statusText = "Not Yet Reading";
        }
        return `${title} by ${author}, ${pages} pages, ${statusText}`;
    };
}

function addBookToLibrary (book) {
    myLibrary.push(book);
}

// attach uid to each book, remove a book with array.filter based
// based on matching id
// 

function displayLibrary () {
    gridDiv.replaceChildren();
    for (let i = 0; i < myLibrary.length; i++) {
        let newCard = document.createElement("div");
        newCard.className = "card";
        newCard.textContent = myLibrary[i].info();

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "REMOVE"
        removeBtn.className = "remove";
        newCard.appendChild(removeBtn);
        gridDiv.appendChild(newCard);
    }
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
let randomBook = new Book("Random Book", "Unknown", 999, 1);

addBookToLibrary(theHobbit);
addBookToLibrary(randomBook);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newBook = new Book(
        document.querySelector("#title").value,
        document.querySelector("#author").value,
        document.querySelector("#page-number").value,
        document.querySelector("#status").value
    );

    addBookToLibrary(newBook);
    displayLibrary();
    form.style.display = "none";
    newBookBtn.style.display = "block";
});

newBookBtn.addEventListener('click', () => {
    form.style.display = "block";
    newBookBtn.style.display = "none";
});



