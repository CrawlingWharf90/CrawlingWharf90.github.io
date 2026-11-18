import { CrawlingTools } from "./tools.js";
import TypeWords from "https://cdn.jsdelivr.net/npm/crawling-typer@1.1.1/typer.js";

let activeTyper = null;
const returnBtn = document.getElementById("return-btn");

const yearSpan = document.querySelector(".dynamic-year");

document.addEventListener("DOMContentLoaded", function () {
  let startlink = document.querySelector(".terminal-tabs .lux-tab");
  if (startlink) startlink.click();

  const returnBtn = document.getElementById("return-btn");
  if (returnBtn) {
    returnBtn.addEventListener("click", (e) => {
      e.preventDefault();

      //! Remove the entry glitch so they don't conflict
      document.body.classList.remove("lux-glitch-in");

      //? Trigger the system failure effect
      document.body.classList.add("lux-glitch-out");

      setTimeout(() => {
        window.location.href = "./home.html";
      }, 700);
    });
  }

  setTimeout(() => {
    document.body.classList.remove("lux-glitch-in");
  }, 550);

  if (CrawlingTools) CrawlingTools.openImage(".lux-img", true);

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

function openEdu(evt, schoolName) {
  //? 1. Tab Switching Logic
  let tabcontents = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
    tabcontents[i].classList.remove("active-tab");
  }

  let tablinks = document.getElementsByClassName("lux-tab");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  let targetTab = document.getElementById(schoolName);
  targetTab.style.display = "block";
  targetTab.classList.add("active-tab");
  evt.currentTarget.classList.add("active");

  //? 2. Prepare the paragraph for the typing effect
  let paragraph = targetTab.querySelector("p");
  let originalText = paragraph.getAttribute("data-text");

  if (!originalText) {
    originalText = paragraph.innerText;
    paragraph.setAttribute("data-text", originalText);
  }
  paragraph.innerHTML = "";

  //? 3. Crawling-Typer Implementation
  if (activeTyper) activeTyper.pause();

  activeTyper = TypeWords(
    [{ text: originalText, color: "#FFFFFF" }],
    paragraph,
    10,
    10,
    10,
    1,
    "play",
    { name: "forwards", index: 0 },
  );

  activeTyper.cursor(true, 500, "_");
}

window.openEdu = openEdu;

//* --- MAIL MODAL LOGIC ---

const mailButton = document.getElementById("mail-btn");

mailButton.addEventListener("click", () => {
  if (document.getElementById("mail-modal")) return;
  let mailModalBackground = document.createElement("div");
  mailModalBackground.id = "mail-modal-background";
  mailModalBackground.addEventListener("click", () => {
    closeMailModal();
  });

  let mailModal = document.createElement("div");
  mailModal.id = "mail-modal";
  mailModal.innerHTML = `
    <div id="close-mail-modal" style="position: absolute; top: 25px; right: 25px; cursor: pointer; color: var(--text-dim); transition: all 0.3s ease;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
    </div>
    <div id="your-email" style="margin-top: 15px;">
      <span><h5>USER_EMAIL</h5><input type="email" id="email-input" placeholder="Enter your email address..."></span>
    </div>
  `;

  mailModal.style.top = "50%";
  mailModal.style.transform = "translate(-50%, 100vh)";

  document.body.appendChild(mailModalBackground);
  document.body.appendChild(mailModal);

  document
    .getElementById("close-mail-modal")
    .addEventListener("click", closeMailModal);

  setTimeout(() => {
    mailModal.style.transform = "translate(-50%, -50%)";
    mailModalBackground.style.opacity = "0.9";
  }, 100);
});

document.addEventListener("keydown", (e) => {
  let mailModal = document.getElementById("mail-modal");
  let alertModal = document.getElementById("alert-modal");

  if (e.key === "Escape" && mailModal && !alertModal) {
    closeMailModal();
    return;
  }

  if (alertModal && !alertModal.style.top) return;

  //? Alt + Enter sends the email (registered once, here, instead of every time the modal expands)
  if (e.key === "Enter" && e.altKey) {
    let sendBtn = document.getElementById("send-email-btn");
    if (sendBtn) sendBtn.click();
    return;
  }

  if (e.key === "Enter" && mailModal) {
    let email = document.getElementById("email-input").value;
    let isExpanded = mailModal.querySelector("#expanded-content");

    if (emailRules(email)) {
      if (isExpanded) return;

      mailModal.classList.add("expanded");
      document.getElementById("email-input").style.color = "var(--text-dim)";

      mailModal.insertAdjacentHTML(
        "beforeend",
        `
        <div id="expanded-content" style="opacity: 0; transition: opacity 0.6s ease 0.4s;">
          <div id="subject" class="mt-4">
            <span><h5 id="subject-title"></h5><input type="text" id="subject-input" placeholder="Email subject..."></span>
          </div>
          <div id="message" class="mt-4">
            <span><h4 id="message-title"></h4></span><textarea id="message-input" placeholder="Type message data..."></textarea>
          </div>
          <div id="send-email" class="mt-4">
            <button class="lux-btn" id="send-email-btn">TRANSMIT</button>
            <div id="alt-send-email" class="text-muted mt-2" style="font-size: 0.8rem;">or press <b>Alt + Enter</b></div>
          </div>
        </div>
      `,
      );

      setTimeout(() => {
        document.getElementById("expanded-content").style.opacity = "1";

        const subjTyper = TypeWords(
          [{ text: "SUBJECT", color: "#FFFFFF" }],
          document.getElementById("subject-title"),
          25,
          25,
          0,
          1,
          "play",
          { name: "forwards", index: 0 },
        );
        subjTyper.cursor(true, 500, "_");

        const msgTyper = TypeWords(
          [{ text: "MESSAGE", color: "#FFFFFF" }],
          document.getElementById("message-title"),
          25,
          25,
          0,
          1,
          "play",
          { name: "forwards", index: 0 },
        );
        msgTyper.cursor(true, 500, "_");
      }, 50);

      document
        .getElementById("send-email-btn")
        .addEventListener("click", () => {
          let message = document.getElementById("message-input").value;
          let finalEmailCheck = document.getElementById("email-input").value;

          if (message.length === 0) {
            if (CrawlingTools)
              CrawlingTools.alertModal(
                "Message is empty.<br><b>Email must contain a message.</b>",
              );
            return;
          }
          if (!emailRules(finalEmailCheck)) {
            if (CrawlingTools)
              CrawlingTools.alertModal(
                "The email address was changed to an invalid format.<br><b>Please correct it.</b>",
              );
            return;
          }

          sendEmail();
          closeMailModal();
        });
    } else {
      if (!isExpanded) {
        if (CrawlingTools)
          CrawlingTools.alertModal(
            "Invalid address format.<br><b>Please enter a valid email.</b>",
          );
      }
    }
  }
});

function emailRules(mail) {
  const atIndex = mail.indexOf("@");
  if (atIndex < 1) return false;
  const domain = mail.slice(atIndex + 1);
  if (!domain || domain.startsWith(".") || domain.endsWith(".")) return false;
  if ((domain.match(/\./g) || []).length < 1) return false;
  const parts = domain.split(".");
  return parts.every((part) => part.length > 0);
}

function closeMailModal() {
  let mailModal = document.getElementById("mail-modal");
  let mailModalBackground = document.getElementById("mail-modal-background");
  if (!mailModal || !mailModalBackground) return;

  mailModal.style.transform = "translate(-50%, 100vh)";
  mailModalBackground.style.opacity = "0";

  setTimeout(() => {
    mailModal.remove();
    mailModalBackground.remove();
  }, 800);
}

let isSending = false;

async function sendEmail() {
  if (isSending) return;
  const emailEl = document.getElementById("email-input");
  const subjectEl = document.getElementById("subject-input");
  const messageEl = document.getElementById("message-input");
  if (!emailEl || !subjectEl || !messageEl) return;

  //? Read everything now, because the modal is removed right after this is called
  const payload = {
    email: emailEl.value,
    _subject: subjectEl.value || "New message from portfolio",
    message: messageEl.value,
    _captcha: "false",
    _template: "table",
  };

  isSending = true;
  if (CrawlingTools) CrawlingTools.alertModal("Sending data...");

  try {
    const res = await fetch(
      "https://formsubmit.co/ajax/f31de7e3ccc876e7fc65dcb9c1b52625",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    const data = await res.json().catch(() => ({}));
    console.log("FormSubmit response:", res.status, data);

    //! FormSubmit returns success as the string "true"
    if (res.ok && String(data.success) === "true") {
      if (CrawlingTools)
        CrawlingTools.alertModal(
          "Message sent. Thanks for reaching out!<br><b>I'll get back to you as soon as I can.</b>",
        );
    } else {
      throw new Error(data.message || "HTTP " + res.status);
    }
  } catch (err) {
    console.error("Email failed:", err);
    if (CrawlingTools)
      CrawlingTools.alertModal(
        "Transmission failed.<br><b>Please try again later.</b>",
      );
  } finally {
    isSending = false;
  }
}
