const themeBtn = document.getElementById("themeBtn");

const currentTheme =
localStorage.getItem("theme");

if(currentTheme === "light"){
    document.body.classList.add("light-mode");
    themeBtn.innerHTML = "🌙 Dark Mode";
}else{
    document.body.classList.add("dark-mode");
    themeBtn.innerHTML = "☀️ Light Mode";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");

        themeBtn.innerHTML =
        "🌙 Dark Mode";

    }else{

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML =
        "☀️ Light Mode";
    }

});