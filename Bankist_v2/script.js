'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.54444, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'gu-IN', // de-DE
  currency:"INR"
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
  currency :"USD"
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////










/////////////////////////////////////////////////
// LECTURES
const daysString=function(date1,date2,locale)
{
  const options={
    day:"numeric",
    month:"numeric",
    year:"numeric",
  }
    const day= Math.round(Math.abs(date2-date1)/(1000*60*60*24));
    // console.log(day);
    if(day==0)
    return "today"
    else if(day==1)
    return "yesterday";
    else if(day<=7)
    return `${day}s ago`
    else return new Intl.DateTimeFormat(locale,options).format(new Date());
}
{/* <div class="movements__value">${mov.toFixed(2)}€</div> */}

function startLogoutTimer()
{ 
  let min=5;
  let seconds=0;
  const timer = setInterval(function(){
  labelTimer.textContent= `${min.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`;
      if(min==0 && seconds==0)
      {
        clearInterval(timer);
        containerApp.style.opacity=0; 
        labelWelcome.textContent = "Welcome, Please Login to Continue";
      }
      if(min && seconds === 0)
      {
        min--;
        seconds=60;  
      }
  seconds--;
},1000);
 return timer;
} 

const displayMovements=function(acc,sort=false)
{
  const movs = sort?(acc.movements.slice().sort((a,b)=>(a-b))):acc.movements;
containerMovements.innerHTML=" ";
  movs.forEach((mov,index) => 
  {
    let type;
    mov>0 ?type="deposit" : type="withdrawal";
    const date=new Date(acc.movementsDates[index]);
    // const str=`${String(date.getDate()).padStart(2,0)} / ${String(date.getMonth()+1).padStart(2,0)} / ${date.getFullYear()}`
    const str=daysString(new Date(),date,currentAcc.locale);
    const transaction=new Intl.NumberFormat(currentAcc.locale,
      {style:"currency",
      currency:currentAcc.currency
  }).format(mov);
    const html=
    `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
    <div class="movements__date">${str}</div>
    <div class="movements__value">${transaction}</div>
    </div>`
  containerMovements.insertAdjacentHTML("afterbegin",html);
  });
}

const createUsernames=function(accounts)
{
  const ownerName=accounts.owner.toLowerCase().split(" ").map(name=>name[0]).join("");
  accounts.userName= ownerName;
}
createUsernames(account3);
createUsernames(account4);
createUsernames(account2);
createUsernames(account1);

// const withdrawals = account1.movements.filter((mov)=>
//   mov<0
// );

// console.log(withdrawals);

const balance=function(accounts)
{
  let bal=accounts.movements.reduce(function(acc,value,index,array)
  { 
  return acc+value;
  },0);
  currentAcc.balance=+bal.toFixed(2);
  labelBalance.textContent=new Intl.NumberFormat(currentAcc.locale,
    {style:"currency",
    currency:currentAcc.currency
}).format(bal);
  return bal;
}

function displaySummary(acc)
{
   function inlet(acc)
   {
    return acc.movements.filter((val)=>val>0).reduce((accum,val)=>accum+val,0);
   }
   labelSumIn.textContent=new Intl.NumberFormat(currentAcc.locale,
    {style:"currency",
    currency:currentAcc.currency
}).format(inlet(acc));

   function outlet(acc)
   {
    return acc.movements.filter((val)=>val<0).reduce((acc,val)=>acc+val,0);
   }
   labelSumOut.textContent=new Intl.NumberFormat(currentAcc.locale,
    {style:"currency",
    currency:currentAcc.currency
}).format(Math.abs(outlet(acc)));

   function intrest(acc)
  {
    return acc.movements
    .filter((val)=>val>0)
    .map((val)=>val*acc.interestRate/100)
    .filter((val)=>val>1)
    .reduce((acc,val)=>acc+val,0);
  }
  labelSumInterest.textContent=new Intl.NumberFormat(currentAcc.locale,
    {style:"currency",
    currency:currentAcc.currency
}).format(intrest(acc));
}

