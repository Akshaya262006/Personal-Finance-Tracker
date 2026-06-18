const themeBtn =
document.getElementById("themeBtn");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeBtn.innerText = "Light Mode";
}
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
        themeBtn.innerText = "Light Mode";
    }else{
        localStorage.setItem("theme","light");
        themeBtn.innerText = "Dark Mode";
    }
});