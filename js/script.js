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
  const isOpen = mobileNav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

//checks if you click NOT on the mobile nav, NOT on the header, and then closes the mobile nav if so 
document.addEventListener("click", function(event) {
  if (!mobileNav.contains(event.target)
  && !header.contains(event.target)
  && mobileNav.classList.contains("open")) {
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
  }
});

/* Cat fact button functionality from https://catfact.ninja/fact
Documentation: https://documenter.getpostman.com/view/1946054/S11HvKSz */
const catFactBtn = document.getElementById("catFactBtn");
const factLoading = document.getElementById("factLoading");
const catFactMsg = document.getElementById("catFactMsg");
const catFact = document.getElementById("catFact");
const factsSelect = document.getElementById("factsSelect");

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