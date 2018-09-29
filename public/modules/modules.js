var ui = {};

ui.navigation = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <a class="navbar-brand" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
        
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-item nav-link" href="#" id="createAccountNavButton" onclick="loadCreateAccount()">Create Account<span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#" id="loginNavButton" onclick="loadLogin()">Login</a>
            <a class="nav-item nav-link" href="#" id="depositNavButton" onclick="loadDeposit()">Deposit</a>
            <a class="nav-item nav-link" href="#" id="withdrawNavButton" onclick="loadWithdraw()">Withdraw</a>
            <a class="nav-item nav-link" href="#" id="transactionsNavButton" onclick="loadTransactions()">Transactions</a>
            <a class="nav-item nav-link" href="#" id="balanceNavButton" onclick="loadBalance()">Balance</a>
            <a class="nav-item nav-link" href="#" id="allDataNavButton" onclick="loadAllData()">AllData</a>
        </div>
    </div>
</nav>
`;

ui.createAccount = `
<form onsubmit="create()">
    <div class="form-group card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">Create Account</div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                </div>
                <input id="createName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Name" required>
            </div>
            <br/>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email address</span>
                </div>
                <input id="createEmail" type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email" required>
            </div>
            <br/>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                </div>
                <input id="createPswd" type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Password" required>
            </div>
            <br/>

            <button type="submit" class="btn btn-light">Create Account</button>
            <div id="status"></div>
        </div>
    </div> 
</form>
`;

ui.login = `
<form onsubmit="login()">
    <div class="form-group card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-header">Login</div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email address</span>
                </div>
                <input id="loginEmail" type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email" required>
            </div>
            <br/>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                </div>
                <input id="loginPswd" type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Password" required>
            </div>
            <br/>

            <button type="submit" class="btn btn-light">Login</button>
            <div id="status"></div>
        </div>
    </div> 
</form> 
`;

ui.deposit = `
<form onsubmit="deposit()">
    <div class="form-group card text-white bg-warning mb-3" style="max-width: 18rem;">
        <div class="card-header">Deposit</div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email address</span>
                </div>
                <input id="depositEmail" type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email" required>
            </div>
            <br/>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Amount</span>
                </div>
                <input id="depositAmount" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Amount" required>
            </div>
            <br/>

            <button type="submit" class="btn btn-light">Deposit</button>
        </div>
    </div> 
</form> 
`;

ui.withdraw = `
<form onsubmit="withdraw()">
    <div class="form-group card text-white bg-success mb-3" style="max-width: 18rem;">
        <div class="card-header">Withdraw</div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email address</span>
                </div>
                <input id="withdrawEmail" type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email" required>
            </div>
            <br/>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Amount</span>
                </div>
                <input id="withdrawAmount" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Amount" required>
            </div>
            <br/>

            <button type="submit" class="btn btn-light">Withdraw</button>
        </div>
    </div> 
</form> 
`;

ui.transactions = `
<form onsubmit="transactions()">
    <div class="form-group card text-white bg-danger mb-3" style="max-width: 18rem;">
        <div class="card-header">Transactions</div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email address</span>
                </div>
                <input id="transactionsEmail" type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email" required>
            </div>
            <br/>

            <button type="submit" class="btn btn-light">Show Transactions</button>
        </div>
    </div> 
</form> 
`;

ui.balance = `
<form onsubmit="balance()">
    <div class="form-group card text-white bg-info mb-3" style="max-width: 18rem;">
        <div class="card-header">Balance</div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email address</span>
                </div>
                <input id="balanceEmail" type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email" required>
            </div>
            <br/>

            <button type="submit" class="btn btn-light">Show Balance</button>
            <div id="result"></div>
        </div>
    </div> 
</form>  
`;

ui.default = `
<div class="card bg-light mb-3" style="max-width: 18rem;">
    <div class="card-header"><h4>NAess BadBank Landing Module<h2/></div>
    <div class="card-body">
        <h5 class="card-title">Welcome to the bank</h5>
        <br/>
        <p class="card-text">You can move around using the navigation bar.</p>
        <br/>
        <img class="card-img-bottom" src="nbb.png" alt="NAess BadBank cap">
    </div>
</div> 
`;

ui.allData = `
<form onsubmit="allData()">
    <div class="form-group card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">Balance</div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email address</span>
                </div>
                <input id="allDataEmail" type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email" required>
            </div>
            <br/>

            <button type="submit" class="btn btn-light">Show All Data</button>
        </div>
    </div> 
</form> 
`;

var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
navigation.innerHTML += ui.navigation;

var activeNavButton;

var loadCreateAccount = function(){
    target.innerHTML = ui.createAccount;

    // set active marker
    setActiveNavBar("createAccountNavButton");
};

var loadLogin = function(){
    target.innerHTML = ui.login;

    // set active marker
    setActiveNavBar("loginNavButton");
};

var loadDeposit = function(){
    target.innerHTML = ui.deposit;

    // set active marker
    setActiveNavBar("depositNavButton");
};

var loadWithdraw = function(){
    target.innerHTML = ui.withdraw;

    // set active marker
    setActiveNavBar("withdrawNavButton");
};

var loadTransactions = function(){
    target.innerHTML = ui.transactions;

    // set active marker
    setActiveNavBar("transactionsNavButton");
};

var loadBalance = function(){
    target.innerHTML = ui.balance;

    // set active marker
    setActiveNavBar("balanceNavButton");
};

var defaultModule = function(){
    target.innerHTML = ui.default;

    // set default active as whole nav bar
    activeNavButton = navigation;
};

var loadAllData = function(){
    target.innerHTML = ui.allData;

    // set active marker
    setActiveNavBar("allDataNavButton");
};

var setActiveNavBar = function(id){
    // set active marker
    activeNavButton.classList.remove("active");
    activeNavButton = document.getElementById(id);
    activeNavButton.classList.add("active");
}

defaultModule();
