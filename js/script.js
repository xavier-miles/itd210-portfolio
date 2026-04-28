/* Author: Xavier Miles
  Date: 2/11/26
  ITD 210 Capstone project
  script.js
*/
// TO DO: Fix the Fetch grabbing more than 1 set of facts on spam clicking the Get cat facts button
// grabbers for elements 
const toggle = document.getElementById("mobileToggle");
const mobileNav = document.getElementById("mobileNav");
const header = document.querySelector("header")

// listening to the burger [menu button] to open/close it
toggle.addEventListener("click", () => {
  mobileNav.classList.toggle("-translate-y-full");
  mobileNav.classList.toggle("pointer-events-none");
  mobileNav.classList.toggle("opacity-0");
  toggle.classList.toggle("bg-secondary");
  const isOpen = mobileNav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  if (!mobileNav.classList.contains("open")) {
    toggle.style.background = "#c0cad8";
  } else toggle.style.background = "#F7F986";
});

//checks if you click NOT on the mobile nav, NOT on the header, and then closes the mobile nav if so 
document.addEventListener("click", function(event) {
  if (!mobileNav.contains(event.target)
  && !header.contains(event.target)
  && mobileNav.classList.contains("open")) {
    mobileNav.classList.toggle("-translate-y-full");
    mobileNav.classList.toggle("pointer-events-none");
    mobileNav.classList.toggle("opacity-0");
    toggle.classList.toggle("bg-secondary");
    toggle.style.background = "#c0cad8";
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
  }
});

/* Cat fact button functionality from https://catfact.ninja/fact
Documentation: https://documenter.getpostman.com/view/1946054/S11HvKSz */
const catFactBtn = document.getElementById("catFactBtn");
const factLoading = document.getElementById("factLoading");
// const catFactMsg = document.getElementById("catFactMsg");
const catFact = document.getElementById("catFact");
const factsSelect = document.getElementById("factsSelect");

if (catFactBtn) {
  catFactBtn.addEventListener("click", async function() {
    factLoading.textContent = "Facts loading!";
    factLoading.style.display = "block";

    catFact.innerHTML = "";
    
    try {
      //get a response from the API to see how many pages there are, and store that
      const pageResponse = await fetch(`https://catfact.ninja/facts?limit=3`);
      const pageData = await pageResponse.json();
      const LAST_PAGE = pageData.last_page;
      const randomPage = Math.floor(Math.random() * LAST_PAGE) + 1;
      
      //get the actual data from the API
      const numFacts = factsSelect.value;
      const response = await fetch(`https://catfact.ninja/facts?limit=${numFacts}&page=${randomPage}`);
      const data = await response.json();

      //error handling
      if (!response.ok) {
        if (response.status == 404) {
          catFact.textContent = "Error: Cat fact not found (404)";
        } else if (response.status == 429) {
          catFact.textContent = "Error: Rate limit exceeded, please wait a bit and try again (429)";
        } else if (response.status == 500) {
          catFact.textContent = "Error: Something went wrong with the server, try again later (500)";
        } else {
          catFact.textContent = "Error: Something went wrong.";
        }
        factLoading.style.display = "none";
        catFact.classList.add("cat-fact-error");
        return;
      }

      catFact.classList.remove("cat-fact-error");

      //display the data in the cat fact <p>
      data.data.forEach(factItem => {
        let catFactBox = document.createElement("p");
        catFactBox.textContent += factItem.fact;
        catFact.appendChild(catFactBox);
      })
      
      factLoading.style.display = "none";

      catFactBtn.textContent = "Get new facts!";
    } catch (error) {
      //display the error message with red-on-white styling
      factLoading.style.display = "none";
      catFact.classList.add("cat-fact-error");
      catFact.textContent = `There was an error! Debug: ${error}`;
      console.error("Error loading cat fact! " + error)
    }
  });
}

//contact form functionality. Basically, when the form is submitted, the "submit" button's appearance will change to have a loading circle and say "Sending..." instead, and will be disabled, and then after a brief delay the *actual* submit will occur
const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const contactSubmitText = document.getElementById("contactSubmitText");
const contactSpinner = document.getElementById("contactSpinner");
let submitInProgress = false;

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    //don't do a resubmit if it's already happening
    if (submitInProgress) return;

    event.preventDefault();

    submitInProgress = true;

    contactSubmitText.textContent = "Sending...";
    contactSpinner.style.display = "inline-block";
    contactSubmit.disabled = true;

    //*actually* submit the form after 700ms
    setTimeout(() => {
      contactForm.submit();
    }, 700);
  })
}

// Receive data from URL passed from Services page booking click

/* I used AI to figure out how to target the clicked service and send that to a query param.
I knew I had to pass data from one page to another and knew how to select the checkbox on the destination page (contact.html) but I didn't know about data-service or how to use it, or about URLSearchParams specifically */
const params = new URLSearchParams(window.location.search);
const selectedService = params.get("service");

if (selectedService) {
  const checkbox = document.querySelector(`input[name="serviceType[]"][value="${selectedService}"]`);

  if (checkbox) {
    checkbox.checked = true;
  }
}

//Services page functionality
const bgMute = document.getElementById("bgMute");
const servicesBg = document.getElementById("servicesBg");
const servicesIntro = document.getElementById("servicesIntro");
let bgIsMuted = true;

// Mute the background SFX when the video is played 
if (servicesIntro) {
  servicesIntro.addEventListener("play", () => {
    servicesBg.muted = true;
    bgIsMuted = true;
    bgMute.textContent = "🔇";
  });
}

// mute / unmute bg button
if (bgMute) {
  bgMute.addEventListener("click", () => {
    if (!bgIsMuted) {
      bgMute.textContent = "🔇";
    } else {
      bgMute.textContent = "🔊";
    }
    servicesBg.muted = !bgIsMuted;
    bgIsMuted = !bgIsMuted;
  });
}