let userId = JSON.parse(localStorage.getItem("accessKey")).id;
let shipping = false;
let shippingPrice = 0;
let shippingId;
let promo = 0
let TOTAL

async function getUserAds(userId) {
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${userId}`);
    const data = await res.json()
    return data.address
}

async function getDataUser(userid) {
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${userid}`)
    const data = await res.json();
    return data
}

async function updateAddress() {
    const allAds = await getUserAds(userId)
    const ads = allAds.find(item => item.selected);
    document.getElementById("adsTitle").textContent = `${ads.title}`
    document.getElementById("ads").textContent = `${ads.ads}`
}

function showSelectAds() {
    document.querySelector(".checkout").classList.add("hidden")
    document.querySelector(".selectAds").classList.remove("hidden")
}

updateAddress()


async function renderOrder() {
    const res = await getDataUser(userId);
    const cart = res.card;
    console.log(cart)
    cart.forEach(item => {
            document.getElementById("product").insertAdjacentHTML("beforeend", `<div>
            <div class="shoeWrap p-4 flex justify-start items-center rounded-3xl my-3">
                <div class="shoeImage mr-4">
                    <img class="w-32 h-32" src="${item.image}" alt="shoe">
                </div>
                <div class="detail w-full">
                    <div class="flex justify-between items-center ">
                        <p class="font-bold pb-2 w-36 truncate">${item.name}</p>
                    </div>
                    <div class=" my-4 flex justify-between w-2/3 items-center text-gray-500">
                        <p class="rounded-full h-4 w-4 bg-${item.color}-600">
                        <p></p>${item.color}</p>|<p>Sizes = ${item.size}</p></div>
                    <div class="pb-2 flex justify-between items-center">
                        <p id="price" class="font-semibold">$ ${+item.totalPrice}</p>
                        <div class=" ml-4 text-lg flex justify-start items-center rounded-3xl bg-gray-200">

                            <div class="px-4 py-1" id="counter">${item.qty}</div>

                        </div>
                    </div>
                </div>
            </div>`)
        }
    )

}

renderOrder()

async function renderAllAds() {
    const allAds = await getUserAds(userId);
    const sect = document.getElementById("allAddress")
    sect.innerHTML = "";
    allAds.forEach(item => {
        sect.insertAdjacentHTML("beforeend", `<div class="py-4 flex justify-center items-center">
            <div class="p-6 shadow-2xl rounded-2xl border flex justify-start items-center w-full">
                <div class="bg-gray-200 rounded-full mr-4 p-2">
                    <div class="bg-black rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                            <path fill-rule="evenodd"
                                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                  clip-rule="evenodd"/>
                        </svg>

                    </div>
                </div>
                <div class="w-4/5">
                    <p id="adsTitleSelect" class="font-semibold">${item.title}</p>
                    <p id="adsSelect" class="text-gray-400">${item.ads}</p>
                </div>
                <div id="checkbox">
                    ${item.selected ? `<i class="bi bi-check-circle" onclick="changeSelcted.call(this,${item.id})"></i>` : `<i class="bi bi-circle" onclick="changeSelcted.call(this,${item.id})"></i>`}
                </div>
            </div>
        </div>
    </div>`)
    })

}

renderAllAds()

async function changeSelcted(id) {
    const userData = await getDataUser(userId);
    const allAds = userData.address
    allAds.forEach(item => item.selected = false);
    allAds.forEach(item => {
        if (item.id === id) item.selected = true;
    })
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(userData)
    });
    if (res.status) {
        await renderAllAds()
    }
}

function backward() {
    document.querySelector(".checkout").classList.remove("hidden")
    document.querySelector(".selectAds").classList.add("hidden")
    updateAddress()
}

async function renderAllShipping() {
    const res = await fetch("https://63a40071821953d4f2a658d6.mockapi.io/shipping")
    const allShipping = await res.json();
    console.log(allShipping)
    const sect = document.getElementById("allShipping")
    sect.innerHTML = "";
    allShipping[0].shipping.forEach(item => {
        sect.insertAdjacentHTML("beforeend", `<div class="py-4 flex justify-center items-center">
            <div class="p-6 shadow-2xl rounded-2xl border flex justify-start items-center w-full">
                <div class="bg-gray-200 rounded-full mr-4 p-2">
                    <div class="bg-black rounded-full p-1">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" class="w-5 h-5">
  <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z" />
  <path d="M6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.25 5a.75.75 0 00-.75.75v8.514a3.001 3.001 0 014.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 00-1.784-8.549A1.486 1.486 0 0014.823 5H13.25zM14.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
</svg>


                    </div>
                </div>
                <div class="w-3/5">
                    <p id="adsTitleSelect" class="font-semibold">${item.title}</p>
                    <p id="adsSelect" class="text-gray-400">${item.description}</p>
                </div>
                <p class="mr-4">$ ${item.price}</p>
                <div id="checkbox">
                    ${shippingId == item.id ? `<i class="bi bi-check-circle" onclick="changeSelctedShipping.call(this,${item.id},${item.price})"></i>` : `<i class="bi bi-circle" onclick="changeSelctedShipping.call(this,${item.id},${item.price})"></i>`}
                </div>
            </div>
        </div>
    </div>`)
    })

}


