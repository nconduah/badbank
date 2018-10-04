// setup server
var express = require('express');
var app = express();

// setup directory used to serve static files
app.use(express.static('public'))

// setup data store
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ accounts: []}).write();

// required data store structure
// YOUR CODE
/*
{ 
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0,
         password    : '',
         transactions: []}
    ] 
}
*/

app.get('/account/create/:name/:email/:password', function (req, res) {

    // YOUR CODE
    // Create account route
    var name = req.params.name;
    var email = req.params.email;
    var pswd = req.params.password;

    // var existing = db.get('accounts')
    //     .find({ email: email, password: pswd })
    //     .value();

    var existing = getAccount(email, { email: email });

    if(existing != null){
        console.log('Account with name ' + name + ' already exists!!! Aborting creation');
        res.send('Account with name ' + name + ' already exists!!! Aborting creation');
        return;
    }

    var account = {
        name: name, 
        email: email, 
        balance: 0, 
        password: pswd, 
        transactions: []
    };

    db.get('accounts')
        .push(account)
        .write();

    var account = db.get('accounts')
        .find({ email: email, password: pswd })
        .value();

    if(account == null) {
        console.log('Unable to create account for ' + name);
        res.send('Failure! unable to create account for' + name);
    }
    else {
        console.log(name + '\'s account was successfully created');
        res.send('Success. ' + name + '\'s account was successfully created');
    }
    
    // return success or failure string
});

app.get('/account/login/:email/:password', function (req, res) {

    // YOUR CODE
    // Login user - confirm credentials
    var email = req.params.email;
    var pswd = req.params.password;
    // var account = db.get('accounts')
    //     .find({ email: email, password: pswd })
    //     .value();

    var account = getAccount(email, { email: email, password: pswd });

    if(account == null){
        console.log('Unable to authenticate account, credentials for ' + email + ' were incorrect!!! Ensure your email and password are correct');
        res.send('Unable to authenticate account, credentials for ' + email + ' were incorrect!!! Ensure your email and password are correct');
        return;
    }

    if(account == null) {
        console.log('Unable to login account ' + email + '. Ensure your email and password are correct');
        res.send('Unable to login account ' + email + '. Ensure your email and password are correct');
    }
    else {
        console.log('Successfully logged into account ' + account.name);
        res.send('Successfully logged into account ' + account.name);
    }

    // If success, return account object    
    // If fail, return null
});

app.get('/account/get/:email', function (req, res) {

    // YOUR CODE
    // Return account based on email
    var email = req.params.email;
    // var account = db.get('accounts')
    //     .find({ email: email })
    //     .value();

    var account = getAccount(email, { email: email });

    if(account == null) {
        console.log('Unable to retrive details account for ', email);
        res.send('Unable to retrive details account for ' + email);
    }
    else {
        console.log('Successfully retrived account ' + account.name);
        res.send(account);
    }
});

getAccount = function(email, query){
    var account = db.get('accounts')
        .find(query)
        .value();

    return account;
}

app.get('/account/deposit/:email/:amount', function (req, res) {
    // get current balance
    var email = req.params.email;
    var depositamount = req.params.amount;
    // var account = db.get('accounts')
    //     .find({ email: email })
    //     .value();

    var account = getAccount(email, { email: email });

    if(account == null) {
        console.log('Unable to retrive details account for ' + email);
        res.send('Unable to retrive details account for ' + email);
        return;
    }

    var currentbalance = parseInt(account.balance);
    var newbalance = currentbalance + parseInt(depositamount);

    var transactions = account.transactions;
    transactions.push({Time: new Date(), Action: 'Deposit', Amount: depositamount,  Description: "Deposited $" + depositamount + " into account " + email})

    account = db.get('accounts')
        .find({ email: email })
        .assign({ balance: newbalance, transactions: transactions})
        .write();

    if(account == null) {
        console.log('Unable to retrieve account for ' + email);
        res.send('Unable to retrive details account for ' + email);
    }
    else {
        console.log(account.name + '\'s balance was credited with ' + depositamount + ', new balance is ' +  account.balance);
        res.send('Success! ' + account.name + '\'s balance was credited with ' + depositamount + ', new balance is ' +  account.balance);
    }
    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
});

app.get('/account/withdraw/:email/:amount', function (req, res) {
    
    var email = req.params.email;
    var withdrawlamount = req.params.amount;
    // var account = db.get('accounts')
    //     .find({ email: email })
    //     .value();
    var account = getAccount(email, { email: email });

    if(account == null) {
        var message = 'Unable to retrive details account for ' + email;
        console.log(message);
        res.send(message);
        return;
    }

    var currentbalance = parseInt(account.balance);
    var newbalance = currentbalance - parseInt(withdrawlamount);

    var transactions = account.transactions;
    transactions.push({Time: new Date(), Action: 'Withdraw', Amount: withdrawlamount,  Description: "Withdrew $" + withdrawlamount + " from account " + email})
    
    account = db.get('accounts')
        .find({ email: email })
        .assign({ balance: newbalance, transactions: transactions })
        .write();
    
    if(account == null) {
        console.log('Unable to withdraw from account for', email);
        res.send('Unable to retrive details account for' + email);
    }
    else {
        console.log(account.name + '\'s balance was debited with ' + withdrawlamount + ', new balance is ' +  account.balance);
        res.send('Success! ' + account.name + '\'s balance was debited with ' + withdrawlamount + ', new balance is ' +  account.balance);
    }
    // YOUR CODE
    // Withdraw amount for email
    // return success or failure string
});

app.get('/account/transactions/:email', function (req, res) {
    var email = req.params.email;
    // var account = db.get('accounts')
    //     .find({ email: email })
    //     .value();
    var account = getAccount(email, { email: email });

    if(account == null) {
        console.log('Unable to retrive transactionst for account', email);
        res.send('Unable to retrive details account for', email);
    }
    else {
        console.log('Successfully retrieved transactions for', account.name);
        res.send(account.transactions);
    }

    // YOUR CODE
    // Return all transactions for account
});

app.get('/account/all', function (req, res) {
    var accounts = db.get('accounts')
        .value();

    if(accounts == null) {
        var message = 'Unable to retrive all account details';
        console.log(message);
        res.send(message);
        return;
    }
    else {
        console.log('Successfully retrieved all data');
        res.send(accounts);
    }
    // YOUR CODE
    // Return data for all accounts
});

app.get('/account/balance/:email', function (req, res) {
    // get current balance
    var email = req.params.email;
    // var account = db.get('accounts')
    //     .find({ email: email })
    //     .value();
    var account = getAccount(email, { email: email });

    if(account == null) {
        console.log('Unable to check balance account for ' + email);
        res.send('Unable to check balance account for ' + email);
    }
    else {
        console.log(account.name + '\'s balance was retrieved with balance of ' +  account.balance);
        res.send(account.name + '\'s balance is ' +  account.balance);
    }
    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
});


// start server
// -----------------------
app.listen(3000, function(){
    console.log('Listening on 3000 for requests')
})