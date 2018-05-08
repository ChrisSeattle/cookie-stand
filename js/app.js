'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'] // length is 15
var nameStore = ['First and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
var storeList = [];

// ==================================
// ======= Object Constructor =======
// build a store constructor
// in constructor push each object instance to storeList
// ==================================

function Store(storeName, minCustomer, maxCustomer, avgCookie) {
    this.storeName = storeName;
    this.minCustomer = minCustomer;
    this.maxCustomer = maxCustomer;
    this.avgCookie = avgCookie; 
    this.hrCustomer = []; 
    this.hrCookies = []; 
    this.totalCookies = 0;    
    storeList.push(this); 
    this.fakeCustomerVisits(); 
}

// ==================
// make some methods: fakeCustomerVisit, render (as table format)
// ==================

Store.prototype.fakeCustomerVisits = function() {
    for(var i = 0; i < hours.length; i++) { // for each hours
        // grab a random number from this.minCustomer to this.maxCustomer
        // store number in this.hrCustomer[i] using this.hrCustomer.push
        this.hrCustomer.push(randomCount(this.minCustomer, this.maxCustomer));
        // hrCookies[i] = this.hrCustomer[i] * this.avgCookie; use .push
        this.hrCookies.push(Math.round(this.hrCustomer[i] * this.avgCookie));
        // add current hrCookies to totalCookies
        this.totalCookies += this.hrCookies[i]; 
    } // end for loop
} // end fakeCustomerVisits  

Store.prototype.render = function(tableId) {
    // ?? assume this is called after table id has been grabbed ??
    // that won't work because of variable scope. 
    // perhaps could have render return a value that is the table row
    var tableEl = document.getElementById(tableId);
    // make a tr
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td'); 
    tdEl.textContent = this.storeName; 
    trEl.appendChild(tdEl);
    for(var i in hours) {
        var tdEl = document.createElement('td'); 
        tdEl.textContent = '' + this.hrCookies[i]; 
        trEl.appendChild(tdEl);
    } // end for loop for all sales hours
    tdEl.textContent = '' + this.totalCookies; 
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl); 
    
    // for each datacolumn
        // make td
        // input text
        // put td in tr
    // put tr on document


    // make the table info here
} // end render method

            // oldRender: function() {
            //     // get ul by id
            //     var list = document.getElementById('sales_store' + this.storeNum); 
            //     for (var i = 0; i < hours.length; i++) { // in a loop for each work hour
            //         var newLi = document.createElement('li');
            //         newLi.textContent = '' + hours[i] + ': ' + this.hrCookies[i] + ' cookies';
            //         list.appendChild(newLi);
            //     } // end loop of make li, put data in li, place li in DOM
            //     var lastLi = document.createElement('li'); 
            //     lastLi.textContent = 'Total: ' + this.totalCookies + ' cookies';
            //     lastLi.setAttribute('class', 'sales_total');
            //     list.appendChild(lastLi);
            // } // end render: function()

// ==================
// create store objects with known variables
// ==================

// First and Pike, 23, 65, 6.3
// SeaTac Airport, 3, 24, 1.2
// Seattle Center, 11, 38, 3.7
// Capitol Hill, 20, 38, 2.3
// Alki, 2, 16, 4.6

new Store('First and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2); 
new Store('Seattle Center', 11, 38, 3.7); 
new Store('Capitol Hill', 20, 38, 2.3); 
new Store('Alki', 2, 16, 4.6); 

// ==================
// functions potentially used in a few place 
// ==================

function randomCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// at some place, make sure to call fakeCustomerVisits methods for each object
// but I believe we figured how to do this object construction? 

// function fillFakeCustomerVisits() {
//     // for(var i of storeList) {
//     for(var i = 0; i <storeList.length; i++) { // for store object
//         storeList[i].fakeCustomerVisits();
//     } // end for loop
// } // end fillFakeCustomerVisits

// fillFakeCustomerVisits();

// ==================
// using all objects in storeList, build the full table
// make sure to have the header row of table
// ==================

function makeTable(tableId) {
    // grab table id
    var tableEl = document.getElementById(tableId);
    // make header row
    var trEl = document.createElement('tr');
    var thEl = document.createElement('th'); 
    thEl.textContent = 'Store Name'; 
    trEl.appendChild(thEl);
    for(var i in hours) {
        var thEl = document.createElement('th'); 
        thEl.textContent = '' + hours[i]; 
        trEl.appendChild(thEl);
    } // end for loop for all sales hours
    thEl.textContent = 'Daily Location Total';
    trEl.appendChild(thEl);
    tableEl.appendChild(trEl); 
        // for each storeList 
        for(var i = 0; i < storeList.length; i++) {
            storeList[i].render(tableId); 
        }
        // call the render method to make the row
    // done? 
} 

makeTable('sales-data'); 
