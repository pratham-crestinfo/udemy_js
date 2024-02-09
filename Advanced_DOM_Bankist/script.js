'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  "We use cookies for Improved Functionality and Analytics!!! <button class='btn btn--close-cookie'>Got it </button>";
const header = document.querySelector('.header');
header.prepend(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
message.style.backgroundColor = '#37383d';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// const sec=document.querySelectorAll(".section");
// console.log(sec);
// const sec2 = document.getElementsByClassName("section");
// console.log(sec2);

const sscr = document.querySelector('.btn--scroll-to');
const sec1 = document.querySelector('#section--1');
const s1coords = sec1.getBoundingClientRect();
// console.log(s1coords);
sscr.addEventListener('click', function (e) {
  // scrollTo({left:s1coords.left,top:s1coords.top,behaviour:"smooth"});
  sec1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behaviour: 'smooth' });
  }
});

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    document.querySelectorAll('.operations__tab').forEach(function (el) {
      el.classList.remove('operations__tab--active');
    });
    const clicked = e.target.closest('.operations__tab');
    clicked.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--1`)
      .classList.remove('operations__content--active');
    document
      .querySelector(`.operations__content--2`)
      .classList.remove('operations__content--active');
    document
      .querySelector(`.operations__content--3 `)
      .classList.remove('operations__content--active');
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = document.querySelectorAll('.nav__link');
    const logo = document.querySelector('#logo');
    siblings.forEach(function (el) {
      if (el != link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});
nav.addEventListener('mouseout', function (e) {
  const link = e.target;
  const siblings = document.querySelectorAll('.nav__link');
  const logo = document.querySelector('#logo');
  siblings.forEach(function (el) {
    el.style.opacity = 1;
  });
  logo.style.opacity = 1;
});

// window.addEventListener("scroll",function(e)
// {
//   if(this.window.scrollY>s1coords.top)
//   nav.classList.add('sticky')
//   else
//   nav.classList.remove("sticky");
// })

const observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting == false) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
  }
);
observer.observe(document.querySelector('.header'));

//revealing sections


document.querySelectorAll('.section').forEach(function (element) {
  element.classList.add('section--hidden');
});
const secobs = new IntersectionObserver(
  function (entries) {
    if(entries[0].isIntersecting)
    {
      entries[0].target.classList.remove('section--hidden')
      observer.unobserve(entries[0].target)
    }
  },
  {
    root: null,
    threshold: 0.2,
  }
);
document.querySelectorAll('.section').forEach(function (element) {
  secobs.observe(element);
  // console.log(element); 
});


const imgobs=new IntersectionObserver(
  function(entries){
    if(entries[0].isIntersecting==true)
    {
      entries[0].target.src=entries[0].target.dataset.src;
      entries[0].target.addEventListener("load",function()
      {
        entries[0].target.classList.remove("lazy-img")
      })
    }
  },{
    root:null,
    threshold:0
  }
);
document.querySelectorAll("img[data-src]").forEach((element)=>imgobs.observe(element));


const dotContainer = document.querySelector(".dots");
const createdots=function(){
  console.log("pratham")
  document.querySelectorAll(".slide").forEach(function(_,i){
    dotContainer.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createdots();

const activedots=function(currslide)
{
  document.querySelectorAll(".dots__dot").forEach(dot=>dot.classList.remove("dots__dot--active"));
  document.querySelector(`.dots__dot[data-slide="${currslide}"]`).classList.add("dots__dot--active");
}
activedots(0);



document.querySelectorAll(".slide").forEach(function(s,i){
  s.style.transform=`translateX(${100 * i}%)`;
})
let curslide=0;
const btnLeft=document.querySelector(".slider__btn--left").addEventListener("click",()=>{
  curslide--;
  if(curslide==-1)
  curslide=2;
  activedots(curslide);
document.querySelectorAll(".slide").forEach(function(s,i){
    s.style.transform=`translateX(${100 * (i-curslide)}%)`;
  })
})
const btnRight=document.querySelector(".slider__btn--right").addEventListener("click",()=>{
  curslide++;
  if(curslide==3)
  curslide=0;
activedots(curslide);
  document.querySelectorAll(".slide").forEach(function(s,i){
    s.style.transform=`translateX(${100 * (i-curslide)}%)`;
  })
}
)
document.addEventListener("keydown",function(e)
{
  if(e.key==="ArrowLeft")
  {
    console.log("clicked");
    curslide--;
  if(curslide==-1)
  curslide=2;
document.querySelectorAll(".slide").forEach(function(s,i){
    s.style.transform=`translateX(${100 * (i-curslide)}%)`;
  })
  }
  if(e.key==="ArrowRight")
  {
    console.log("clicked")
    curslide++;
  if(curslide==3)
  curslide=0;
  document.querySelectorAll(".slide").forEach(function(s,i){
    s.style.transform=`translateX(${100 * (i-curslide)}%)`;
  })
  }
})

dotContainer.addEventListener("click",function(e)
{
  if(e.target.classList.contains("dots__dot"))
  {
    const {slide}=e.target.dataset;
    curslide=slide;
    document.querySelectorAll(".slide")
    .forEach(function(s,i){
    s.style.transform=`translateX(${100 * (i-slide)}%)`;
  })
  activedots(slide);
  }
})