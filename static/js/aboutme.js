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
const mailButton = document.getElementById("mail-btn"); 
const path = "..\\AboutMe\\";
const freeTimeText = "WHAT ABOUT MY FREE TIME?";
var scrollStep = 7; 
const saveTAAGPosition = TAAG.getBoundingClientRect();
const saveEduPosition = edu.getBoundingClientRect();
const baseMargin = 50;
const heightFactor = 0.5;
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
  //setResponsiveMargin(); 
  let additionalMargin = window.innerHeight * heightFactor;
  edu.style.marginTop = `${TAAG.getBoundingClientRect().height + baseMargin - additionalMargin}px`;
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

// window.addEventListener('wheel', (e) => 
// { 
//   if (e.deltaMode === 1) {
//     //? Line mode: Likely a mouse wheel
//     scrollStep = 1; 
//   } else if (e.deltaMode === 0) {
//     //? Pixel mode: Likely a trackpad
//     scrollStep = 7; 
//   }

//   let lastScroll = virtualScrollY;
//   if(freeTimeEffect)
//   {
//     virtualScrollY += e.deltaY;

//     const currentScroll = virtualScrollY; 

//     if (currentScroll > lastScroll) {
//       if (lastDirection == "up") scrollCounter = 0;
//       lastDirection = "down";
//       scrollCounter++;
//       if (scrollCounter >= scrollStep) {
//         if (sectionTitle.textContent == "") sectionTitle.textContent = path;
//         const removedLetters = freeTimeText.slice(-(sectionTitle.textContent.length - path.length + 1));
//         freeTimeTitle.textContent = freeTimeTitle.textContent.slice(0, -1);
//         sectionTitle.textContent = path + removedLetters;
//         scrollCounter = 0;
//       }
//     }

//     if (currentScroll < lastScroll) {
//       if (lastDirection == "down") scrollCounter = 0;
//       lastDirection = "up";
//       scrollCounter++;
//       if ((scrollCounter >= scrollStep) && (freeTimeDiv.getBoundingClientRect().top > windowHeight + 10)) {
//         const addedLetters = freeTimeText.slice(freeTimeTitle.textContent.length, freeTimeTitle.textContent.length + 1);
//         sectionTitle.textContent = sectionTitle.textContent.slice(0, path.length) + sectionTitle.textContent.slice(path.length + 1);
//         freeTimeTitle.textContent += addedLetters;
//         if (sectionTitle.textContent.length == path.length) sectionTitle.textContent = "";
//         scrollCounter = 0;
//       }
//     }
//   }

//   if (freeTimeTitle.textContent != freeTimeText) {
//     edu.style.position = "fixed"; 
//     edu.style.top = -1000 + "px";
//     TAAG.style.top = -1000 + "px";
//     effectStarted = true;
//   } else { 
//     edu.style.position = "relative";
//     edu.style.top = 'auto'; 
//     TAAG.style.top = saveTAAGPosition.top + "px";
//   }

//   //!THIS WAS TO FIX A BUG THAT MIGHT HAPPEN IF THE USER SWITCHES BETWEEN MOUSE AND TRACKPAD WHILE SCROLLING, HOWEVER THE BUG IS VERY MINOR AND THE END RESULT IS MUCH WORSE IF THE SCRIPT HANDLES IT
//   // if(effectStarted && edu.style.position == "relative" && window.scrollY < window.innerHeight)
//   //   {
//   //     if(freeTimeTitle.classList.contains("free-time-fixed")) freeTimeTitle.classList = "free-time-static";
//   //   }
// }); 

