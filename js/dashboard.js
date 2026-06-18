function updateDashboard() {
    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    let expenses = JSON.parse(localStorage.getItem("expenses"))|| [];
    let totalIncome = incomes.reduce((total, income) => total + Number(income.amount),0);
    let totalExpense = expenses.reduce((total, expense) => total + Number(expense.amount),0);
    let balance = totalIncome - totalExpense;
    document.getElementById("totalIncome").innerText ="₹" + totalIncome;
    document.getElementById("totalExpense").innerText ="₹" + totalExpense;
    document.getElementById("balance").innerText ="₹" + balance;
}
updateDashboard();
let health = 0;
if(totalIncome > 0){
    health = ((balance / totalIncome) * 100).toFixed(0);
}
document.getElementById("financialHealth").innerText =
health + "%";