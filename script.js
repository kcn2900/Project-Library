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
        switch (+this.readStatus) {
            case 1:
                statusText = "Reading";
                break;
            case 2:
                statusText = "Finished Reading";
                break;
            default:
                statusText = "Not Yet Reading";
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${statusText}`;
    };
}

function addBookToLibrary (book) {
    myLibrary.push(book);
}


function displayLibrary () {
    gridDiv.replaceChildren();
    for (let i = 0; i < myLibrary.length; i++) {
        let newCard = document.createElement("div");
        newCard.className = "card";
        newCard.textContent = myLibrary[i].info();

        console.log(newCard.textContent);
        console.log(myLibrary[i]);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "REMOVE"
        removeBtn.className = "remove";
        removeBtn.id = +i;


        let statusBtn = document.createElement("button");
        statusBtn.textContent = "READ";
        statusBtn.className = "status-button";
        statusBtn.id = +i;

        newCard.appendChild(removeBtn);
        newCard.appendChild(statusBtn);
        gridDiv.appendChild(newCard);

        removeBtn.addEventListener('click', (e) => {
            console.log(e.target.id);
            let index = +e.target.id;

            console.log(gridDiv.children[index]);

            gridDiv.removeChild(gridDiv.children[index]);
            console.log(myLibrary.splice(index, 1));
            
            displayLibrary();
        });

        statusBtn.addEventListener('click', (e) => {
            let index = +e.target.id;

            console.log("Before: " + myLibrary[index].readStatus);

            myLibrary[index].readStatus = 1;

            console.log("After: " + myLibrary[index].readStatus);

            // gridDiv.children[index].textContent = myLibrary[index].info();
            displayLibrary();
        })
    }
}

// let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
// let randomBook = new Book("Random Book", "Unknown", 999, 1);

// addBookToLibrary(theHobbit);
// addBookToLibrary(randomBook);

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



