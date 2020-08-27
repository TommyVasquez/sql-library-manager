'use strict';
/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate.
***/
const mainDiv = document.querySelector('.box');
const bookItems = mainDiv.querySelectorAll('.row');
const itemsPerPage = 10;

/***
 * Function `searchBook`
 * @param inputSearch input text
 ***/
const searchBook = (inputSearch) => {
    let searchValue = inputSearch.value.toLowerCase().trim();
    let table_tr = document
        .getElementById('table')
        .getElementsByTagName('tbody')[0].rows;
    for (let i = 0; i < table_tr.length; i++) {
        let tr = table_tr[i];
        let texttr = tr.innerText.toLowerCase();
        // tr.className = texttr.indexOf(searchValue) >= 0 ? 'mostrar' : 'ocultar';
        if (texttr.indexOf(searchValue) >= 0) {
            tr.style.display = 'table-row';
        } else {
            tr.style.display = 'none';
        }
    }
};

/***
 * Function `showPage` function to hide all of the items in the
 * list except for the ten you want to show.
 * @param list = array bookItems
 * @page page = number of the link page
 ***/
const showPage = (list, page) => {
    const startIndex = page * itemsPerPage - itemsPerPage;
    const endIndex = page * itemsPerPage - 1;
    //Hide, show items
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            list[i].style.display = 'table-row';
        } else {
            list[i].style.display = 'none';
        }
    }
};

/***
 * Funtion `appendPageLinks function` to generate, append, and add
 * functionality to the pagination buttons.
 * @param list = array bookItems
 ***/
const appendPageLinks = (list) => {
    //Calculate the number of pages
    let numbersOfPage = Math.ceil(list.length / itemsPerPage);
    //Create pagination's list
    const pageDiv = document.createElement('div');
    pageDiv.classList.add('pagination');
    mainDiv.appendChild(pageDiv);
    const ul = document.createElement('ul');
    pageDiv.appendChild(ul);
    for (let i = 1; i <= numbersOfPage; i++) {
        const li = document.createElement('li');
        ul.appendChild(li);
        const a = document.createElement('a');
        li.appendChild(a);
        li.innerHTML = `<a href="#">${i}</a>`;
        // Set active class to first page
        if (i == 1) {
            li.innerHTML = `<a href="#" class="active">${i}</a>`;
        }
    }
    // Add event click and set active class for selected page
    pageDiv.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            const a = document.querySelectorAll('a');
            for (let i = 0; i < a.length; i++) {
                a[i].classList.remove('active');
            }
            const target = e.target.tagName;
            e.target.classList.add('active');
            let value = parseInt(e.target.innerText);
            showPage(list, value);
        }
    });
};

/***
 * Call functions
 */
const textSearch = document.querySelector('input#search');
if (textSearch) {
    textSearch.addEventListener('keyup', (e) => {
        if (e.target.value === '') {
            showPage(bookItems, 1);
        } else {
            searchBook(e.target);
        }
    });
}

showPage(bookItems, 1);
appendPageLinks(bookItems);
