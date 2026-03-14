/* Author: Xavier Miles
  Date: 2/11/26
  ITD 210 Capstone project
  script.js */

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