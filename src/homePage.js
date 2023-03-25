const database = []
let userId=JSON.parse(localStorage.getItem("accessKey")).id;
const cartData={qty:1}
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'eb23aae431msh7cc21de6aba2367p1c6673jsnaddba17a7b83',
//         'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com'
//     }
// };
//
// fetch('https://shoes-collections.p.rapidapi.com/shoes', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

async function getDataAllShoes() {
    const res = await fetch("https://63a40071821953d4f2a658d6.mockapi.io/products")
    const data = await res.json();
    return data
}
async function getDataUser(id) {
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${id}`)
    const data = await res.json();
    return data
}

console.log(new Date().getHours())
function time() {
    const date = new Date().getHours()
if(date<=11) return "Good Morning"
if(date>11 && date<=15) return "Good afternoon "
if(date>=16) return "Good evening"
}

getDataAllShoes().then(res => {
    renderHomepage(res, "products")
    document.getElementById("time").innerHTML = `${time()}`
});
getDataUser(userId).then(res=>{
    document.getElementById("avatar").src=`${res.image}`
    document.getElementById("username").textContent=`${res.firstName} ${res.lastName}`
})

function renderHomepage(data, place) {
    const selectDom = document.getElementsByClassName(`${place}`)[0]
    selectDom.innerHTML = ""
    data.forEach(item => {
        selectDom.insertAdjacentHTML("beforeend", `<div class="shoe" onclick="renderProduct.call(this,${item.id})">
            <div class="shoeImage bg-gray-100 p-8 flex justify-center items-center rounded-lg">
                <img src="${item.image}" alt="">
            </div>
            <p class="shoeName font-semibold">${item.name}</p>
            <p class="shoePrice text-xs font-semibold">$ ${item.price}</p>
        </div>`)
    })
}
function renderBrandpage(data, place) {
    const selectDom = document.querySelector(`${place}`)
    selectDom.innerHTML = ""
    data.forEach(item => {
        selectDom.insertAdjacentHTML("beforeend", `<div class="shoe">
            <div class="shoeImage bg-gray-100 p-8 flex justify-center items-center rounded-lg">
                <img src="${item.image}" alt="">
            </div>
            <p class="shoeName font-semibold">${item.name}</p>
            <p class="shoePrice text-xs font-semibold">$ ${item.price}</p>
        </div>`)
    })
}

function renderWishlist(data, place) {
    const selectDom = document.getElementsByClassName(`${place}`)[1]
    selectDom.innerHTML = ""
    data.forEach(item => {
        selectDom.insertAdjacentHTML("beforeend", `<div class="shoe">
            <div class="shoeImage bg-gray-100 p-8 mb-2 relative flex justify-center items-center rounded-lg">
                <img src="${item.image}" alt="">
                <div class="liked bg-gray-500 absolute rounded-full top-3 right-3 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
            </div>
            <p class="shoeName font-semibold">${item.name}</p>
            <div class="details my-2 flex justify-between items-center">
                <div class="starIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                    </svg>
                </div>
                <div class="mx-2 text-xs">${item.rate}</div>
                <p>|</p>
                <div class="numberOfSold mx-2 py-1 px-2 rounded-xl bg-gray-100">
                    <p class="text-xs">${item.count} sold</p>
                </div>
            </div>
            <p class="shoePrice text-xs font-semibold">$ ${item.price}</p>
        </div>`)
    })
}

function renderSearchResult(val, num, place) {
    const selectDom = document.querySelector(`${place}`);
    selectDom.innerHTML = "";
    selectDom.insertAdjacentHTML("beforeend", `<div class="flex justify-between items-center my-2"><p>Result for"${val}"</p><p class="bg-gray-300 text-white rounded-full px-2">${num}</p></div>`)
}



// add event listener for like and wishlist
document.querySelector(".like").addEventListener("click", async function () {
    document.querySelector(".homepage").classList.add("hidden")
    document.querySelector(".wishList").classList.remove("hidden")
    const res = await getDataAllShoes()
    const search = res.filter(item => item.liked)
    if (search.length) renderWishlist(search, "products")
    if (search.length === 0) renderNotFound(".products")

})
document.querySelector(".wishList .arrowLeft").addEventListener("click", function () {
    document.querySelector(".homepage").classList.remove("hidden")
    document.querySelector(".wishList").classList.add("hidden")

})

// add event Listener for home page search
const inputHomepage = document.querySelector(".input input")
inputHomepage.addEventListener("input", function () {
    if (this.value) {
        document.querySelector(".brands").classList.add("hidden");
        document.querySelector(".mostPopular").classList.add("hidden");

        (async () => {
            const search = await getDataAllShoes().then(res => res.filter(item => (item.name).toLowerCase().includes(this.value)))
            if (search.length > 0) renderSearchResult(this.value, search.length, ".searchResult")
            if (search.length > 0) renderHomepage(search, "products")
            if (search.length === 0) {
                renderNotFound(".products")
                renderSearchResult(this.value, search.length, ".homepage .searchResult")
            }
        })();
    } else {
        document.querySelector(".brands").classList.remove("hidden");
        document.querySelector(".mostPopular").classList.remove("hidden");
        document.querySelector(".homepage .searchResult").innerHTML = "";
    }
})
// add event Listener for wishlist page search
const inputWishlist = document.getElementById("wishListInput")
inputWishlist.addEventListener("input", function () {
    if (this.value) {
        (async () => {
            const data = await getDataAllShoes()
            const filterData = data.filter(item => item.liked)
            const search = filterData.filter((item => (item.name).toLowerCase().includes(this.value)))
            renderSearchResult(this.value, search.length, ".wishList .searchResult")
            if (search.length > 0) renderWishlist(search, "products")
            if (search.length === 0) {
                renderNotFound(".wishList .products")
                renderSearchResult(this.value, search.length, ".wishList .searchResult")
            }
        })();
    } else {
        (async () => {
            const data = await getDataAllShoes()
            const filterData = data.filter(item => item.liked)
            const search = filterData.filter((item => (item.name).toLowerCase().includes(this.value)))
            document.querySelector(".wishList .searchResult").innerHTML = "";
            if (search.length > 0) renderWishlist(search, "products")
            if (search.length === 0) renderNotFound(".wishList .products")
        })();
    }
})

// add event Listener for brands filter
document.getElementsByClassName("mostPopular--badge")[0].addEventListener("click", function (e) {
    if (e.target.className !== "badge") return
    document.querySelectorAll(".badge").forEach(item=>item.classList.remove("selected"))
    if (e.target.id !== "all") {
        const selectedId= e.target.id;
        e.target.classList.add("selected")
        document.getElementById("brand").innerHTML=selectedId.toUpperCase();
        (async () => {
            const data = await getDataAllShoes()
            const search = data.filter(item => item.brand == e.target.id);
            if (search.length) renderHomepage(search, "products");
            if (!search.length) renderNotFound(".products")
        })()
    }
    if (e.target.id === "all") {
        e.target.classList.add("selected")
        document.getElementById("brand").innerHTML="All";
        (async () => {
            const data = await getDataAllShoes()
            renderHomepage(data, "products")
        })()
    }

})

// add event Listener for wishList brands filter

document.getElementsByClassName("mostPopular--badge")[1].addEventListener("click", function (e) {
    if (e.target.className !== "badge") return
    document.querySelectorAll(".badge").forEach(item=>item.classList.remove("selected"))
    if (e.target.id !== "all") {
        e.target.classList.add("selected");
        (async () => {
            const data = await getDataAllShoes()
            const search = data.filter(item => item.brand === e.target.id && item.liked == true);
            if (search.length > 0) renderWishlist(search, "products");
            if (search.length == 0) renderNotFound(".wishList .products")
        })()
    }
    if (e.target.id === "all") {
        e.target.classList.add("selected");
        (async () => {
            const data = await getDataAllShoes()
            const search = data.filter(item => item.liked == true);
            if (search.length > 0) renderWishlist(search, "products");
            if (search.length == 0) renderNotFound(".wishList .products")

        })()
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

//serach in wishlist
document.querySelector("#searchWishlist").addEventListener("click", function () {
    document.querySelector(".wishListInput").classList.toggle("hidden")
    document.querySelector(".searchWish").classList.toggle("inputWishlistContainer")

})

// brand Page
document.querySelectorAll(".brand").forEach(item=>item.addEventListener("click",function () {
    document.querySelector(".homepage").classList.add("hidden");
    document.querySelector(".brandPage").classList.remove("hidden");
    document.querySelector(".brandPage").insertAdjacentHTML("beforeend", `<header class="py-4 flex items-center justify-between h-16">
        <div class="arrowLeft flex " onclick="backward.call(this)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
            <p class="font-bold">${this.dataset.about.toUpperCase()}</p>
        </div>
    </header>
    <div class="products pt-4"></div>`);
    (async () => {
        const data = await getDataAllShoes()
        const search = data.filter(item => item.brand == this.dataset.about);
        if (search.length) renderBrandpage(search, ".brandPage .products");
        if (!search.length) renderNotFound(".brandPage .products")
    })()

}))

function backward() {
    document.querySelector(".brandPage").innerHTML="";
    document.querySelector(".brandPage").classList.add("hidden");
    document.querySelector(".productPage").classList.add("hidden");
    document.querySelector(".homepage").classList.remove("hidden");

}

async function renderProduct(id) {
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/products/${id}`)
    const data = await res.json();
    cartData.price=data.price
    cartData.image=data.image;
    document.querySelector(".homepage").classList.add("hidden");
    document.querySelector(".brandPage").classList.remove("hidden");
    const productPage = document.querySelector(".productPage")
    productPage.innerHTML="";
    productPage.classList.remove("hidden")
    productPage.insertAdjacentHTML("beforeend",`<div>
        <div class="arrowLeft flex gray p-6 " onclick="backward.call(this)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
        </div>
        <div>
            <img class="w-full" src="${data.image}" alt="shoe">
        </div>
        <div class="px-6">
        <div class="flex justify-between items-center my-4">
            <p class="font-bold text-lg">${data.name}</p>
            <div class="like" onclick="doLiked.call(this,${data.id},${data.liked})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="${data.liked?"black":"none"}" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                </svg>
            </div>
        </div>
        <div class="details my-2 flex justify-start items-center my-4">
            <div class="numberOfSold mr-2 py-1 px-2 rounded-xl bg-gray-100">
                <p class="text-xs">${data.count} sold</p>
            </div>
            <div class="starIcon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                </svg>
            </div>
            <div class="mx-2 text-xs">${data.rate}</div>
        </div>
        <hr>
        <div class="my-4">
            <p class="font-bold">Description</p>
            <p>${data.description}</p>
        </div>
        <div class="flex justify-start items-center">
            <div class="w-1/2 mr-4" >
                <p>Size</p>
                <div class="py-1 flex justify-between items-center overflow-auto" id="size">${data.availableSize.map(item=>
        `<p class="rounded-full h-8 w-8 bg-gray-200 flex justify-center items-center" onclick="selectSize.call(this)">${item}</p>`).join("")}
                </div>
                
            </div>
            <div class="w-1/2">
                <p>Color</p>
                <div class="py-1 flex justify-between items-center overflow-auto" id="color">${data.colors.map(item=>
                    `<p class=" relative rounded-full h-8 w-8 bg-${item}-600" data-color="${item}" onclick="selectColor.call(this)"></p>`).join("")}
                </div>
            </div>
        </div>
        <div class="flex justify-start items-center my-4">
            <p>Quantity</p>
            <div class=" ml-4 text-lg flex justify-start items-center rounded-3xl bg-gray-200">
                <div class="px-4 py-1" onclick="decrease.call(this,${data.price})">-</div>
                <div class="px-4 py-1" id="counter">1</div>
                <div class="px-4 py-1" onclick="increase.call(this,${data.price})">+</div>
            </div>
        </div>
        <hr>
        <div class="py-4 flex justify-between items-center">
            <div>
                <p>Total price</p>
                <p id="price" class="font-bold text-lg">$ ${data.price}</p>
            </div>
            <div class="flex justify-between items-center bg-black text-white rounded-3xl py-2 px-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4 mr-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                    </svg>

                </div>
                <p onclick="addToCart.call(this,${data.id})" data-name="${data.name}"">Add To Cart</p>
            </div>
        </div>
        </div>
    </div>`)


}

