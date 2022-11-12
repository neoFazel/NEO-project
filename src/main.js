let basket = JSON.parse(localStorage.getItem("data")) || []; //shop items container
// **************navbar links accardion
const dropdownContainer = document.querySelectorAll(".dropdown-container");

dropdownContainer.forEach((item) => {
    let btn = item.querySelector(".dropdown-btn");

    btn.addEventListener("click", () => {
        dropdownContainer.forEach((e) => {
            if(e !== item){
                e.classList.remove("show-dropdown-text")
            }else{
                e.classList.toggle("show-dropdown-text")
            }
        })
    } )
})
// ****************navbar mobile menu
const navLinksContainer = document.getElementById('nav-links-container');
const navBtn = document.getElementById('nav-toggle');

navBtn.addEventListener("click", () => {
    navLinksContainer.classList.toggle("show-links-nav")
})

const closeNavBtn = document.getElementById("close-mobile-nav-btn");
closeNavBtn.addEventListener('click', () => {
    navLinksContainer.classList.remove("show-links-nav")
})

// ****************slide show setup******************
const slideshowContainer = document.getElementById("slides-container")
let slideshowContentGenerator = slideShowData.map((x) => {

    return `
    <div class="slide">
        <img class="slideshow-img" src="${x.src}" alt="test image here">

    </div>
    `
}).join('')
slideshowContainer.innerHTML = slideshowContentGenerator

const slides = document.querySelectorAll(".slide")
const points = document.querySelectorAll(".points > span")
const prevSlideshowBtn = document.querySelector(".prev-slideshow-btn")
const nextSlideshowBtn = document.querySelector(".next-slideshow-btn")

// slideshow variables
const timer = 2000  //slide show image changes each 2 s
let activeSlide = 0 //this variable make easier to work with each slides

let classSwitcher = () => {
    slides.forEach((slide) => slide.classList.remove("active-slideshow"))
    points.forEach((point) => point.classList.remove("active-slideshow-point"))
    slides[activeSlide].classList.add("active-slideshow")
    points[activeSlide].classList.add("active-slideshow-point")
}

let goNext = () => {
    classSwitcher()
    activeSlide = (activeSlide == slides.length -1) ? 0 : activeSlide + 1
}
let goPrev = () => {
    activeSlide = (activeSlide == 0) ? slides.length -1 : activeSlide - 1
    classSwitcher()
}

let runSlideshow = setInterval(goNext, timer) //automatically 

points.forEach((point,index) => {
    point.addEventListener('click', () => {
        activeSlide =index
        classSwitcher()
    })
}) // forEach for each function then use clickEvent to select whatEver has clicked

nextSlideshowBtn.addEventListener("click", () => goNext())//next slide by click Event on btn
prevSlideshowBtn.addEventListener("click", () => goPrev())//prev slide by click Event on btn

slideshowContainer.addEventListener("mouseover", () => clearInterval(runSlideshow))
slideshowContainer.addEventListener("mouseleave", () => runSlideshow = setInterval(goNext, timer))

let screenSize = window.screen.width

let slideshowBtnsContainer = document.querySelector(".slideshow-btns")
slideshowBtnsContainer.style.display = 'none'
if(screenSize > 800){
    
    slideshowBtnsContainer.addEventListener("mouseover", () => {
        
        slideshowBtnsContainer.style.display = 'block'
    })
    slideshowContainer.addEventListener("mouseover", () => {
        
        slideshowBtnsContainer.style.display = 'block'
    })
    slideshowContainer.addEventListener("mouseleave", () => {
        
        slideshowBtnsContainer.style.display = 'none'
    })
}

// ***********************scritps belowe is for select and show about addtional information after main slide show ******************************
const ourPerksContainer = document.querySelector(".ourPerks-container");

let ourPerksContent = additionalInfoData.map((item) => {

    return `
    <div>
    <i class="${item.iconClass} outPerk-item-icon"></i>
    <h4 class="ourPerk-item-title">${item.title}</h4>
    </div>
    `
}).join('')
ourPerksContainer.innerHTML = ourPerksContent;


// **************************code below are for best sell which added daynamicly items and click events***********************
let sliderMain = document.getElementById("bss-main");
let items = sliderMain.getElementsByClassName('item')

let next = () => {
    sliderMain.append(items[0])
}
let prev = () => {
    sliderMain.prepend(items[items.length -1])
}


// below i want to dynamicly add which items are discounted more than 0percent them show on main html at best sell slider
let bssItemMain = document.getElementById('bss-main')

let priductsWithDiscount = products.filter((product) => product.discount > 0);

bssItemMain.innerHTML = priductsWithDiscount.map(item => {
    return `
        <!-- sigle item -->
        <div class="item product" id="${item.id}">
            <a href="#">
                <img src="${item.img}" class="bss-item-img" alt="">
                <div class="bss-item-desc">
                    <div class="item-bs-price">
                        <p class="item-discount-price">${item.price - ((item.price/100)* item.discount)} تومان</p>
                        <p class="discount-percent">${item.discount}%</p>
                    </div>
                    <p class="item-old-price">${item.price}</p>
                </div>
            </a>
        </div>
        <!-- sigle item ends here -->
    `
}).join('')






let popupSection = document.querySelector('.product-popup')
let allProducts = document.querySelectorAll('.product')
let productsContainer = document.querySelector('.popup-parts')


const shopContainer = document.getElementById('shop-container');
const btnBrands = document.getElementById('brand-btns');
const itemsContainer = document.getElementById('items-container');

