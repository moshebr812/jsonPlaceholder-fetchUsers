class UsersApp {
    constructor () {
        this.allUsersArray = [];
        this.filter1UsersArray = []

        this.initUsers();

    }    

    async initUsers () {
        // #1. 
        console.log (`#1. initUsers -> calling getUsersList() `);
        this.allUsersArray = await this.getUsersList();
        this.filter1UsersArray = this.allUsersArray.filter (element => element.company.name.includes ('Romaguera'))
        console.log (`after getUsersList() \n${ JSON.stringify(this.allUsersArray)} \n\n filter1.count = ${this.filter1UsersArray.length}`);

        // #2. init class UsersList: loads allUsersArray to DOM + adds Events to Buttons
        let usersList = new UsersList (this.allUsersArray, this.filter1UsersArray);
        // #3 init class Users: sets counters to class + updates the DOM
        let usersCounters = new UsersCounters (this.allUsersArray, this.filter1UsersArray);
    }
    async getUsersList () {
        let response = await fetch ('https://jsonplaceholder.typicode.com/users');
        let usersList = await response.json();
        // return JS array of users
        return usersList;
    }

    
}

let myUsersApp = new UsersApp;

class UsersList {
    constructor (allUsersArray, filter1UsersArray) {
        // Arrays
        this.allUsers = allUsersArray;
        this.filter1Users = filter1UsersArray;
        // DON List Objects
        this.domListObject = document.querySelector('#usersList');
        this.domNowShowingObject = document.querySelector('#idNowShowing');
        // DOM Buttons filtering the list
        this.btnShowAll = document.querySelector('#btnShowAll');
        this.btnShowFilter1 = document.querySelector('#btnShowFilter1');
        this.btnAbout = document.querySelector('#btnAbout');
        // 1st load
        this.loadUsersToDOM('All');
        this.initFilterButtons();
    }

    loadUsersToDOM(filterType) {
        console.log (`in class UsersList:  loadUsersDOM(${filterType})`);
        let arrInFocus = [];
        if (filterType ==='All') {
             arrInFocus = this.allUsers;
         } else if (filterType === 'filter1') {
             arrInFocus = this.filter1Users;
         } else {  // Open
             alert (`ERROR in loadUsersToDOM() : incorect filterType ${filterType}`)
             return
         }
        
         let html = '<ol>';
         arrInFocus.forEach ( element =>{
             html += `<li> (user id: ${element.id}). name: ${element.name}. company: ${element.company.name}</li>`
             });
         html += '</ol>';
 
         this.domListObject.innerHTML = html;     // Array List
         this.domNowShowingObject.innerHTML = filterType;  // Header Text showing selected filter
 
 
    }

    initFilterButtons() {
        console.log (`in class UsersList:  initFilterButtons()`);
        this.btnShowAll.addEventListener ('click', () => {
            console.log ('......button "Show All" pressed');
            this.loadUsersToDOM ('All');
        });

        this.btnShowFilter1.addEventListener ('click', () => {
            console.log ('......button "Show Filter1" pressed');
            this.loadUsersToDOM ('filter1');
        });

        this.btnAbout.addEventListener ('click', () => {
            console.log ('......button "About" pressed');
            alert ('Lesson 2020-Sep-13 / Roy P \n Homework: Apply classes using "users json file" returned from: jsonplaceholder/typicode/users');
        });
    }    

}

class UsersCounters {
    constructor (allUsersArray, filter1UsersArray) {
        this.usersCounters = { total: 0, filter1: 0 }
        this.domCounterAll = document.querySelector('#idTotalUsers');
        this.domCounterFilter1 = document.querySelector('#idFilter1');
        //
        this.calcUserCounters  (allUsersArray, filter1UsersArray);
        this.updateDOMUsersCounters();
    }

    calcUserCounters(allArray, filter1Array) {
        this.usersCounters.total = allArray.length;
        this.usersCounters.filter1 = filter1Array.length;
    }

    updateDOMUsersCounters() {
        this.domCounterAll.innerHTML = this.usersCounters.total;
        this.domCounterFilter1.innerHTML = this.usersCounters.filter1;
    }
}