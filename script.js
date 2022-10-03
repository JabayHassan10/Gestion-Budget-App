let incomeAmount = document.getElementById("income-amount");
let expenseAmount = document.getElementById("expense-amount");
const expenseAmountButton = document.getElementById("expense-amount-button");
const incomeAmountButton = document.getElementById("income-amount-button");
const productTitle = document.getElementById("product-title");
const productTitleIncome = document.getElementById("product-title-income");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const incomeValue = document.getElementById("income-value");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;
let sum = 0;
let storageIncome = [];
let storageExpense = [];


//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    expenseAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
  console.log(parentDiv);
};
const modifyElements = (element, edit = false) => {
  let childDiv = element;
  let currentBalance = balanceValue.innerText;
  let currentIncome = incomeValue.innerText;
  let childAmount = childDiv.previousSibling.innerHTML;
  console.log(childAmount);
  if (edit) {
    let childText = childDiv.previousSibling.previousSibling.innerHTML;
    productTitleIncome.value = childText;
    incomeAmount.value = childAmount;
    console.log(childText);
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) - parseInt(childAmount);
  incomeValue.innerText = 
    parseInt(currentIncome) - parseInt(childAmount);
  childDiv.parentElement.remove();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};
const listeCreator = (incomeName, incomeValue) => {
  let sublisteContent = document.createElement("div");
  sublisteContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublisteContent);
  sublisteContent.innerHTML = `<p class="product">${incomeName}</p><p class="amount">${incomeValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElements(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElements(deleteButton);
  });
  sublisteContent.appendChild(editButton);
  sublisteContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublisteContent);
};

//Set Budget Part
incomeAmountButton.addEventListener("click", () => {
  tempAmount = incomeAmount.value;
const titleIncome = productTitleIncome.value;
const amountIncome = incomeAmount.value;

  //empty or negative input
  if (!productTitleIncome.value || !incomeAmount.value) {
    errorMessage.classList.remove("hide");
    return false;
  }
  disableButtons(false);
  //Income
  let incoming = parseInt(tempAmount);
  //Set Budget
  let sume = parseInt(incomeValue.innerText) + incoming;
  incomeValue.innerText = sume;
  //Set Balance
  const totalBudget = sume - parseInt(expenditureValue.innerText);
  balanceValue.innerText = totalBudget;
  //Create List
  listeCreator(titleIncome, amountIncome);
  //Clear Input Box
  productTitleIncome.value = "";
  incomeAmount.value = "";

  storageIncome.push({Titre:titleIncome, Montant:amountIncome});
  localStorage.setItem("Revenu", JSON.stringify(storageIncome));
  console.log(JSON.parse(localStorage.getItem("Revenu")));
});

//Function To Add Expenses
expenseAmountButton.addEventListener("click", () => {
  tempAmount = incomeValue.innerText;
  const titleExpense = productTitle.value;
  const amountExpense = expenseAmount.value;

  //empty checks
  if (!productTitle.value || !expenseAmount.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(expenseAmount.value);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, expenseAmount.value);
  //Empty inputs
  productTitle.value = "";
  expenseAmount.value = "";

  storageExpense.push({Titre:titleExpense, Montant:amountExpense});
  localStorage.setItem("Dépenses", JSON.stringify(storageExpense));
  console.log(JSON.parse(localStorage.getItem("Dépenses")))
});