//! window.addEventListener('wheel', (e) => {
//!   if (document.getElementById("mail-modal"))
//!   {
//!     e.preventDefault();
//!   }
//! }, { passive: false }); 

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

  // if (freeTimeTitle.textContent != "") {
  //   freeTimeDiv.style.position = "absolute";
  //   freeTimeDiv.style.opacity= "0"; 
  //   freeTimeDiv.style.top = `${scrollY + 1000}px`;
  // }
  // else
  // {
  //   freeTimeDiv.style.opacity= "1";
  // }

  // const freeTimeMidPoint = freeTimeTitle.getBoundingClientRect().top + (freeTimeTitle.getBoundingClientRect().height / 2);

  // if (freeTimeTitle.classList.contains("free-time-static") && locked && freeTimeMidPoint > (windowHeight / 2 + 1)) locked = false;

  // if (freeTimeTitle.classList.contains("free-time-fixed") && (freeTimeTitle.getBoundingClientRect().top - edu.getBoundingClientRect().bottom <= 2.5)) {
  //   freeTimeEffect = false; 
  //   freeTimeTitle.classList = "free-time-static";
  // }

  // if (freeTimeMidPoint <= windowHeight / 2 && !locked) {
  //   freeTimeTitle.classList = "free-time-fixed";
  //   freeTimeTitle.style.top = `${windowHeight / 2 - (freeTimeTitle.getBoundingClientRect().height / 2)}px`;
  //   freeTimeTitle.style.left = `${secondSection.getBoundingClientRect().left + 25}px`;
  //   locked = true;
  // }

  // if (edu.getBoundingClientRect().bottom < -15) {
  //   if(!freeTimeEffect) freeTimeEffect = true;
  // }
  // lastScroll = scrollY;
}

window.onresize = (e) => { //!TODO: education tab postion has to be changed on window resizing
  console.log("Window Resized");
  screenCenter = window.innerWidth / 2;
  windowHeight = window.innerHeight;
  let additionalMargin = window.innerHeight * heightFactor;
  edu.style.marginTop = `${TAAG.getBoundingClientRect().height + baseMargin - additionalMargin}px`;
  centerElement(elementsToCenter);
  console.log(screenCenter);
  if (freeTimeTitle.classList.contains("free-time-fixed")) freeTimeTitle.style.top = `${windowHeight / 2 - (freeTimeTitle.getBoundingClientRect().height / 2)}px`; //? Change text position so that it's always centered based on window height
}

function centerElement(elements) {
  const screenCenter = window.innerWidth / 2;
  //console.log(edu.style.width);
  //setResponsiveMargin();
  elements.forEach(elem => {
    console.log(elem);

    const elemWidth = elem.offsetWidth;

    if (getComputedStyle(elem).position === "absolute" || getComputedStyle(elem).position === "fixed") 
    {
      elem.style.left = "50%";
      elem.style.transform = "translateX(-50%)";
    } else {
      elem.style.marginLeft += `${screenCenter - elemWidth/2}px`;
      elem.style.marginRight += `${screenCenter - elemWidth/2}px`;
    }
  });
}

// function setResponsiveMargin() {
//   if (!edu) return;

//   const referenceHeight = 1026; // This is the height of the 17" display where 25% worked best.
//   const referenceMargin = referenceHeight * 0.25; // 25% of 1026
//   let currentHeight = window.innerHeight;

//   let calculatedMargin = (referenceMargin / referenceHeight) * currentHeight;

//   console.log(`Setting margin-top: ${calculatedMargin}px for edu`);
  
//   edu.style.marginTop = `${calculatedMargin}px`;
//}

mailButton.addEventListener('click', () => {
  if(document.getElementById("mail-modal")) return;
  let mailModalBackground = document.createElement('div');
  mailModalBackground.id = "mail-modal-background";
  mailModalBackground.addEventListener("click", () => {
    closeMailModal();
  });

  let mailModal = document.createElement('div'); 
  mailModal.id = "mail-modal";
  mailModal.innerHTML = `
    <div id="your-email">
      <span><h5>Your Email:</h5><input type="email" id="email-input" placeholder="Enter your email here..."></span>
    </div>
  `;
  mailModal.style.transform = "translate(-50%, 200%)";
  document.body.appendChild(mailModalBackground);
  document.body.appendChild(mailModal);
  
  setTimeout(() => {
    mailModal.style.transform = "translate(-50%, 50%)";
    mailModalBackground.style.opacity = "0.8";
  }, 100);
});

