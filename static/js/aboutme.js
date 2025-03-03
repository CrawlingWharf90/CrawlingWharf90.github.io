var blurAmount;
var windowHeight;
var virtualScrollY = 0;
const TAAG = document.getElementById("TAAG");
const edu = document.getElementsByClassName("education")[0];
const freeTimeTitle = document.getElementById("free-time-title");
const secondSection = document.getElementById("second-section");
const sectionTitle = document.getElementById("section-title");
const freeTimeDiv = document.getElementById("free-time-div");
const imgContainer = document.getElementById("lyrics-curator-img");
const textContainer = document.getElementById("lyrics-curator-div");
const path = "..\\AboutMe\\";
const freeTimeText = "WHAT ABOUT MY FREE TIME?";
var scrollStep = 7; 
const saveTAAGPosition = TAAG.getBoundingClientRect();
const saveEduPosition = edu.getBoundingClientRect();
var locked = false;
var scrollCounter = 0; 
var lastDirection = ""; 
var ticking = false;
var freeTimeEffect = false; 
var effectStarted = false;

const elementsToCenter = [edu, TAAG, secondSection]

document.addEventListener("DOMContentLoaded", function () {
  lastScroll = window.scrollY;
  window.scroll(0, 0);
  freeTimeTitle.textContent = freeTimeText;
  windowHeight = window.innerHeight;
  blurAmount = 0; //! this could pontentially be a local variable since at the begginning it's always 0, but we'll keep it here just in case
  centerElement(elementsToCenter);
  let startlink = document.getElementsByClassName("tablinks")[0];
  startlink.click();
});

imgContainer.addEventListener("mouseenter", () => {
  textContainer.style.left = -25 + "%"; // Moves text to the left
});

imgContainer.addEventListener("mouseleave", () => {
  textContainer.style.left = 0 + "%"; // Moves text back to the right
});

function openEdu(evt, schoolName) {
  let i, tabcontent, tablinks;
  evt.preventDefault();
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(schoolName).style.display = "block";
  evt.currentTarget.className += " active";
}

window.addEventListener('wheel', (e) => 
{ 
  if (e.deltaMode === 1) {
    //? Line mode: Likely a mouse wheel
    scrollStep = 1; 
  } else if (e.deltaMode === 0) {
    //? Pixel mode: Likely a trackpad
    scrollStep = 7; 
  }

  let lastScroll = virtualScrollY;
  if(freeTimeEffect)
  {
    virtualScrollY += e.deltaY;

    const currentScroll = virtualScrollY; 

    if (currentScroll > lastScroll) {
      if (lastDirection == "up") scrollCounter = 0;
      lastDirection = "down";
      scrollCounter++;
      if (scrollCounter >= scrollStep) {
        if (sectionTitle.textContent == "") sectionTitle.textContent = path;
        const removedLetters = freeTimeText.slice(-(sectionTitle.textContent.length - path.length + 1));
        freeTimeTitle.textContent = freeTimeTitle.textContent.slice(0, -1);
        sectionTitle.textContent = path + removedLetters;
        scrollCounter = 0;
      }
    }

    if (currentScroll < lastScroll) {
      if (lastDirection == "down") scrollCounter = 0;
      lastDirection = "up";
      scrollCounter++;
      if ((scrollCounter >= scrollStep) && (freeTimeDiv.getBoundingClientRect().top > windowHeight + 10)) {
        const addedLetters = freeTimeText.slice(freeTimeTitle.textContent.length, freeTimeTitle.textContent.length + 1);
        sectionTitle.textContent = sectionTitle.textContent.slice(0, path.length) + sectionTitle.textContent.slice(path.length + 1);
        freeTimeTitle.textContent += addedLetters;
        if (sectionTitle.textContent.length == path.length) sectionTitle.textContent = "";
        scrollCounter = 0;
      }
    }
  }

  if (freeTimeTitle.textContent != freeTimeText) {
    edu.style.position = "fixed"; 
    edu.style.top = -1000 + "px";
    TAAG.style.top = -1000 + "px";
    effectStarted = true;
  } else { 
    edu.style.position = "relative";
    edu.style.top = 'auto'; 
    TAAG.style.top = saveTAAGPosition.top + "px";
  }

  //!THIS WAS TO FIX A BUG THAT MIGHT HAPPEN IF THE USER SWITCHES BETWEEN MOUSE AND TRACKPAD WHILE SCROLLING, HOWEVER THE BUG IS VERY MINOR AND THE END RESULT IS MUCH WORSE IF THE SCRIPT HANDLES IT
  // if(effectStarted && edu.style.position == "relative" && window.scrollY < window.innerHeight)
  //   {
  //     if(freeTimeTitle.classList.contains("free-time-fixed")) freeTimeTitle.classList = "free-time-static";
  //   }
}); 

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll(lastScrollY);
      ticking = false;
    });

    ticking = true;
  }
});

function handleScroll(scrollY) {
  if (scrollY < 1500) {
    const blurAmount = scrollY / 25;
    TAAG.style.filter = `blur(${blurAmount}px)`;
  }

  if (freeTimeTitle.textContent != "") {
    freeTimeDiv.style.position = "absolute";
    freeTimeDiv.style.opacity= "0"; 
    freeTimeDiv.style.top = `${scrollY + 1000}px`;
  }
  else
  {
    freeTimeDiv.style.opacity= "1";
  }

  const freeTimeMidPoint = freeTimeTitle.getBoundingClientRect().top + (freeTimeTitle.getBoundingClientRect().height / 2);

  if (freeTimeTitle.classList.contains("free-time-static") && locked && freeTimeMidPoint > (windowHeight / 2 + 1)) locked = false;

  if (freeTimeTitle.classList.contains("free-time-fixed") && (freeTimeTitle.getBoundingClientRect().top - edu.getBoundingClientRect().bottom <= 2.5)) {
    freeTimeEffect = false; 
    freeTimeTitle.classList = "free-time-static";
  }

  if (freeTimeMidPoint <= windowHeight / 2 && !locked) {
    freeTimeTitle.classList = "free-time-fixed";
    freeTimeTitle.style.top = `${windowHeight / 2 - (freeTimeTitle.getBoundingClientRect().height / 2)}px`;
    freeTimeTitle.style.left = `${secondSection.getBoundingClientRect().left + 25}px`;
    locked = true;
  }

  if (edu.getBoundingClientRect().bottom < -15) {
    if(!freeTimeEffect) freeTimeEffect = true;
  }
  lastScroll = scrollY;
}

window.onresize = (e) => { //!TODO: education tab postion has to be changed on window resizing
  console.log("Window Resized");
  screenCenter = window.innerWidth / 2;
  windowHeight = window.innerHeight;
  centerElement(elementsToCenter);
  if (freeTimeTitle.classList.contains("free-time-fixed")) freeTimeTitle.style.top = `${windowHeight / 2 - (freeTimeTitle.getBoundingClientRect().height / 2)}px`; //? Change text position so that it's always centered based on window height
}

function centerElement(elements) {
  screenCenter = window.innerWidth / 2;
  elements.forEach(elem => {
    elem.style.marginLeft = `${screenCenter / 4}px`;
    elem.style.marginRight = `${screenCenter / 4}px`;
  });
}