// // document.querySelector(".date").textContent=new Date(Date.now());
// const now=new Date();
// document.querySelector(".date").textContent=`${String(now.getDate()).padStart(2,0)} / ${String(now.getMonth()+1).padStart(2,0)} / ${now.getFullYear()}, ${String(now.getHours()).padStart(2,0)}: ${String(now.getMinutes()).padStart(2,0)}`


let currentAcc,timer;

// FAKE LOGIN  /////////////////////////////////////
currentAcc=account1;
displayMovements(currentAcc);
    (balance(currentAcc))
    displaySummary(currentAcc);
    containerApp.style.opacity=100;


////////////////////////////////////////////////////
btnLogin.addEventListener("click",function(e)
{
  e.preventDefault();
  const acc=accounts.find((acc)=> acc.userName === inputLoginUsername.value);
  if(acc?.pin === Number(inputLoginPin.value))
  {
    currentAcc=acc;
    containerApp.style.opacity=100;
    labelWelcome.textContent="Welcome, " + currentAcc.owner.split(" ")[0];
    inputLoginPin.value = inputLoginUsername.value = ""
    inputLoginPin.blur();
    
    const options={
    day:"numeric",
    month:"long",
    year:"numeric",
    weekday:"long",
    hour:"numeric",
    minute:"numeric"
  }
    document.querySelector(".date").textContent=new Intl.DateTimeFormat(currentAcc.locale,options).format(new Date());
    displayMovements(currentAcc);
    (balance(currentAcc))
    displaySummary(currentAcc);
    if(timer) clearInterval(timer);
    timer = startLogoutTimer();
  }
  else
  {alert("Invalid Credentials!!!")}
})
btnTransfer.addEventListener("click",function(e)
{
  e.preventDefault();
  const benif = accounts.find((acc)=>inputTransferTo.value === acc.userName);
  console.log(inputTransferTo.value,inputTransferAmount.value);
  if(benif == undefined)
    alert("No such account found");
  if(benif?.owner === currentAcc.owner)
  {
    alert("you can't transfer to yourself");
  }
  else if(inputTransferAmount.value >=0 && currentAcc.balance >= inputTransferAmount.value)
  {  
    benif.movements.push(inputTransferAmount.value);
    currentAcc.movements.push(Number(inputTransferAmount.value)*(-1));
    currentAcc.movementsDates.push(new Date().toISOString());
    beniAcc.movementsDates.push(new Date().toISOString());
    displayMovements(currentAcc);
    balance(currentAcc)
    displaySummary(currentAcc);
    if(timer) clearInterval(timer);
    startLogoutTimer();
  }
  else
  {
    alert("enter valid amounts!!!")
  }
})
btnClose.addEventListener("click",function(e)
{
  e.preventDefault();
  if(currentAcc.userName === inputCloseUsername.value && currentAcc.pin == inputClosePin.value)
  {
      const index= accounts.findIndex((acc)=>currentAcc.userName === acc.userName);
      console.log(index);
      accounts.splice(index,1);
      inputClosePin.value = inputCloseUsername.value = "";
      inputClosePin.blur();
      containerApp.style.opacity=0;labelWelcome.textContent="Login to get started ";
  }else
  {
    alert("Enter valid credentials to Close Account");
  }
})

btnLoan.addEventListener("click",function(e){
    e.preventDefault();

    const eligible = currentAcc.movements.some((mov)=>mov>=(0.1*Number(inputLoanAmount.value)));
    const amount=Math.floor(Number(inputLoanAmount.value));
    if(eligible && inputLoanAmount.value>0)
    {
      setTimeout(function()
      {
      currentAcc.movements.push(amount);
      currentAcc.movementsDates.push(new Date().toISOString());
      displayMovements(currentAcc);
      balance(currentAcc);
      displaySummary(currentAcc);
      console.log("loan Approved !!!")
      },3000);
      inputLoanAmount.value="";
      inputLoanAmount.blur();
      if(timer) clearInterval(timer);
      startLogoutTimer();
    }
    else{
      alert("Loan request rejected")
    }
})
let set=false;
btnSort.addEventListener("click",function()
{  
  set=!set;
  displayMovements(currentAcc,set);
})

labelBalance.addEventListener("click",function()
{
  const movsUI= Array.from(document.querySelectorAll(".movements__value"),el=>Number(el.textContent.replace("€","")));
  console.log(movsUI);
})