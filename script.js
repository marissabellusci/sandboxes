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
    console.log(myLibrary);
    let para = null;
    let node = null;
    let button = null;
    

    for (i = 0; i < myLibrary.length; i++){
        //console.log(myLibrary[i]);

        if (!para && !node){
            para = document.createElement("p");
            node = document.createTextNode(myLibrary[i].info().toString());
            para.setAttribute("name",title.value);
            para.setAttribute("id",title.value);
            para.setAttribute("data-index-number", itemIndex);
        
            //para.setAttribute("data-index-number", myLibrary.indexOf(myLibrary[i].title));
            button = document.createElement("button");
            button.setAttribute("id","remove");
            let buttonNode = document.createTextNode("Remove book");
        para.appendChild(node);
        para.appendChild(button);
        button.appendChild(buttonNode);

        const element = document.getElementById("library");
        element.appendChild(para);
        }

        else {
            node.nodeValue = myLibrary[i].info().toString();
        }
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


const form = document.createElement("form");    
const title = document.createElement("input");
    title.setAttribute("type","text");
    title.setAttribute("name", "title");
    title.setAttribute("placeholder", "Title");

const author = document.createElement("input");
    author.setAttribute("type","text");
    author.setAttribute("name","author");
    author.setAttribute("placeholder", "Author");

const pages = document.createElement("input");
    pages.setAttribute("type","number");
    pages.setAttribute("name","pages");
    pages.setAttribute("placeholder","Number of Pages");

const readOrNot = document.createElement("input");
    readOrNot.setAttribute("type", "checkbox");
    readOrNot.setAttribute("name", "readOrNot");


    const readLabel = document.createElement("label");
        const readLabelTextContent = document.createTextNode("I've read this");
        readLabel.appendChild(readLabelTextContent);

    readOrNot.appendChild(readLabel);

const submit = document.createElement("button");
const submitText = document.createTextNode('Add');
submit.appendChild(submitText);

form.appendChild(title);
form.appendChild(author);
form.appendChild(pages);
form.appendChild(readOrNot);
form.appendChild(readLabel);
form.appendChild(submit);

const formElement = document.getElementById("form-pop-up");
newBookButton.addEventListener("click",function() {formElement.appendChild(form)});

function titleCase(str){
    str = str.toLowerCase().split(" ").map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1))
    });
    
    return str.join(' ');
};

//Function to remove book

function handleRemove(e){
    console.log(e.target);
}

//Function to submit newly added book

let itemIndex;

function handleSubmit(e){
   
    e.preventDefault();

    if (!title.value  || !author.value || !pages.value || !readOrNot.value){
        return;
    }

    if (readOrNot.checked == true) {
        readStatus = "I've read it.";
    }

    if (readOrNot.checked == false){
        readStatus = "Haven't read this one yet.";
    }

    const creatingBook = new Book (titleCase(title.value), titleCase(author.value), pages.value, readStatus)
    addBookToLibrary(creatingBook);
    console.log(myLibrary.indexOf(creatingBook));
    itemIndex = myLibrary.indexOf(creatingBook);
    display();
    formElement.removeChild(form);
    title.value = null;
    author.value = null;
    pages.value = null;
    readOrNot.checked = false;
    let removeButton = document.getElementById("remove");
    removeButton.addEventListener("click",handleRemove);
}
submit.addEventListener("click", handleSubmit);

window.addEventListener("load",function(){    
    display();
    });






