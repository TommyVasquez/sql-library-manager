/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
'use strict';
/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate.
***/
const mainDiv = document.querySelector('.page');
const studentItems = mainDiv.getElementsByClassName('student-item cf');
const itemsPerPage = 10;

/***
 * Function `searchStudent`
 * @param list = array studentItems
 ***/
const searchStudent = (list) => {
    // Create search button and input
    const headerDiv = mainDiv.querySelector('div');
    const div = document.createElement('div');
    div.classList.add('student-search');
    headerDiv.appendChild(div);
    const input = document.createElement('input');
    div.appendChild(input);
    const button = document.createElement('button');
    div.appendChild(button);
    input.setAttribute('placeholder', 'Search for students...');
    button.innerText = 'Search';
    // Select text from input and all name´s students
    const text = div.querySelector('input');
    const nameStudents = mainDiv.getElementsByTagName('h3');
    // Add event click and show the student item
    button.addEventListener('click', (e) => {
        if (text.value == '') {
            alert('Enter a name');
        } else {
            for (let i = 0; i < nameStudents.length; i++) {
                const element = nameStudents[i].innerText;
                if (element == text.value) {
                    list[i].style.display = 'block';
                } else {
                    list[i].style.display = 'none';
                }
            }
            text.value = '';
        }
    });
};

/***
 * Function `showPage` function to hide all of the items in the
 * list except for the ten you want to show.
 * @param list = array studentItems
 * @page page = number of the link page
 ***/
const showPage = (list, page) => {
    const startIndex = page * itemsPerPage - itemsPerPage;
    const endIndex = page * itemsPerPage - 1;
    //Hide, show items
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            list[i].style.display = 'block';
        } else {
            list[i].style.display = 'none';
        }
    }
};

/***
 * Funtion `appendPageLinks function` to generate, append, and add
 * functionality to the pagination buttons.
 * @param list = array studentItems
 ***/
const appendPageLinks = (list) => {
    //Calculate the number of pages
    let numbersOfPage = 1;
    if (list.length % itemsPerPage > 0) {
        numbersOfPage = Math.floor(list.length / itemsPerPage) + 1;
    } else {
        numbersOfPage = Math.round(list.length / itemsPerPage);
    }
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
        const a = document.querySelectorAll('a');
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('active');
        }
        e.target.classList.add('active');
        let value = parseInt(e.target.innerText);
        showPage(list, value);
    });
};

/***
 * Call functions
 */
searchStudent(studentItems);
showPage(studentItems, 1);
appendPageLinks(studentItems);
