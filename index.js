let myLibrary = [];
const container = document.querySelector("#container");
const newBookButton = document.querySelector("#new-book-button")

// book log stats
const completedSpan = document.querySelector("#completed")
let completed = 0;
const progressSpan = document.querySelector("#progress")
let progress = 0;
const onMyListSpan = document.querySelector("#onMyList")
let onMyList = 0;
const totalSpan = document.querySelector("#total")
let total = 0;

let bookID = 0;

class Book{
    constructor(title = "Unknown", author = "Unknown", pages = 0, read = 0){
        this.title = title;
        this.author = author;
        this.pages = parseInt(pages);
        this.read = parseInt(read);
        if (this.read == this.pages){
            this.status = "‎‏‏‎‏‏‎ ‎‏‏‎ ‎‏‏‎completed ✔️"
            this.statistic = 2;
            this.progressWidth = 100;
            completed ++;
            total ++;
            completedSpan.innerHTML = completed
            totalSpan.innerHTML = total
        } else if (this.read > 0 && this.read < this.pages){
            this.status = "in progress..";
            this.statistic = 1;
            this.progressWidth = (this.read/this.pages)*100;
            progress ++;
            total ++;
            progressSpan.innerHTML = progress
            totalSpan.innerHTML = total
        } else if (this.read == 0){
            this.status = "on my list!";
            this.statistic = 0;
            this.progressWidth = 0;
            onMyList ++;
            total ++;
            onMyListSpan.innerHTML = onMyList
            totalSpan.innerHTML = total
        }
        this.id = bookID;
        bookID++;
        this.info = function() {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
        }
    }
}

// new book form window 
const newForm = document.querySelector("#new-book-form");
const newFormSubmit = document.querySelector("#new-book-form-button");
const newFormDiv = document.querySelector("#new-book-form-div");
const formOverlay = document.querySelector(".form-overlay");
const xNewFormButton = document.querySelector("#close-new-form-button")

function openForm() {
    newForm.reset();
    newFormDiv.classList.add("form-div--active");
    formOverlay.classList.add("form-overlay--active");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });

  xNewFormButton.addEventListener("click", closePopup);

  function closePopup() {
    newFormDiv.classList.remove("form-div--active");
    editFormDiv.classList.remove("form-div--active");
    formOverlay.classList.remove("form-overlay--active");
  }

// add book
newBookButton.addEventListener("click", openForm)
newForm.addEventListener("submit", addBook);

function addBook(e) {
    e.preventDefault();
    addBookToLibrary(getBookFromInput());
    resetGrid();
    displayLibrary(myLibrary);
    closePopup();
  }
  
function getBookFromInput(e) {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;
    if(parseInt(read) > parseInt(pages)){
        alert("pages read cannot be greater than pages in the book")
        e.preventDefault();
    }
    return new Book(title, author, pages, read);
}

function resetGrid() {
    container.innerHTML = "";
  }

function addBookToLibrary(book){
    myLibrary.push(book);    
}

// edit book form window 
const editForm = document.querySelector("#edit-book-form");
const editFormSubmit = document.querySelector("#edit-book-form-button");
const editFormDiv = document.querySelector("#edit-book-form-div");
const xEditFormButton = document.querySelector("#close-edit-form-button")
const editFormDelete = document.querySelector("#edit-delete")

function editFormFunction(e) {  
    editForm.reset();  
    editFormDiv.classList.add("form-div--active");
    formOverlay.classList.add("form-overlay--active");

    const bookToEditID = parseInt(e.toElement.attributes.librarybookid.value);
        
    function search (value, array){
        for (var i=0; i < array.length; i++) {
            if (array[i].id === value) {
                return i;
            }
        }
    }
    const bookToEdit = search(bookToEditID, myLibrary);
    
    // fill form with current book data
    document.querySelector("#edit-title").value = myLibrary[bookToEdit].title;
    document.querySelector("#edit-author").value = myLibrary[bookToEdit].author;
    document.querySelector("#edit-pages").value = myLibrary[bookToEdit].pages;
    document.querySelector("#edit-read").value = myLibrary[bookToEdit].read;
    document.querySelector("#edit-id").value = myLibrary[bookToEdit].id;
}   

// edit book
xEditFormButton.addEventListener("click", closePopup);
editForm.addEventListener("submit", editBook);
editFormDelete.addEventListener("click", deleteBook);

function editBook(e) {
    e.preventDefault(); 
    editBookFromInput();
    resetGrid();
    displayLibrary(myLibrary);
    closePopup();
}

function deleteBook(){
    const id = parseInt(document.querySelector("#edit-id").value);
    function search (value, array){
        for (var i=0; i < array.length; i++) {
            if (array[i].id === value) {
                return i;
            }
        }
    }
    const bookToDelete = search(id, myLibrary);
    let statistic = parseInt(myLibrary[bookToDelete].statistic);
    // update book log
        total--;
        totalSpan.innerHTML = total
        if (statistic == 0){
            onMyList--;
            onMyListSpan.innerHTML = onMyList
        } else if (statistic == 1){
            progress--;
            progressSpan.innerHTML = progress;
        } else {
            completed--;
            completedSpan.innerHTML = completed
        }
    myLibrary.splice(bookToDelete, 1);
    resetGrid();
    displayLibrary(myLibrary);
    closePopup();
}

