"use strict"

/**
// TO DO:
// ✅ sort coffees by id in ascending order
// ✅ add functionality to search through the coffees by name and display only the coffees that match the provided search term (You will need to add an input field to the existing form for this)
// ✅ Add functionality to update the displayed coffee as the user types into the search box, or as soon as they select an option from the select.
// ✅Make your name search case-insensitive
// ✅Allow the user to add new coffees to the page
// ✅Use localStorage to persist the data
*/

function renderCoffee(coffee) {
    let roast = coffee.roast
    let html = ''
    if (roast === 'light'){
        html = '<div class="col-lg-6 d-inline coffee mb-2"> <h1 class="d-inline">'+ coffee.name + '</h1> <p class="d-inline lightP">' + coffee.roast + '</p></div>';
    } else if (roast === 'medium'){
        html = '<div class="col-lg-6 d-inline coffee mb-2"> <h1 class="d-inline">'+ coffee.name + '</h1> <p class="d-inline mediumP">' + coffee.roast + '</p></div>';
    } else if (roast === 'dark') {
        html = '<div class="col-lg-6 d-inline coffee mb-2"> <h1 class="d-inline">'+ coffee.name + '</h1> <p class="d-inline darkP">' + coffee.roast + '</p></div>';
    }
    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0 ;i <= coffees.length - 1; i++) {
        html += renderCoffee(coffees[i]);
    }

    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if(selectedRoast === "all"){
            filteredCoffees.push(coffee);
        } else
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}



//from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide


let coffees =
    [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];
if (window.localStorage.getItem('coffees') != null){
    coffees = JSON.parse(window.localStorage.getItem('coffees'))}
let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let searchText = document.querySelector('#search')
let addNewFlavor = document.querySelector('#add2')
let newCoffeeName = document.querySelector('#coffeeName')
let roastType = document.querySelector('#roastType')

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
searchText.addEventListener('keyup', searchCoffee);
addNewFlavor.addEventListener('click', addNewCoffee);

function searchCoffee(){
    let searchText2 = searchText.value;
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if((selectedRoast === "all") && (coffee.name.toLowerCase().indexOf(searchText2.toLowerCase()) !== -1)) {
            filteredCoffees.push(coffee);
        } else
        if ((coffee.roast === selectedRoast) && (coffee.name.toLowerCase().indexOf(searchText2.toLowerCase()) !== -1)) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function addNewCoffee(e) {
    e.preventDefault();
    let newFlavor = newCoffeeName.value;
    let newFlavorType = roastType.value;
    let newId = coffees.length + 1;
    coffees.push({id: newId, name: newFlavor, roast: newFlavorType});
    window.localStorage.setItem('coffees', JSON.stringify(coffees));
    searchCoffee();
 }

