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
}


// This is the prototype//

Book.prototype.info = function() {   
    if (this.read == true) {
    return `${this.title} by ${this.author} (${this.pages} pages) I've read it.`
    }

    else return `${this.title} by ${this.author} (${this.pages} pages) I haven't read it.`

}

//newBook.proptotype = Object.create(Book.prototype);

Book.prototype.beenReadToggle = function (e){

    console.log(this.title);
    console.log(`This action updates read status of ${this.title} at index ${myLibrary.indexOf(this)}`)
    let thisBooksIndex = myLibrary.indexOf(this);
    console.log(thisBooksIndex);
    

    console.log(`${this.title} is being toggled`);
    this.read = !this.read;
    this.info = function() {
        if (this.read == true) {
        return `${this.title} by ${this.author} (${this.pages} pages)  I've read it.`
        }

        else return `${this.title} by ${this.author} (${this.pages} pages). I haven't read it.`

    }

    

    display();

    /*const bookIndex = myLibrary.indexOf(this);
    console.log(this.read);
    console.log(this.info());
    const editableItem = document.querySelector(`[data-index-number = '${bookIndex}']`);
    console.log(editableItem);
    node.textContent = this.info();
    */

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
    document.getElementById('library').textContent = '';
    node = '';
    let button = '';



    for (i = 0; i < myLibrary.length; i++){
        //console.log(myLibrary[i]);
            itemIndex = i;

            para = document.createElement("p");
            node = document.createTextNode(myLibrary[i].info().toString());
            para.setAttribute("name", myLibrary[i].title);
            para.setAttribute("id", myLibrary[i].title);
            para.setAttribute("data-index-number", itemIndex);
            button = document.createElement("button");
            button.setAttribute("id","remove");
            button.setAttribute("class","remove");
            let buttonNode = document.createTextNode("X");
            readButton = document.createElement("button");
            readButton.setAttribute("id","read-button");
            readButton.setAttribute("class","read-button");
            let readButtonNode = document.createTextNode("Read/Unread");

            if (myLibrary[i].read == true){
                readButton.setAttribute("class","read");
                readButtonNode.textContent = "Read";
            } else {
                readButton.setAttribute("class","unread");
                readButtonNode.textContent = "Unread";
            }

              
            readButton.addEventListener("click",function(e){
                console.log(`${myLibrary[this.parentElement.dataset.indexNumber].title}'s read status should be updating`);
              
                myLibrary[this.parentElement.dataset.indexNumber].beenReadToggle();


                
            })

        para.appendChild(readButton);
        para.appendChild(node);
        para.appendChild(button);
        button.appendChild(buttonNode);
        readButton.appendChild(readButtonNode);
        

        const element = document.getElementById("library");
        element.appendChild(para);
        }

        removeButtons = document.querySelectorAll(".remove");
        removeButtons.forEach(removeButton => removeButton.addEventListener("click",handleRemove));
    

    
    }

    


window.addEventListener("load",display);

/* New Book Button */

const newBookButton = document.createElement("button");
const newBookButtonNode = document.createTextNode("Add New Book");
newBookButton.appendChild(newBookButtonNode);

const newBookElement = document.getElementById("container");
newBookElement.appendChild(newBookButton);

/*FORM SETUP*/


const form = document.createElement("form");    
const titleField = document.createElement("input");
    titleField.setAttribute("type","text");
    titleField.setAttribute("name", "title");
    titleField.setAttribute("placeholder", "Title");

const authorField = document.createElement("input");
    authorField.setAttribute("type","text");
    authorField.setAttribute("name","author");
    authorField.setAttribute("placeholder", "Author");

const pagesField = document.createElement("input");
    pagesField.setAttribute("type","number");
    pagesField.setAttribute("name","pages");
    pagesField.setAttribute("placeholder","Number of Pages");

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

form.appendChild(titleField);
form.appendChild(authorField);
form.appendChild(pagesField);
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


function handleRemove(e){

    console.log(e.target.parentElement);
    console.log(`This action ${e.target.id}s ${e.target.parentElement.id} at index ${e.target.parentElement.dataset.indexNumber}`)
    myLibrary.splice(e.target.parentElement.dataset.indexNumber);
    indexToRemove = e.target.parentElement.dataset.indexNumber;
    console.log(myLibrary);
    itemIndex = myLibrary.indexOf(indexToRemove);
    display();
   


    
    //e.target.parentElement

   // myLibrary.splice()
}
//Function to submit newly added book

let itemIndex;

function handleSubmit(e){
   
    e.preventDefault();

    if (!titleField.value  || !authorField.value || !pagesField.value || !readOrNot.value){
        return;
    }

    if (readOrNot.checked == true) {
        readStatus = true;
        
    }

    if (readOrNot.checked == false){
        readStatus = false;
    
    }

    let creatingBook = new Book (titleCase(titleField.value), titleCase(authorField.value), pagesField.value, readStatus)
    addBookToLibrary(creatingBook);
    console.log(myLibrary.indexOf(creatingBook));
    display();
    formElement.removeChild(form);
    titleField.value = null;
    authorField.value = null;
    pagesField.value = null;
    readOrNot.checked = false;
}

submit.addEventListener("click", handleSubmit);

window.addEventListener("load",function(){    
    display();
    });




