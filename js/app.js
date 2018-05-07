'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'] // length is 15
var nameStore = ['First and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

var cookieStore {
    storeName: 'First and Pike',
    storeNum: 1,
    minCustomer: 23,
    maxCustomer: 65, 
    avgCookie: 6.3,
    hrCustomer: [23, 24, 26, 28, 29, 30, 33, 32, 34, 33, 65, 15, 64, 63, 64];
    hrCookies: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    fakeCustomerVisits: function {
        // for each hours
        // grab a random number from this.minCustomer to this.maxCustomer
        // store number in this.hrCustomer[i]
        // hrCookies[i] = this.hrCustomer[i] * this.avgCookie;
        // this.totalCookies += hrCookies[i];
    }
    totalCookies: // hmm, perhaps this is done during fakeCustomerVisits
        // function {
        // for(var i = 0; i < this.hrCookies.length; i++) {
            // totalCookies += this.hrCookies[i]; !! where do we define total? 
        // }
    render: function {
        // get ul by id
        // in a loop for each work hour
            // make an li
            // put the work hour and the cookies sold this hour in the li
            // place the li in the DOM
    }

}