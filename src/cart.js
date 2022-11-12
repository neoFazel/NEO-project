let basket = JSON.parse(localStorage.getItem("data")) || []; //shop items container

// variables(containers)
let cartContainer = document.querySelector('.cart-items');
let billContainer = document.querySelector('.cart-bill');
let fixedBill = document.querySelector('.fixed-bill');


let calculate = () => { // calculte total shop items and show on number-icon class
    let cartIconNumber = document.querySelector('.number-icon')
    let cartTotalArr = basket.map(x => x.item);
    cartIconNumber.innerHTML = cartTotalArr.reduce((a,b) => a+b,0)
}
calculate()


let generateShoppingCart = () => {
    if (basket.length !== 0) {
        return cartContainer.innerHTML = basket.map(x => {
            let {id,item} = x
            let search = products.find(y => y.id === id)
            let cartPricesGene = (price, discount) => { //generate price innerHTML
                if(discount === 0){
                    return `
                    <p class="single-price">    تومان${price}</p>
                    `
                }else{
                    return `
                    <div class="discounted">
                        <p>تومان تخفیف</p>  
                        <p>${(price / 100)* discount}</p>
                    </div>
                    <div class="main-price">
                        <p>تومان</p>  
                        <p>${price}</p>
                    </div>`
                } 
            }
            let iconGenerate = () => {
                if(item > 1){
                    return `bi bi-dash-lg`
                }else{
                    return `bi bi-trash`
                }
            }
            
            return `
            <div class="single-product">
                <div class="desc">
                    <h1>${search.title}</h1>
                    <h2>${search.CPU} :cpu ,${search.RAM} :RAM, ${search.screenSize}:صفحه </h2>
                    <p>گارانتی: ${search.geranti} </p>
                    <p>${search.rate}<i style="color:gold;" class="bi bi-star-fill"></i></p>
                    <div class="prices">
                        ${cartPricesGene(search.price,search.discount)}
                    </div>
                </div>
                <div class="img-quantity">
                    <img src="${search.img}" class="img"  width="125" alt="${search.title}">
                    <div class="quantity">

                        <i onclick="decrement(${search.id})" style="color:red;" class="${iconGenerate()}"></i>
                        <div id="${id}" class="quantity">
                            ${item === undefined ? 0 : item}
                        </div>
                        <i onclick="increment(${search.id})" class="bi bi-plus-lg"></i>

                    </div>
                </div>
            </div>
            `
        }).join('')
    }else{
        return cartContainer.innerHTML =  `
        <div class="empty-cart-container">
        <i class="bi bi-bag-dash-fill"></i>
        <p>سبد شما خالی است</p>
        <button><a href="main.html">بازگشت به صفحه اصلی</a></button>
        </div>
        `    
    }
}
generateShoppingCart()

let increment = (id) => { //click function to increase each item amount then update, then generate cart items again with new amounts finally save in localstorage
    let selectedItem = id
    let search = basket.find(x => x.id === selectedItem.id)
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    }
    else{
        search.item += 1
    }
    update(selectedItem.id)
    generateShoppingCart()
    localStorage.setItem("data",JSON.stringify(basket));
}
let decrement = (id) => { //click function to decrease item amount ......
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
    if(search === undefined)return
    else if(search.item === 0)return
    else{
        search.item -=1
    }
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0 )
    generateShoppingCart()
    localStorage.setItem("data",JSON.stringify(basket));2
}

let update = (id) => { // put new amout in each item quantity container
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculate()
    totalAmount()
}   


// scripts to calculate total cart bill and show it in cart-bill class
let totalAmount = () => {
    if(basket.length !== 0){





            // calculate items with 0 percent discount(total)
            let totalPriceNoDiscounted = 0
            let noDiscountArr = basket.map((x) => { // product items which have discount === 0 percent
                let {id,item} = x;
                let search = products.find(y => y.id === id);
                if(search.discount === 0) {
    
                    return search
                }
            })
            let noDiscountBasketArramain = noDiscountArr.filter(y => y !== undefined) //discounted items in product which exist in basket
            let totalPriceNoDiscountedProduct= noDiscountBasketArramain.map((x)=> { //final step to calculate total product price with out get discounted
                let digit = x.price
                let same = basket.map(y =>{
                    if( y.id === x.id){
                        return y.item * digit
                    }
                })
                return same
            })
            for(let i= 0; i < totalPriceNoDiscountedProduct.length; i++){
                
                let finalTwoNoDiscount = totalPriceNoDiscountedProduct[i].filter(y => y !== undefined)
                totalPriceNoDiscounted += finalTwoNoDiscount[0] 
                
            }
            //////////////////////////////////////// totalPriceNoDiscounted

            //calculate items with more than 0 percent discount(total)
            let totalPriceDiscounted =0 // total discounted price in basket
            let discountBasketArr = basket.map((x) => { // product items which have discount more than 0 percent
                let {id,item} = x;
                let search = products.find(y => y.id === id);
                if(search.discount > 0) {
    
                    return search
                }
            })
            let discountBasketArramain = discountBasketArr.filter(y => y !== undefined) //discounted items in product which exist in basket
            let final = discountBasketArramain.map(x => { // basket items * its discounted price
                let digit = x.price - ((x.price / 100)* x.discount)
                let same = basket.map(y =>{
                    if( y.id === x.id){
                        return y.item * digit
                    }
                })
                return same
            })
    
    
    
            for(let i= 0; i < final.length; i++){
                
                let finalTwo = final[i].filter(y => y !== undefined)
                totalPriceDiscounted += finalTwo[0] 
                
            }
            ////////////////////////////////////////////totalPriceDiscounted
        
        // calculate main price(withour getting discouted)
        let amount = basket.map((x) => {
            let {id,item} = x;
            let search = products.find(y => y.id === id);
            return item * search.price
        }).reduce((a,b) => a+b,0)
        ////////////////////////////////////////////
        
        // calculate customer profit of this shopping
        let totanProfit = amount - (totalPriceDiscounted+totalPriceNoDiscounted)
        //////////////////////////////////////////////

        let showMainPrice = (main, discountedAmount) => { //show total amount in if condition

                return `
                <p>:جمع کل</p>
                <p class="total"><span>تومان</span>${totalPriceNoDiscounted+totalPriceDiscounted}</p>
                `
        }

        //main bill with all shop information   
        fixedBill.innerHTML = `
            <div class="container">
            <div>
            ${showMainPrice(amount,0)}
            </div>
            <button type="button" class="checkout-btn"> ادامه خرید</button>
            </div>
        `
        if(basket.length === 0){
            fixedBill.style.display='none';
        
        }

        //fixed bill show total bill and chackout btn
        billContainer.innerHTML = ` 
        <div class="container">
            <h1> سبد خرید شما</h1>
            <div class="title-underline"></div>
            <div class="main">
            <div class="total">
            <p>${amount}تومان</p>
            <p>:قیمت کل</p>
            </div>
            <div class="discointed-total">
            <p>${totalPriceDiscounted+totalPriceNoDiscounted}تومان</p>
            <p> :بعد از تخفیف</p>
            </div>
            <div class="profitAmount">
            <p>${totanProfit}تومان</p>
            <p>:سود شما از این خرید</p>
            </div>
            </div>
        </div>
        `
    }else return
}
totalAmount()

