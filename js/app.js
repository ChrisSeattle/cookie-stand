'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'] // length is 15
var nameStore = ['First and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

var firstPike = {
    storeName: 'First and Pike',
    storeNum: 1,
    minCustomer: 23,
    maxCustomer: 65, 
    avgCookie: 6.3,
    hrCustomer: [], 
    hrCookies: [], 
    totalCookies: 0,
    fakeCustomerVisits: function() {
        for(var i = 0; i < hours.length; i++) { // for each hours
            // grab a random number from this.minCustomer to this.maxCustomer
            // store number in this.hrCustomer[i] using this.hrCustomer.push
            this.hrCustomer.push(randomCount(this.minCustomer, this.maxCustomer));
            // hrCookies[i] = this.hrCustomer[i] * this.avgCookie; use .push
            this.hrCookies.push(Math.round(this.hrCustomer[i] * this.avgCookie));
            // add current hrCookies to totalCookies
            this.totalCookies += this.hrCookies[i]; 
        } // end for loop
    }, // end fakeCustomerVisits  
    render: function() {
        // get ul by id
        var list = document.getElementById('sales_store' + this.storeNum); 
        for (var i = 0; i < hours.length; i++) { // in a loop for each work hour
            var newLi = document.createElement('li');
            newLi.textContent = '' + hours[i] + ': ' + this.hrCookies[i] + ' cookies';
            list.appendChild(newLi);
        } // end loop of make li, put data in li, place li in DOM
        var lastLi = document.createElement('li'); 
        lastLi.textContent = 'Total: ' + this.totalCookies + ' cookies';
        lastLi.setAttribute('class', 'sales_total');
        list.appendChild(lastLi);
    } // end render: function()

}; // end declare object firstPike


function randomCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

firstPike.fakeCustomerVisits();
firstPike.render();

