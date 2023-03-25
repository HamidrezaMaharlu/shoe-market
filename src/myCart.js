let userid = JSON.parse(localStorage.getItem("accessKey")).id;

//serach in order
document.querySelector("#searchCart").addEventListener("click", function () {
    document.querySelector(".cartInput").classList.toggle("hidden")
    document.querySelector(".searchCart").classList.toggle("inputWishlistContainer")

})

//get data
async function getDataUser(id) {
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${id}`)
    const data = await res.json();
    return data
}

function showSelc() {
    
}

getDataUser(userid).then(res => {
    const activeData = res.card;
    if (activeData.length > 0) renderCartPage(activeData, "productsCart")
    if (activeData.length === 0) renderNotFound(".productsCart")
})

function renderCartPage(data, place) {
    const selectDom = document.getElementsByClassName(`${place}`)[0]
    console.log(selectDom)
    selectDom.innerHTML = "";
    data.forEach(async item => {
        const resShoe = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/products/${item.shoeid}`)
        const dataShoe = await resShoe.json()
        selectDom.insertAdjacentHTML("beforeend", `<div class="shoeWrap p-4 flex justify-start items-center rounded-3xl my-3">
                <div class="shoeImage mr-4">
                    <img  src="${dataShoe.image}" alt="shoe">
                </div>
                <div class="detail w-full">
                    <div class="flex justify-between items-center ">
                    <p class="font-bold pb-2 w-36 truncate">${dataShoe.name}</p>
                    <div onclick="delCart.call(this,${item.id},${item.shoeid})">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
</svg>
</div>
                    </div>
                    <div class=" my-4 flex justify-between w-2/3 items-center text-gray-500">
                    <p class="rounded-full h-4 w-4 bg-${item.color}-600">
                        <p></p>${item.color}</p>|<p>Sizes = ${item.size}</p></div>
                    <div class="pb-2 flex justify-between items-center">
                    <p id="price" class="font-semibold">$ ${+dataShoe.price * +item.qty}</p>
                    <div class=" ml-4 text-lg flex justify-start items-center rounded-3xl bg-gray-200">
                <div class="px-4 py-1" onclick="decrease.call(this,${dataShoe.price},${item.id})">-</div>
                <div class="px-4 py-1" id="counter">${item.qty}</div>
                <div class="px-4 py-1" onclick="increase.call(this,${dataShoe.price},${item.id})">+</div>
            </div>
                </div>
            </div>`)
        await calcTotalCost()
    })
}

//  search
const inputCart = document.getElementById("cartInput")
inputCart.addEventListener("input", function () {
    if (this.value) {
        (async () => {
            const data = await getDataUser(userid)
            const filterData = data.card
            const search = filterData.filter((item => (item.name).toLowerCase().includes(this.value)))
            if (search.length > 0) renderCartPage(search, "productsCart")
            if (search.length === 0) {
                renderNotFound(".productsCart")
            }
        })();
    } else {
        (async () => {
            const data = await getDataUser(userid)
            const filterData = data.card
            if (filterData.length > 0) renderCartPage(filterData, "productsCart")
            if (filterData.length === 0) renderNotFound(".productsCart")
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

async function decrease(price, shoeId) {
    let count = +this.nextElementSibling.textContent
    count > 1 ? count = count - 1 : null
    this.nextElementSibling.textContent = `${count}`;
    this.parentElement.previousElementSibling.textContent = `$ ${count * price}`;

    const data = await getDataUser(userid)
    const cart = data.card;
    const find = cart.find(item => item.id === shoeId)
    find.qty = count;
    find.totalPrice = count * price;
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${userid}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    if (res.status) {
        await calcTotalCost()
    }
}

async function increase(price, shoeId) {
    let count = +this.previousElementSibling.textContent
    count++
    this.previousElementSibling.textContent = `${count}`;
    this.parentElement.previousElementSibling.textContent = `$ ${count * price}`;

    const data = await getDataUser(userid)
    const cart = data.card;
    const find = cart.find(item => item.id === shoeId)
    find.qty = count;
    find.totalPrice = count * price
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${userid}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    if (res.status) {
        await calcTotalCost()
    }
}

async function delCart(id,shoeId) {
    const getShoe= await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/products/${shoeId}`)
    const shoedata =await getShoe.json();
    const data = await getDataUser(userid)
    const cart = data.card;
    const find = cart.find(item => item.id === id)
    document.querySelector("body").insertAdjacentHTML("beforeend", `<div class="modal duration-1000 w-screen h-screen bg-black absolute top-0 bg-opacity-50 flex items-end">
    <div class=" absolute px-6 bg-white rounded-t-3xl w-full h-1/2 bg-opacity-100">
        <p class="py-4 text-center font-bold text-xl">Remove From Cart</p>
        <hr>
        <div>
            <div class="shoeWrap p-4 flex justify-start items-center rounded-3xl my-3">
                <div class="shoeImage mr-4">
                    <img class="w-32 h-32" src="${shoedata.image}" alt="shoe">
                </div>
                <div class="detail w-full">
                    <div class="flex justify-between items-center ">
                        <p class="font-bold pb-2 w-36 truncate">${find.name}</p>
                    </div>
                    <div class=" my-4 flex justify-between w-2/3 items-center text-gray-500">
                        <p class="rounded-full h-4 w-4 bg-${find.color}-600">
                        <p></p>${find.color}</p>|<p>Sizes = ${find.size}</p></div>
                    <div class="pb-2 flex justify-between items-center">
                        <p id="price" class="font-semibold">$ ${+find.totalPrice}</p>
                        <div class=" ml-4 text-lg flex justify-start items-center rounded-3xl bg-gray-200">

                            <div class="px-4 py-1" id="counter">${find.qty}</div>

                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class=" py-4 flex justify-between items-center">
                <button class="cancel bg-gray-200  rounded-3xl py-2  w-1/2 mr-2" onclick="removeModal.call(this)">Cancel</button>
                <button class="ok bg-black text-white rounded-3xl py-2  w-1/2 " onclick="delShoe.call(this,${find.id})">Yes, Remove</button>
            </div>
        </div>
    </div>
</div>`)
    // const filter = cart.filter(item => item.id !== shoeId)
    // data.card = filter;
    // const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${id}`, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     method: "PUT",
    //     body: JSON.stringify(data)
    // });
    // if (res.status) location.reload()
}

function removeModal() {
    document.querySelector(".modal").remove()
}
async function delShoe(shoeId) {
    const data = await getDataUser(userid)
    const cart = data.card;
    const filter = cart.filter(item => item.id !== shoeId)
    data.card = filter;
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${userid}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    if (res.status) location.reload()
}
async function calcTotalCost() {
    const data = await getDataUser(userid)
    const cart = data.card;
    console.log(cart)
    const total = cart.reduce((a, b) => +a + +b.totalPrice, 0);
    console.log(total)
    document.getElementById("totalPrice").textContent = total;
}
