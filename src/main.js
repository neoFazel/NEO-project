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
console.log(ourPerksContent);