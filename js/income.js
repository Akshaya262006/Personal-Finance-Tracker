let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

function saveIncomes() {
    localStorage.setItem("incomes", JSON.stringify(incomes));

    if (typeof updateDashboard === "function") {
        updateDashboard();
    }
}

function addIncome(source, amount) {

    const income = {
        id: Date.now(),
        source,
        amount: Number(amount),
        date: new Date().toLocaleDateString()
    };

    incomes.push(income);

    saveIncomes();
    renderIncome();
}

function renderIncome() {

    const tbody = document.getElementById("incomeTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    incomes.forEach(income => {

        tbody.innerHTML += `
            <tr>
                <td>${income.source}</td>
                <td>₹${income.amount}</td>
                <td>${income.date}</td>
                <td>
                    <button onclick="deleteIncome(${income.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteIncome(id) {

    incomes = incomes.filter(
        income => income.id !== id
    );

    saveIncomes();
    renderIncome();
}

document.addEventListener("DOMContentLoaded", () => {

    renderIncome();

    const incomeForm =
        document.getElementById("incomeForm");

    if (incomeForm) {

        incomeForm.addEventListener("submit", function(e) {

            e.preventDefault();

            const source =
                document.getElementById("incomeSource").value;

            const amount =
                document.getElementById("incomeAmount").value;

            addIncome(source, amount);

            incomeForm.reset();
        });
    }
});