document.addEventListener("keydown", (e) => {
  let mailModal = document.getElementById("mail-modal");
  if(e.key === "Enter" && mailModal)
  {
    let email = document.getElementById("email-input").value;
    if(emailRules(email))
    {
      if(mailModal.children.length > 1) return;
      let typedEmail = email;
      mailModal.innerHTML += `
        <div id="subject">
          <span><h5>Subject:</h5><input type="text" id="subject-input" placeholder="Email subject here..."></span>
        </div>
        <div id="message">
          <span><h4>Message:</h4></span><textarea id="message-input" placeholder="Type your email here..."></textarea>
        </div>
        <div id="send-email">
          <button id="send-email-btn">Send</button>
        </div>
        `;

        for(let i=1; i<mailModal.children.length; i++)
        {
          mailModal.children[i].style.opacity = "0"; 
        }
        document.getElementById("email-input").value = typedEmail;
        setTimeout(() => {
          for(let i=1; i<mailModal.children.length; i++)
          {
            mailModal.children[i].style.opacity = "1"; 
          }
        }, 10);



        document.getElementById("send-email-btn").addEventListener("click", () => {
          let message = document.getElementById("message-input").value;
          let possibleMailChange = document.getElementById("email-input").value;
          if(message.length == 0)
          {
            alert("Message can't be empty!");
            return;
          }
          if(!emailRules(possibleMailChange))
          {
            alert("It seems you've changed the previously provided email with an invaild one. Please try again.\n\n an email address looks like: something@example.com"); 
            return; 
          }
          //?if no errors, send email
          sendEmail(); 
          closeMailModal();
        }), {once: true};
    }
    else
    {
      alert("What you've provided doesn't look like an email address. Please try again.\n\n an email address looks like: something@example.com");
    }
  }
});

function emailRules(mail)
{
  /* 
    * Email must contain "@" and "."
    * @ must be followed by a domanin name (so there must me at least one character between @ and .)
    * after "." there must be a domain name (so there must be at least one character after .)
  */
  return mail.includes("@") && mail.includes(".") && (mail.indexOf(".") > mail.indexOf("@")+1) && (mail.lastIndexOf(".") < mail.length-1);
}

function closeMailModal()
{
  let mailModal = document.getElementById("mail-modal");
  let mailModalBackground = document.getElementById("mail-modal-background");
  if(!mailModal || !mailModalBackground) return;
  mailModal.style.transform = "translate(-50%, 200%)";
  mailModalBackground.style.opacity = "0";
  setTimeout(() => {
    mailModal.remove();
    mailModalBackground.remove();
  }, 800);
}

async function sendEmail() {
  if (!document.getElementById("mail-modal") || !document.getElementById("message-input") || !document.getElementById("subject-input")) return;
    
    const email = document.getElementById("email-input").value;
    const subject = document.getElementById("subject-input").value;
    const content = document.getElementById("message-input").value;

    // Create a form dynamically
    let form = document.createElement("form");
    form.action = "https://formsubmit.co/f31de7e3ccc876e7fc65dcb9c1b52625";
    form.method = "POST";
    form.style.display = "none";

    //! Add required hidden field to prevent spam protection issues
    let hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "_captcha";
    hiddenField.value = "false";
    form.appendChild(hiddenField);

    let emailField = document.createElement("input");
    emailField.type = "hidden";
    emailField.name = "email";
    emailField.value = email;
    form.appendChild(emailField);

    let subjectField = document.createElement("input");
    subjectField.type = "hidden";
    subjectField.name = "subject";
    subjectField.value = subject;
    form.appendChild(subjectField);

    let messageField = document.createElement("input");
    messageField.type = "hidden";
    messageField.name = "message";
    messageField.value = content;
    form.appendChild(messageField);

    document.body.appendChild(form);
    form.submit();

    alert("Email sent successfully!");
}