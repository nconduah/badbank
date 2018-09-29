
var superagent = require('superagent');

function create() {
    // -------------------------------------
    //  YOUR CODE
    //  Create user account on server
    // -------------------------------------  

    // get user data, create account, check if user doesn't already exist, make api call to create user
    var name  = document.getElementById('createName').value;
    var email  = document.getElementById('createEmail').value;
    var password  = document.getElementById('createPswd').value;
    var status     = document.getElementById('status');

    var url = '/account/create/${name}/${email}/${password}';
    url = '/account/create/' + name + '/' + email + '/' + password;

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                // updte ui
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        });  
}

function login() {
    // -------------------------------------
    //  YOUR CODE
    //  Confirm credentials on server
    // -------------------------------------
    var email  = document.getElementById('loginEmail').value;
    var password  = document.getElementById('loginPswd').value;
    var status     = document.getElementById('status');

    var url = '/account/login/' + email + '/' + password;

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                // updte ui
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        }); 
}

function deposit() {
    // -------------------------------------
    //  YOUR CODE
    //  Deposit funds user funds on server
    // -------------------------------------
    var email  = document.getElementById('depositEmail').value;
    var amount  = document.getElementById('depositAmount').value;
    var status     = document.getElementById('status');

    var url = '/account/deposit/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                // updte ui
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        }); 
}

function withdraw() {
    // -------------------------------------
    //  YOUR CODE
    //  Withdraw funds user funds on server
    // -------------------------------------
    var email  = document.getElementById('withdrawEmail').value;
    var amount  = document.getElementById('withdrawAmount').value;
    var status     = document.getElementById('status');

    var url = '/account/withdraw/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                // updte ui
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        }); 
}

function transactions() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all user transactions
    // -------------------------------------
    var email  = document.getElementById('transactionsEmail').value;
    var status     = document.getElementById('status');

    var url = '/account/transactions/' + email;

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                // updte ui
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        }); 
}

function balance() {
    // -------------------------------------
    //  YOUR CODE
    //  Get user balance
    // -------------------------------------
    var email  = document.getElementById('balanceEmail').value;
    var status     = document.getElementById('status');

    var url = '/account/balance/' + email;

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                // updte ui
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        }); 
}

function allData() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all data
    // -------------------------------------
    var url = '/account/all';
    var status     = document.getElementById('status');

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                // updte ui
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        }); 
}