document.addEventListener("DOMContentLoaded", () => {
    displayProductItems(products) //display shop items

    
    const categories = products.reduce((values,item) => { // select unique brand and add همه with reduce

        if(!values.includes(item.brand)){
            values.push(item.brand);
        }
        return values
    },['همه'])
    categories.push(categories.shift()) //move همه to last index of catefories  array
    let categoryBtns = categories.map((category) => {
        return `    <button class="filter-btn" id="${category}" data-id=${category} type="button">${category}</button>    `
    }).join("")
    btnBrands.innerHTML = categoryBtns
    const filterBtns = document.querySelectorAll('.filter-btn');

    document.getElementById('همه').classList.add("active-brand-btn")
    btnBrands.addEventListener('click', e => { //add class list to what filter brand btn i clicked and remove from rest of them
        let id = e.target.dataset.id
        let selectedBtn = e.target
        if(id){
            filterBtns.forEach(btn => {
                btn.classList.remove('active-brand-btn')
                selectedBtn.classList.add('active-brand-btn')
            })
        }
    })
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.id;
            const mainShopcategory = products.filter((productsItem) => {
                if(productsItem.brand === category){
                    return productsItem
                }
            })
            if(category === 'همه'){
                displayProductItems(products)
            }else{
                displayProductItems(mainShopcategory)
            }
        })
    })
})
 
let displayProductItems = (products) => {

    let displayItem = products.map((item) => {
        return `
        <div class="product-shop-container main-product" id="${item.id}">
            <div class="product-shop-image">
                <img src="${item.img}" class="product-shop-img"  alt="${item.title}">
            </div>
            <div class="product-shop-desc">
                <h1 class="title">${item.title}</h1>
                <div>
                    <p class="rate"><i style="color:gold" class="bi bi-star-fill"></i> ${item.rate}</p>
                    <p class="inventory" style="color:var(--red);">${inventoryGene(item.inventoryNumbers)}</p>
                </div>
                <div class="main-item-price" >${priceContentGene(item.price,item.discount,item.inventoryNumbers)}</div>
            </div>
        </div>
        `
    }).join('')

    itemsContainer.innerHTML = displayItem;

    let mainProduct = document.querySelectorAll('.main-product');
    shopPupupGene(mainProduct) //announce function to create popup for each main items products
}


// this function get classList of what element i want to create popup for
// this class list create popup forEach element after click
let shopPupupGene = (classlist) => {
    classlist.forEach((product) => {
        product.addEventListener('click', () => {
            let id = product.id;
            let productArr = products.find(item => {
                return item.id === id
            })
            let productPopupContainer = document.querySelector('.popup-parts')
            popupSection.classList.add('activate-popup')
            
            productPopupContainer.innerHTML = `
            
            <div class="imag-container">
            <img src="${productArr.img}" class="popup-img" alt="${productArr.title}">
            <div class="rate-geranti">
            <p class="geranti">گارانتی ${productArr.geranti}</p>
            <p class="rate"><i style="color:gold" class="bi bi-star-fill"></i>  ${productArr.rate}/5</p>
            </div>
            </div>
            <hr>
            <div class = "product-description-btn">
            <div class="product-buy-btn">
            <button id="${productArr.id}" onclick="increment(${productArr.id})" class="popup-btn" type="button">افزودن به سبد خرید</button>
            </div>
            <div class="product-description">
            <h1 class="popup-title">${productArr.title}</h1>
            <p>:مشخصات</p>
            <h2 class="popup-brand">${productArr.brand} :برند</h2>
            <h2 class="popup-cpu">${productArr.CPU} :CPU</h2>
            <h2 class="popup-RAM">${productArr.RAM} :RAM</h2>
            <h2 class="popup-size">${productArr.screenSize} :اندازه صفحه</h2>
            </div>
            <div class="pp-price">
            <div class="inventory-container">
            <p class="inventory" style="color:var(--red);">${inventoryGene(productArr.inventoryNumbers)}</p>
            </div>
            <div class="main-item-price" >${priceContentGene(productArr.price,productArr.discount,productArr.inventoryNumbers)}</div>
            </div>
            </div>
            
            `
        })
    });
    // scripts to remove product popup with close btn which held inside
    let closeXBtn = document.querySelector('.close-btn')
    closeXBtn.addEventListener('click', () => {
        popupSection.classList.remove('activate-popup')
    })
}
shopPupupGene(allProducts) //create popup bestsell product

    // if statment in order to display inventory numbers in the right way
    const inventoryGene = (num) => {
        if(num > 0){
            return `موجود در انبار`
        } else{
            return `عدم مو جودی`
        }
    }

    const priceContentGene = (price, percent, inventory) => {
        if(inventory === 0){
            return ``
        }
        else if(percent > 0){
            return `
            <div>
                <p>تومان ${price - ((price/ 100)* percent)}</p> <p class="percent">%${percent}</p>   
            </div>
                <p  style="text-decoration: line-through;">${price}</p>
            `
        }else if(percent === 0){
            return `<p style="font-size: 0.9rem;font-weight: 600;"> تومان${price}</p>`
        }
    }


let cartIcon = document.getElementById('total-amount')
// functionality for add items to basket and show in cart section
let increment = (id) => {
    let btnId = id.id;
    let search = basket.find(x => x.id === btnId)
    let item = products.find(x => x.id === btnId)
    if(item.inventoryNumbers === 0){
        alert('عدم موجودی')
    }
    else if(search === undefined){
        basket.push({
            id: btnId,
            item: 1
        })
    }else{
        alert('این محصول انتخاب شد است')
    }
    calculate()
    localStorage.setItem("data",JSON.stringify(basket));
    popupSection.classList.remove('activate-popup') //close popup after its item added to cart
}

// functionality to update total amount after each click
let calculate = () => {
    let cartIconNumber = document.querySelector('.number-icon')
    let cartTotalArr = basket.map(x => x.item);
    cartIconNumber.innerHTML = cartTotalArr.reduce((a,b) => a+b,0)
}
calculate()