async function changeSelctedShipping(id, price,des) {
    // const resget = await fetch("https://63a40071821953d4f2a658d6.mockapi.io/shipping/1")
    // const allShipping = await resget.json();
    // allShipping.shipping.forEach(item=>item.selected=false)
    // allShipping.shipping.forEach(item=>{
    //     if (item.id===id) {
    //         item.selected=true
    //         shipping=true;
    //         shippingPrice=price;
    //         shippingId=
    //         renderAllShipping()
    //     }
    // }

    shipping = true;
    shippingPrice = price;
    shippingId = id;
    shippingdes=des;

    await renderAllShipping()


}

function applyShipping() {
    if (shipping) {
        document.querySelector(".selectShipping").classList.add("hidden");
        document.querySelector(".checkout").classList.remove("hidden");
        updateShipping()
    } else {
        alert("please select shipment Method")
    }
}

function backwardShipping() {
    document.querySelector(".selectShipping").classList.add("hidden");
    document.querySelector(".checkout").classList.remove("hidden");
}

async function showShippingType() {
    document.querySelector(".selectShipping").classList.remove("hidden");
    document.querySelector(".checkout").classList.add("hidden");
    await renderAllShipping()
}
async function updateShipping() {
    const shipsection=document.getElementById("typeShipping")
    shipsection.innerHTML="";
    const resGet = await fetch("https://63a40071821953d4f2a658d6.mockapi.io/shipping/1");
    const allShip = await resGet.json()
    console.log(allShip)
    const methodShipping =allShip.shipping.find(item=>item.id==shippingId)
    if (shipping) {
        shipsection.insertAdjacentHTML("beforeend", `<div class="py-4 flex justify-center items-center">
            <div class="p-6 shadow-2xl rounded-2xl border flex justify-start items-center w-full">
                <div class="bg-gray-200 rounded-full mr-4 p-2">
                    <div class="bg-black rounded-full p-1">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" class="w-5 h-5">
  <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z" />
  <path d="M6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.25 5a.75.75 0 00-.75.75v8.514a3.001 3.001 0 014.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 00-1.784-8.549A1.486 1.486 0 0014.823 5H13.25zM14.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
</svg>


                    </div>
                </div>
                <div class="w-3/5">
                    <p id="adsTitleSelect" class="font-semibold">${methodShipping.title}</p>
                    <p id="adsSelect" class="text-gray-400">${methodShipping.description}</p>
                </div>
                <p class="mr-4">$ ${shippingPrice}</p>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>`)
        document.getElementById("shopping").textContent=shippingPrice;
        document.getElementById("total").textContent = +TOTAL+shippingPrice;
    }
}

async function calcTotalCost() {
    const data = await getDataUser(userId)
    const cart = data.card;
    const total = cart.reduce((a, b) => +a + +b.totalPrice, 0);
    document.getElementById("amount").textContent = total;
    document.getElementById("total").innerHTML="";
    document.getElementById("total").textContent = +total+shippingPrice;
    TOTAL=+total+shippingPrice;
}
calcTotalCost()

function discount() {
   const valInput = document.getElementById("promo").value
    if (valInput === "off30") {
        TOTAL = TOTAL - 30;
        document.getElementById("promo").value=""
        document.getElementById("total").textContent = +TOTAL + shippingPrice;
        document.getElementById("discount").textContent= "-30";
        document.querySelector(".containerInput").insertAdjacentHTML("beforeend", `<div class="text-xl px-4 bg-black text-white rounded-2xl flex items-center justify-between" onclick="removepromo.call(this)"><p>Discount 30%</p><span>-</span></div>`)

    } else {
        alert("its invalid");
    }
}
function removepromo() {
    this.remove()
    calcTotalCost()
    document.getElementById("discount").textContent= "0";
}