function decrease(price) {
   let count = +this.nextElementSibling.textContent
    count>1?count=count-1:null
    document.getElementById("counter").textContent=`${count}`;
   cartData.qty=count
    document.getElementById("price").textContent=`$ ${count*price}`;
}
function increase(price) {
    let count = +this.previousElementSibling.textContent
    count++
    document.getElementById("counter").textContent=`${count}`;
    cartData.qty=count
    document.getElementById("price").textContent=`$ ${count*price}`;
    console.log(cartData)

}
function selectSize() {
    for (const item of this.parentElement.children) {
        item.classList.remove("selected")
    }
    this.classList.add("selected")
    cartData.size=this.textContent
}
function selectColor(col) {
    for (const item of this.parentElement.children) {
        item.classList.remove("selectedColor")
    }
    this.classList.add("selectedColor")
    cartData.color=this.dataset.color;
}
async function doLiked(id,like) {
    const resGet = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/products/${id}`)
    const dataGet = await resGet.json();
    dataGet.liked= !dataGet.liked;
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/products/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(dataGet)
    })
    if (res.status) await renderProduct(id)

}

async function addToCart(id) {
    if (!cartData.size) {
        alert("select size");
        return
    }
    if (!cartData.color) {
        alert("select color");
        return
    }
    cartData.id=Date.now()
    cartData.shoeid=id;
    cartData.name=this.dataset.name
    console.log(cartData.qty)
    cartData.totalPrice= cartData.price * +cartData.qty;
    const getUser =await getDataUser(userId)
    getUser.card.push(cartData);
    const res = await fetch(`https://63a40071821953d4f2a658d6.mockapi.io/users/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(getUser)
    })
    if (res.status) location.reload()
    console.log(cartData)


}

