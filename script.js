/* This is where all the Book objects will be stored */

let myLibrary = [];

/* This is the constructor! */

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages. ${read}`
    }
};

/* Manually added books */

const wildSheepChase = new Book("A Wild Sheep Chase","Haruki Murakami", 353, "I've read it.");
const theTrial = new Book("The Trial", "Franz Kafka", 231, "I've read it.");


/* Function to create new Book */

function  addBookToLibrary(newBook){
    myLibrary.push(newBook);
};

/* Function to display books on page */

function display(){
    console.log(myLibrary)

    for (i = 0; i < myLibrary.length; i++){
        console.log(myLibrary[i]);
        const para = document.createElement("p");
        const node = document.createTextNode(myLibrary[i].info().toString());
        para.appendChild(node);

        const element = document.getElementById("library");
        element.appendChild(para);
    }
    
};

window.addEventListener("load",display);

/* New Book Button */

const newBookButton = document.createElement("button");
const newBookButtonNode = document.createTextNode("Add New Book");
newBookButton.appendChild(newBookButtonNode);

const newBookElement = document.getElementById("container");
newBookElement.appendChild(newBookButton);

/*Next I need to make the newBookButton create a form to add a new book*/