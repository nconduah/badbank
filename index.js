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

    var existing = db.get('accounts')
        .find({ email: email, password: pswd })
        .value();

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
        transactions: [{time: new Date(), Description: "Created account " + name}]
    };

    db.get('accounts')
        .push(account)
        .write();

    var account = db.get('accounts')
        .find({ email: email, password: pswd })
        .value();

    if(account == null) {
        console.log('Unable to create account for', name);
        res.send("failure");
    }
    else {
        console.log(name + '\'s account was successfully created');
        res.send("success");
    }
    
    // return success or failure string
});

app.get('/account/login/:email/:password', function (req, res) {

    // YOUR CODE
    // Login user - confirm credentials
    var email = req.params.email;
    var pswd = req.params.password;
    var account = db.get('accounts')
        .find({ email: email, password: pswd })
        .value();

    if(account == null){
        console.log('Unable to authenticate account with email ' + email + ' does not exist!!! Ensure your email and password are correct');
        res.send('Unable to authenticate account with email ' + email + ' does not exist!!! Ensure your email and password are correct');
        return;
    }

    var transactions = account.transactions;
    transactions.push({time: new Date(), Description: "Logged into account " + email})

    account = db.get('accounts')
        .find({ email: email })
        .assign({ transactions: transactions })
        .write();

    if(account == null) {
        console.log('Unable to login for account', email);
        res.send(account.value());
    }
    else {
        console.log('Successfully logged in', account.name);
        res.send("Successfully logged in");
    }

    // If success, return account object    
    // If fail, return null
});

app.get('/account/get/:email', function (req, res) {

    // YOUR CODE
    // Return account based on email
    var email = req.params.email;
    var account = db.get('accounts')
        .find({ email: email })
        .value();

    var transactions = account.transactions;
    transactions.push({time: new Date(), Description: "Retrieved account " + email + " details"})

    account = db.get('accounts')
        .find({ email: email })
        .assign({ transactions: transactions })
        .write();

    if(account == null) {
        console.log('Unable to retrive details account for', email);
        res.send(account.value());
    }
    else {
        console.log('Successfully retrive account', account.name);
        res.send(account);
    }
});

app.get('/account/deposit/:email/:amount', function (req, res) {
    // get current balance
    var email = req.params.email;
    var depositamount = req.params.amount;
    var account = db.get('accounts')
        .find({ email: email })
        .value();

    if(account == null) {
        console.log('Unable to retrive details account for', email);
        res.send(account.value());
        return;
    }

    var currentbalance = parseInt(account.balance);
    var newbalance = currentbalance + parseInt(depositamount);

    var transactions = account.transactions;
    transactions.push({time: new Date(), Description: "Deposited $" + depositamount + " into account " + email})

    account = db.get('accounts')
        .find({ email: email })
        .assign({ balance: newbalance, transactions: transactions})
        .write();

    if(account == null) {
        console.log('Unable to create account for', email);
        res.send(account.value());
    }
    else {
        console.log(account.name + '\'s balance was credited with ' + depositamount + ', new balance is ' +  account.balance);
        res.send("success");
    }
    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
});

app.get('/account/withdraw/:email/:amount', function (req, res) {
    
    var email = req.params.email;
    var withdrawlamount = req.params.amount;
    var account = db.get('accounts')
        .find({ email: email })
        .value();

    if(account == null) {
        var message = 'Unable to retrive details account for', email;
        console.log(message);
        res.send(message);
        return;
    }

    var currentbalance = parseInt(account.balance);
    var newbalance = currentbalance - parseInt(withdrawlamount);

    var transactions = account.transactions;
    transactions.push({time: new Date(), Description: "Withdrew $" + withdrawlamount + " from account " + email})
    
    account = db.get('accounts')
        .find({ email: email })
        .assign({ balance: newbalance, transactions: transactions })
        .write();
    
    if(account == null) {
        console.log('Unable to withdraw from account account for', email);
        res.send(account.value());
    }
    else {
        console.log(account.name + '\'s balance was debited with ' + withdrawlamount + ', new balance is ' +  account.balance);
        res.send("success");
    }
    // YOUR CODE
    // Withdraw amount for email
    // return success or failure string
});

app.get('/account/transactions/:email', function (req, res) {
    var email = req.params.email;
    var account = db.get('accounts')
        .find({ email: email })
        .value();

    if(account == null) {
        var message = 'Unable to retrive details account for', email;
        console.log(message);
        res.send(message);
        return;
    }

    var transactions = account.transactions;
    transactions.push({time: new Date(), Description: "Retrieved transactions for account " + email })

    account = db.get('accounts')
        .find({ email: email })
        .assign({ transactions: transactions })
        .value();

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
    var account = db.get('accounts')
        .find({ email: email })
        .value();

    if(account == null) {
        console.log('Unable to retrive details account for ' + email);
        res.send('Unable to retrive details account for '+ email);
        return;
    }

    var transactions = account.transactions;
    transactions.push({time: new Date(), Description: "Retrived accounts " + email + "'s balance of " + account.balance})

    account = db.get('accounts')
        .find({ email: email })
        .assign({ transactions: transactions})
        .write();

    if(account == null) {
        console.log('Unable to check balance account for', email);
        res.send('Unable to check balance account for', email);
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