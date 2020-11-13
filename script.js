// global variables
let node;

/* This is the main array where all the Book objects will be stored */

let myLibrary = [];

/* This is the constructor! */

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages. Been read: ${read}`
        
    }
};

// This is the prototype//

Book.prototype.beenReadToggle = function (){
    this.read = !this.read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages. Been read: ${this.read}`
        
    }
    const bookIndex = myLibrary.indexOf(this);
    console.log(this.read);
    console.log(this.info());
    const editableItem = document.querySelector(`[data-index-number = '${bookIndex}']`);
    console.log(editableItem);
    node.textContent = this.info();

   // document.getElementById('library')

}


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
    node = null;
    let button = null;



    for (i = 0; i < myLibrary.length; i++){
        //console.log(myLibrary[i]);

        if (!para && !node){
            para = document.createElement("p");
            node = document.createTextNode(myLibrary[i].info().toString());
            para.setAttribute("name",title.value);
            para.setAttribute("id",title.value);
            para.setAttribute("data-index-number", itemIndex);
            button = document.createElement("button");
            button.setAttribute("id","remove");
            button.setAttribute("class","remove");
            let buttonNode = document.createTextNode("X");
            readButton = document.createElement("button");
            readButton.setAttribute("id","read-button");
            readButton.setAttribute("class","read-button");
            let readButtonNode = document.createTextNode("Read/Unread");

                if (readOrNot.checked == true){
                    readButtonNode.textContent = "Read";
                    readButton.setAttribute("class","read")
                    
                }

                if (readOrNot.checked == false) {
                    readButtonNode.textContent = "Unread";
                    readButton.setAttribute("class","unread");
                }
            readButton.addEventListener("click",function(e){
                console.log(this.parentElement.dataset.indexNumber);
              
                myLibrary[this.parentElement.dataset.indexNumber].beenReadToggle();


                if (e.target.classList.contains("read")){
                    e.target.classList.remove("read");
                    e.target.classList.add("unread");
                    e.target.textContent = "Unread";
                    
                }

                else if (e.target.classList.contains("unread")){
                    e.target.classList.remove("unread");
                    e.target.classList.add("read");
                    e.target.textContent = "Read";
                    
                }
                
            })

        para.appendChild(readButton);
        para.appendChild(node);
        para.appendChild(button);
        button.appendChild(buttonNode);
        readButton.appendChild(readButtonNode);
        console.log(para.dataset.indexNumber);

        const element = document.getElementById("library");
        element.appendChild(para);
        }

        else if (para || node) {
            node.nodeValue = null;
            node.nodeValue = myLibrary[i].info().toString();
        }

    
    }
}
    
    let removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(removeButton => removeButton.addEventListener("click",handleRemove));
    


window.addEventListener("load",display);

/* New Book Button */

const newBookButton = document.createElement("button");
const newBookButtonNode = document.createTextNode("Add New Book");
newBookButton.appendChild(newBookButtonNode);

const newBookElement = document.getElementById("container");
newBookElement.appendChild(newBookButton);

/*FORM SETUP*/


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

let remove = false;

let indexToRemove;
let bookToRemove;

function handleRemove(e){
    console.log(e.target.parentElement);
    console.log(`This action ${e.target.id}s ${e.target.parentElement.id} at index ${e.target.parentElement.dataset.indexNumber}`)
    myLibrary.splice(e.target.parentElement.dataset.indexNumber);
    indexToRemove = e.target.parentElement.dataset.indexNumber;
    bookToRemove = document.querySelector(`[data-index-number='${indexToRemove}'`);
    console.log(myLibrary);
    console.log(bookToRemove);
    document.getElementById('library').removeChild(bookToRemove);
   


    
    //e.target.parentElement

   // myLibrary.splice()
}

//Function to submit newly added book

let itemIndex;

function handleSubmit(e){
   
    e.preventDefault();

    if (!title.value  || !author.value || !pages.value || !readOrNot.value){
        return;
    }

    if (readOrNot.checked == true) {
        readStatus = true;
        
    }

    if (readOrNot.checked == false){
        readStatus = false;
    
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
    let removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(removeButton => removeButton.addEventListener("click",handleRemove));
}
submit.addEventListener("click", handleSubmit);

window.addEventListener("load",function(){    
    display();
    });

    let removerButtons = document.querySelectorAll(".remove");
    removerButtons.forEach(removeButton => removeButton.addEventListener("click",handleRemove));








