const transactions = [
  { type: "income", amount: 10000 },
  { type: "income", amount: 5000 },
  { type: "expense", amount: 2000, category: "Food" },
  { type: "expense", amount: 1500, category: "Travel" },
  { type: "expense", amount: 1000, category: "Shopping" }
];

const monthlyData = [
  { month: "Jan", income: 10000, expense: 4000 },
  { month: "Feb", income: 12000, expense: 5000 },
  { month: "Mar", income: 15000, expense: 4500 }
];

// Total Income
const totalIncome = transactions
  .filter(t => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

// Total Expense
const totalExpense = transactions
  .filter(t => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

// Balance
const balance = totalIncome - totalExpense;

// Display values on pag
const categoryData = {};

transactions.forEach(item => {
  if (item.type === "expense") {
    categoryData[item.category] =
      (categoryData[item.category] || 0) + item.amount;
  }
});

new Chart(document.getElementById("expenseChart"), {
  type: "pie",
  data: {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData)
    }]
  }
});
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["Income", "Expense"],
    datasets: [{
      label: "Amount",
      data: [totalIncome, totalExpense]
    }]
  }
});
new Chart(document.getElementById("monthlyChart"), {
  type: "line",
  data: {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map(item => item.income)
      },
      {
        label: "Expense",
        data: monthlyData.map(item => item.expense)
      }
    ]
  }
});