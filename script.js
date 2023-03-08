import { gsap } from 'gsap';

// Variables
const scrollbar = document.querySelector(".scrollbar");
const content = document.querySelector(".dropdown-list");

// Function to update scrollbar position
function updateScrollbar() {
  const scrollTop = content.scrollTop;
  const scrollHeight = content.scrollHeight;
  const height = content.clientHeight;
  const scrollbarHeight = height / scrollHeight * height;
  const y = scrollTop / scrollHeight * (height - scrollbarHeight);
  gsap.to(scrollbar, {
    duration: 0.3,
    y: y,
    height: scrollbarHeight,
    ease: "power2.inOut",
  });
}

// Add scroll event to update scrollbar position
content.addEventListener("scroll", () => {
  updateScrollbar();
});

// Add click event to scrollbar to scroll content
scrollbar.addEventListener("mousedown", (e) => {
  e.preventDefault();
  const startY = e.clientY;
  const startScrollTop = content.scrollTop;
  const startOffsetTop = content.offsetTop;
  const scrollbarHeight = scrollbar.offsetHeight;
  const contentHeight = content.offsetHeight;
  const scrollHeight = content.scrollHeight;
  const maxScrollTop = scrollHeight - contentHeight;
  const scrollRatio = maxScrollTop / (contentHeight - scrollbarHeight);
  function handleMouseMove(e) {
    const deltaY = e.clientY - startY;
    const scrollTop = Math.min(maxScrollTop, Math.max(0, startScrollTop + deltaY / scrollRatio));
    content.scrollTop = scrollTop;
  }
  function handleMouseUp(e) {
    e.preventDefault();
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
});


// Footer

const toggleButton = document.querySelector('#toggle-button');

toggleButton.addEventListener('click', () => {
     gsap.to('#footer-content', { x: -300 });
});
let isOpen = false;

toggleButton.addEventListener('click', () => {
     if (!isOpen) {
          gsap.to('#footer-content', { x: -300 });
          isOpen = true;
     } else {
          gsap.to('#footer-content', { x: 0 });
          isOpen = false;
     }
});
