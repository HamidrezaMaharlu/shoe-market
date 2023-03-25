function loading() {
    document.querySelector(".loading").classList.add("hidden");
    document.querySelector(".welcome").classList.remove("hidden");
}

function welcome() {
    document.querySelector(".welcome").classList.add("hidden");
    document.querySelector(".page1").classList.remove("hidden");
}

document.getElementById("nextP1").addEventListener("click", function () {
    document.querySelector(".page1").classList.add("hidden")
    document.querySelector(".page2").classList.remove("hidden")
})
document.getElementById("nextP2").addEventListener("click", function () {
    document.querySelector(".page2").classList.add("hidden")
    document.querySelector(".page3").classList.remove("hidden")
})
document.getElementById("getStarted").addEventListener("click", function () {
    document.querySelector(".page3").classList.add("hidden")
    document.querySelector(".loginPage").classList.remove("hidden")
})
const setTimeLoad = setTimeout(loading, 2000)
const setTimeWelcome = setTimeout(welcome, 5000)


const form = document.querySelector("form");
const username = document.getElementById("username")
const password = document.getElementById("password")
form.addEventListener("input", (ev) => {
    if (ev.target.tagName !== "INPUT") return
    document.querySelectorAll("input:invalid").length===0? document.getElementById("logIn").classList.add("selected"):document.getElementById("logIn").classList.remove("selected")
    document.querySelectorAll("input:invalid").forEach(item => {
        if (item === ev.target) {
            item.style.border = "1px solid #eb363d ";
            item.style.outline = "1px solid #eb363d ";
            item.previousElementSibling.style.color = "#eb363d";
        }
    })
    document.querySelectorAll("input:valid").forEach(item => {
        if (item === ev.target) {
            item.style.border = "1px solid #5dc5a4 "
            item.style.outline = "1px solid #5dc5a4 "
            item.previousElementSibling.style.color = "#5dc5a4";
        }
    })
})
form.addEventListener("submit", async function (ev) {
        ev.preventDefault();
        const formData = new FormData(form);
        const userInputs = Object.fromEntries(formData);
        console.log(userInputs);
        const res = await fetch("https://63a40071821953d4f2a658d6.mockapi.io/users")
        const allUser = await res.json();
        const findUser= allUser.find(item=>item.username===userInputs.email)
    if (findUser) {
        if (findUser.password === userInputs.password) {
            const obj ={id:`${findUser.id}`}
            localStorage.setItem("accessKey",JSON.stringify(obj))
            window.location.href="homePage.html"
        } else {
            alert("password is wrong")
        }
    } else {
        alert("username is wrong")
    }


    }
)