function editBookFromInput() {
    const title = document.querySelector("#edit-title").value;
    const author = document.querySelector("#edit-author").value;
    const pages = parseInt(document.querySelector("#edit-pages").value);
    const read = parseInt(document.querySelector("#edit-read").value);
    const id = parseInt(document.querySelector("#edit-id").value);
    // find old statistic
    function search (value, array){
        for (var i=0; i < array.length; i++) {
            if (array[i].id === value) {
                return i;
            }
        }
    }
    const bookIdToFind = search(id, myLibrary);
    let oldStatistic = parseInt(myLibrary[bookIdToFind].statistic);
    let newStatistic = 0;
    let newStatus = "";
    if (read == pages){
        newStatus = "‎‏‏‎‏‏‎ ‎‏‏‎ ‎‏‏‎completed ✔️";
        newStatistic = 2;
        myLibrary[bookIdToFind].progressWidth = 100;
        if (oldStatistic == 2){

        } else if (oldStatistic == 1){
            progress --;
            progressSpan.innerHTML = progress;
            completed++;
            completedSpan.innerHTML = completed
        } else if (oldStatistic == 0){
            onMyList--;
            onMyListSpan.innerHTML = onMyList;
            completed++;
            completedSpan.innerHTML = completed
        }
    } else if (read > 0 && read < pages){
        newStatus = "in progress..";
        newStatistic = 1;
        myLibrary[bookIdToFind].progressWidth = (read/pages)*100;
        if (oldStatistic == newStatistic){

        } else if (oldStatistic == 2){
            completed--;
            completedSpan.innerHTML = completed;
            progress++;
            progressSpan.innerHTML = progress
        } else {
            onMyList--;
            onMyListSpan.innerHTML = onMyList;
            progress++;
            progressSpan.innerHTML = progress
        }
    } else if (read === 0){
        newStatus = "on my list!";
        newStatistic = 0;
        myLibrary[bookIdToFind].progressWidth = 0;
        if (oldStatistic == newStatistic){

        } else if (oldStatistic == 2){
            completed--;
            completedSpan.innerHTML = completed;
            onMyList++;
            onMyListSpan.innerHTML = onMyList
        } else {
            progress--;
            progressSpan.innerHTML = onMyList;
            onMyList++;
            onMyListSpan.innerHTML = onMyList
        }
    }
    if(read > pages){
        alert("pages read cannot be greater than pages in the book")
        e.preventDefault();
    }
    myLibrary[bookIdToFind].title = title;
    myLibrary[bookIdToFind].author = author;
    myLibrary[bookIdToFind].pages = pages;
    myLibrary[bookIdToFind].read = read;
    myLibrary[bookIdToFind].status = newStatus;
    myLibrary[bookIdToFind].statistic = newStatistic;
    return
}

// library
function displayLibrary(array){
    for(i = 0; i < array.length; i++){
        const card = document.createElement('div');
        const title = document.createElement('h4')
        const author = document.createElement('h4')
        const status = document.createElement('h4')
        const progress = document.createElement('div')
            const progressFinished = document.createElement('div')
        const pages = document.createElement('span')
        const edit = document.createElement('span')
            edit.setAttribute("librarybookid", array[i].id)
            edit.addEventListener("click", editFormFunction)
            card.appendChild(edit).classList.add('edit-button')
                edit.innerHTML = "✎"
        card.appendChild(title).classList.add('title');
        card.appendChild(author).classList.add('author');
        card.appendChild(status).classList.add('status');
        pages.innerHTML = "(" + array[i].pages + " pages)"
        if (array[i].status == "in progress.."){
            const width = array[i].progressWidth;
            pages.innerHTML = "(" + array[i].read + "/" + array[i].pages + " pages)"
            progress.appendChild(progressFinished).classList.add('progress-finished');
            progressFinished.style.cssText = `width: ${width}%`
            card.appendChild(progress).classList.add('progress-bar');
        } else if (array[i].read == array[i].pages){
            status.style.cssText = `color: var(--progress-green); margin-bottom:-8px; margin-top: -3px;`
        } else {
            status.style.cssText = `color: var(--progress-orange);margin-bottom:-8px;`
        }
        card.appendChild(pages).classList.add('pages-span')
        title.innerHTML = '"' + array[i].title + '"';
        author.innerHTML = array[i].author;
        status.innerHTML = array[i].status;
        card.classList.add('card');
        container.appendChild(card); 
    }
}

// fill library

    const blink = new Book("Blink", "Malcolm Gladwell", 244, 183);
    addBookToLibrary(blink);
    const charlie = new Book("Charlie and the Chocolate Factory", "Roald Dahl", 176, 176);
    addBookToLibrary(charlie);
    const factfulness = new Book("Factfulness", "Hans Rosling", 341, 0);
    addBookToLibrary(factfulness);

    displayLibrary(myLibrary);
