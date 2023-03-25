let selectedPage="basket";
let id =JSON.parse(localStorage.getItem("accessKey")).id;
//serach in order
document.querySelector("#searchOrder").addEventListener("click", function () {
    document.querySelector(".orderInput").classList.toggle("hidden")
    document.querySelector(".searchOrder").classList.toggle("inputWishlistContainer")

})

//get data
async function getDataUser(id) {
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${id}`)
    const data = await res.json();
    return data
}

getDataUser(id).then(res=>{const activeData =res.basket;
    renderOrderPage(activeData,"productsOrder")})


document.getElementById("active").addEventListener("click",async function () {
    document.getElementById("completed").classList.remove("border-b-black")
    selectedPage="basket";
    this.classList.add("border-b-black")
    const data = await getDataUser(id)
    const activeData =data.basket;
    renderOrderPage(activeData,"productsOrder")

})

document.getElementById("completed").addEventListener("click",async function () {
    document.getElementById("active").classList.remove("border-b-black")
    selectedPage="completedBuy"
    this.classList.add("border-b-black");
    const data = await getDataUser(id)
    const completedData =data.completedBuy;
    renderOrderPage(completedData,"productsOrder")
})



function renderOrderPage(data,place) {
    const selectDom = document.getElementsByClassName(`${place}`)[0]
    console.log(selectDom)
    selectDom.innerHTML = "";
    data.forEach(item => {
        selectDom.insertAdjacentHTML("beforeend", `<div class="shoeWrap p-4 flex justify-start items-center rounded-3xl my-3">
                <div class="shoeImage mr-4">
                    <img  src="${item.image}" alt="shoe">
                </div>
                <div class="detail w-full">
                    <p class="font-bold pb-2">${item.name}</p>
                    <div class="flex justify-between items-center text-gray-500"><p
                            class="rounded-full h-4 w-4 bg-${item.color}-600">
                        <p></p>${item.color}</p>|<p>Sizes = ${item.size}</p>|<p>Qty = ${item.qty}</p></div>
                    <p class=" my-2 py-1 px-1 bg-gray-300 w-24 rounded-lg text-center">${item.status}</p>
                    <div class="pb-2 flex justify-between items-center"><p class="font-semibold">$ ${item.totalPrice}</p>
                        ${selectedPage==="basket"?`<p class="bg-black text-white px-4 py-1 rounded-2xl">Track Order</p></div>`:`<p class="bg-black text-white px-4 py-1 rounded-2xl">Buy again</p></div>`}
                </div>
            </div>`)
    })
}
//  search
const inputOrder = document.getElementById("orderInput")
inputOrder.addEventListener("input", function () {
    if (this.value) {
        (async () => {
            const data = await getDataUser(id)
            const filterData = data[selectedPage]
            const search = filterData.filter((item => (item.name).toLowerCase().includes(this.value)))
            if (search.length > 0) renderOrderPage(search, "productsOrder")
            if (search.length === 0) {
                renderNotFound(".myOrder .productsOrder")
            }
        })();
    } else {
        (async () => {
            const data = await getDataUser(id)
            const filterData = data[selectedPage]
            document.querySelector(".productsOrder .searchResult").innerHTML = "";
            if (filterData.length > 0) renderOrderPage(filterData, "productsOrder")
            if (filterData.length === 0) renderNotFound(".myOrder .productsOrder")
        })();
    }
})

function renderNotFound(place) {
    const selectDom = document.querySelector(`${place}`)
    selectDom.innerHTML = "";
    selectDom.insertAdjacentHTML("beforeend", `<div class="nothing flex flex-col items-center mb-2">
    <div class="notFoundImage">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
    </div>
    <p>Not Found</p>
    <p>Sorry, the keyword you entered can not be found</p>
</div>`)
}