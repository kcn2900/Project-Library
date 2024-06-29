const myLibrary = [];
const gridDiv = document.querySelector(".grid");
const form = document.querySelector("#form");
const newBookBtn = document.querySelector(".new");

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = +pages;
    this.readStatus = readStatus;

    this.info = (showcase_all) => {
        let title_result = this.title;
        let author_result = this.author;
        let pages_result = this.pages;
        let statusText = "";

        // check for test if wanting to showcase entire book info
        if (typeof showcase_all === "undefined") {
            if (this.title.length > 10) {
                title_result = title.slice(0, 10) + "...";
            }
    
            if (this.author.length > 10) {
                author_result = author.slice(0, 10) + "...";
            }
    
            if(this.pages > 10000) {
                pages_result = pages.toString().slice(0, 5) + "+";
            }
        }

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

        return `${title_result} by ${author_result}, 
        ${pages_result} pages, ${statusText}`;
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

        // console.log(newCard.textContent);
        // console.log(myLibrary[i]);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "REMOVE"
        removeBtn.className = "remove";
        removeBtn.id = +i;

        let statusBtn = document.createElement("button");
        statusBtn.textContent = "READ";
        statusBtn.className = "status-button";
        statusBtn.id = +i;

        let buttonSection = document.createElement("div");
        buttonSection.className = "button-section";
        buttonSection.append(removeBtn, statusBtn);

        newCard.appendChild(buttonSection);
        gridDiv.appendChild(newCard);

        // remove card based on myLibrary index
        // 'reload' or redo the library display to update indexes
        removeBtn.addEventListener('click', (e) => {
            // console.log(e.target.id);
            let index = +e.target.id;

            // console.log(gridDiv.children[index]);

            gridDiv.removeChild(gridDiv.children[index]);
            myLibrary.splice(index, 1);
            
            displayLibrary();
        });

        // set a book's status in myLibrary to "Reading"
        // and reload display to showcase the text change
        statusBtn.addEventListener('click', (e) => {
            let index = +e.target.id;

            // console.log("Before: " + myLibrary[index].readStatus);

            myLibrary[index].readStatus = 1;

            // console.log("After: " + myLibrary[index].readStatus);

            // gridDiv.children[index].textContent = myLibrary[index].info();
            displayLibrary();
        });

        newCard.addEventListener('mouseover', () => {
            // add a new card with an abolute position, but
            // make the card's position relative

            hoverCard = document.createElement("div");
            hoverCard.textContent = myLibrary[i].info(true);
            hoverCard.className = "hover-card";

            gridDiv.appendChild(hoverCard);

        });

        newCard.addEventListener('mouseout', () => {
            gridDiv.removeChild(hoverCard);
        });
    }
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
let randomBook = new Book("Random Book", "Unknown", 999, 1);

addBookToLibrary(theHobbit);
addBookToLibrary(randomBook);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let bookTitle = document.querySelector("#title");
    let bookAuthor = document.querySelector("#author");
    let bookPages =  document.querySelector("#page-number");
    let bookStatus = document.querySelector("#status");

    let newBook = new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookStatus.value
    );

    // could agrubaly use a forEach/for loop but since it's a small
    // number of inputs, don't really need to do so.
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookStatus.value = "";

    addBookToLibrary(newBook);
    displayLibrary();
    form.style.display = "none";
    newBookBtn.style.display = "block";
});

newBookBtn.addEventListener('click', () => {
    form.style.display = "flex";
    newBookBtn.style.display = "none";
});

