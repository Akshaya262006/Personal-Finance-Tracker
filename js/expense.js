
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateDashboard();
}
function addExpense(title, amount, category) {
    const expense = {
        id: Date.now(),
        title: title,
        amount: Number(amount),
        category: category,
        date: new Date().toLocaleDateString()
    };
    expenses.push(expense);

    saveExpenses();
    renderExpenses();
}
function deleteExpense(id) {
    expenses = expenses.filter(
        expense => expense.id !== id
    );
    saveExpenses();
    renderExpenses();
}
function editExpense(id) {
    const expense = expenses.find(
        exp => exp.id === id
    );
    if (!expense) return;
    const title = prompt(
        "Expense Title",
        expense.title
    );
    const amount = prompt(
        "Expense Amount",
        expense.amount
    );
    const category = prompt(
        "Expense Category",
        expense.category
    );
    if (title && amount && category) {
        expense.title = title;
        expense.amount = Number(amount);
        expense.category = category;
        saveExpenses();
        renderExpenses();
    }
}
function renderRecentTransactions() {
    const container =
        document.getElementById("recentTransactions");
    if (!container) return;
    container.innerHTML = "";
    const recentExpenses =
        [...expenses]
        .reverse()
        .slice(0, 3);
    if (recentExpenses.length === 0) {
        container.innerHTML =
            "<p style='text-align:center;'>No Transactions Found</p>";
        return;
    }
    recentExpenses.forEach(expense => {
        container.innerHTML += `
            <div class="transaction-item">
                <div>
                    <div class="transaction-title">
                        ${expense.title}
                    </div>
                    <div class="transaction-category">
                        ${expense.category}
                    </div>
                </div>
                <div class="transaction-amount">
                    ₹${expense.amount}
                </div>
            </div>
        `;
    });
}
function renderExpenses() {
    const tableBody =
        document.getElementById("expenseTableBody");
    if (tableBody) {
        let rows = "";
        expenses.forEach(expense => {
            rows += `
                <tr>
                    <td>${expense.title}</td>
                    <td>₹${expense.amount}</td>
                    <td>${expense.category}</td>
                    <td>${expense.date}</td>
                    <td>
                        <button onclick="editExpense(${expense.id})">
                            Edit
                        </button>
                        <button onclick="deleteExpense(${expense.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = rows;
    }
    renderRecentTransactions();
}
document.addEventListener("DOMContentLoaded", () => {
    renderExpenses();
    const expenseForm =
        document.getElementById("expenseForm");
    if (expenseForm) {
        expenseForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const title =
                document.getElementById("expenseTitle").value;
            const amount =
                document.getElementById("expenseAmount").value;
            const category =
                document.getElementById("expenseCategory").value;
            if (
                title.trim() === "" ||
                amount === "" ||
                Number(amount) <= 0
            ) {
                alert("Please enter valid expense details");
                return;
            }
            addExpense(
                title,
                amount,
                category
            );
            expenseForm.reset();
        });
    }
    const toggleBtn =
        document.getElementById("toggleExpenseBtn");
    const expenseSection =
        document.getElementById("expenseSection");
    if (toggleBtn && expenseSection) {
        toggleBtn.addEventListener("click", () => {
            const isHidden =
                expenseSection.style.display === "none";
            if (isHidden) {
                expenseSection.style.display = "block";
                toggleBtn.innerText = "Hide Expenses";
            } else {
                expenseSection.style.display = "none";
                toggleBtn.innerText = "View Expenses";
            }
        });
    }
});