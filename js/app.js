'use strict';

// ==================================
// Some global variables, mostly set by paramters from company owner
// ==================================

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'] // length is 15
var storeList = []; // this is populated when we add Store object
// var nameStore = ['First and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

var minStaff = 2; // every store will always have 2 cookie workers
var staffWorkload = 20; // how many cookies/hr can each staff member handle

var salesHeader = ['Store Name'].concat(hours, 'Daily Location Total');
var staffHeader = hours.slice();
staffHeader.unshift('Store Name');
// I tried using unshift & push on newArray, after newArray = oldArray
// However, these would also change oldArray.

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

// ===========================
// ==== make some methods ====
// fakeCustomerVisit is guess based on company owner's expectations of hrly customers & avg sales
// renderSales is output of sales
// renderStaff is report of staff needed based on hourly cookie sales
// ===========================

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

Store.prototype.renderSales = function(tableId) {
    // ?? assume this is called after table id has been grabbed ??
    // that won't work because of variable scope.
    // perhaps could have renderSales return a value that is the table row
    var tableEl = document.getElementById(tableId); // get table by Id
    var trEl = document.createElement('tr'); // a tr that will hold the td elements
    var tdEl = document.createElement('td'); // first td is storeName
    tdEl.textContent = this.storeName;
    trEl.appendChild(tdEl);
    for(var i = 0; i < hours.length; i++) {
        var tdEl = document.createElement('td');
        tdEl.textContent = '' + this.hrCookies[i];
        trEl.appendChild(tdEl);
    } // end for loop for all sales hours
    tdEl = document.createElement('td');
    tdEl.textContent = '' + this.totalCookies;
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl);
} // end renderSales method

Store.prototype.renderStaff = function(tableId, storeMinStaff, storeStaffWorkload) {
    // outputs to table with tableId
    // storeMinStaff is minimum number of staff, regardless of store volume, at a location
    // storeStaffWorkload is how many cookies/hr for a worker, if we sell more per hour, add another staff member
    // currently storeMinStaff & storeStaffWorkload are always going to call minStaff & staffWorkload as set for all stores
    // potentially could have different values for different store locations, by calling this method with different values

    var tableEl = document.getElementById(tableId); // get table by Id
    var trEl = document.createElement('tr'); // make a tr that holds some td
    var tdEl = document.createElement('td'); // first td is storeName
    tdEl.textContent = this.storeName;
    trEl.appendChild(tdEl);
    for(var i in hours) {
        var staffNeeded = Math.max(storeMinStaff, Math.ceil(this.hrCookies[i] / storeStaffWorkload));
        // staffNeeded will be at least minStaff, or 1 worker per staffWorkload of cookies
        // we will always assume to add staff if we go over by 1 or more
        var tdEl = document.createElement('td');
        tdEl.textContent = '' + staffNeeded;
        trEl.appendChild(tdEl);
    } // end for loop for all sales hours
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl);
} // end renderStaff method

// ==================
// create store objects with known variables
// ==================

// info given to use:
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

function tableHeader(tableId, tableHeaderList) { // asumes header on top row
    var tableEl = document.getElementById(tableId); // grab table id
    var trEl = document.createElement('tr'); // make header row
    for(var i in tableHeaderList) {
        var thEl = document.createElement('th');
        thEl.textContent = '' + tableHeaderList[i];
        trEl.appendChild(thEl);
    } // end for loop for all sales hours
    tableEl.appendChild(trEl);
} // end function tableHeader

function salesHourlyTotal(tableId) {
    // this will compute and render a row of the hourly sales, totaled over all stores
    var tableEl = document.getElementById(tableId); // grab table id
    var trEl = document.createElement('tr'); // make a row to hold td
    // trEl.setAttribute('class', 'sales-total');
    var tdEl = document.createElement('td'); // what to put in the storeName column
    tdEl.setAttribute('class', 'sales-total');
    tdEl.textContent = 'Totals';
    trEl.appendChild(tdEl);
    for(var i in hours) {
        tdEl = document.createElement('td');
        tdEl.setAttribute('class', 'sales-total');
        var tempTotal = 0; // holds the total for currently working hour (the i hour)
        // lookup and append total for each store at this given hour
        for(var j in storeList) {
            tempTotal += storeList[j].hrCookies[i];
        } // end for loop for all store locations (for current i hour)
        tdEl.textContent = tempTotal;
        trEl.appendChild(tdEl);
    } // end for loop for all sales hours
    // get a total of all store totals for final sales table cell
    tdEl = document.createElement('td');
    tdEl.setAttribute('class', 'sales-total');
    var tempTotal = 0;
    for(var j in storeList) {
        tempTotal += storeList[j].totalCookies
    } // end for loop for all store locations (looking at .totalCookies)
    tdEl.textContent = tempTotal;
    trEl.appendChild(tdEl); // this is our last td for the sales table
    tableEl.appendChild(trEl); // put this final row of Totals in table
} // end function salesHourlyTotal

function salesTable(tableId, tableHeaderList) {
    tableHeader(tableId, tableHeaderList);
    for(var i = 0; i < storeList.length; i++) {
        storeList[i].renderSales(tableId);
    }
    salesHourlyTotal(tableId);
} // end function salesTable

function staffTable(tableId, tableHeaderList) {
    tableHeader(tableId, tableHeaderList);
    for(var i in storeList) {
        storeList[i].renderStaff(tableId, minStaff, staffWorkload);
    }
} // end function staffTable

// ==================
// using all objects in storeList, build the full table
// make sure to have the header row of table
// ==================

salesTable('sales-data', salesHeader);
staffTable('staff-data', staffHeader);
