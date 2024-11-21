document.addEventListener("DOMContentLoaded", function () {


  // Header Sticky  ============ start =====>
  const header = document.querySelector("header");
  const handleScroll = () => {
    window.scrollY > 0 ? header.classList.add("sticky-header") : header.classList.remove("sticky-header");
  }
  window.addEventListener("scroll", handleScroll);

  // Show mobile left canvas ============ start =====>
  const toggleslideBtn = document.querySelector(".menu-toggle-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const headerUl = document.querySelector("header .leftmenu ul");

  toggleslideBtn.addEventListener("click", function () {
    const backDrop = createBackdrop();
    headerUl.classList.toggle("show-ul");
    toggleScrollLock();
  });

  cancelBtn.addEventListener("click", function () {
    const backDrop = document.querySelector('.back-drop');
    if (backDrop) backDrop.remove();
    headerUl.classList.remove("show-ul");
    toggleScrollLock();
  });

  function createBackdrop() {
    const backDrop = document.querySelector('.back-drop');
    if (!backDrop) {
      const newBackdrop = document.createElement('div');
      newBackdrop.classList.add('back-drop');
      header.appendChild(newBackdrop);
      newBackdrop.addEventListener("click", function () {
        headerUl.classList.remove("show-ul");
        newBackdrop.remove();
        toggleScrollLock();
      });
      return newBackdrop;
    }
    return backDrop;
  }

  function toggleScrollLock() {
    document.body.style.overflow = (document.body.style.overflow === 'hidden') ? 'auto' : 'hidden';
  }

  // mobile Dropdown  ============ start =====>
  const navDropdowns = document.querySelectorAll(".dropdown");
  navDropdowns.forEach((parentDropdown) => {
    parentDropdown.addEventListener("click", function (e) {
      this.classList.toggle("showMenu");
    });

    const subDropdowns = parentDropdown.querySelectorAll(".dropdown ul");
    subDropdowns.forEach((subDropdown) => {
      subDropdown.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents the click event from reaching the parent dropdown
      });
    });
  });

  // Add a click event listener to the document to close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    navDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("showMenu");
      }
    });
  });


  // offcanvas cart
  // Show mobile left canvas ============ start =====>
  const togglecartBtn = document.querySelector(".cart");
  const cancelcartBtn = document.querySelector(".cancel-canvas-btn");
  const cartoffcanvas = document.querySelector(".offcanvas");

  togglecartBtn.addEventListener("click", function () {
    cartoffcanvas.classList.toggle("show-canvas");
  });

 if(cancelcartBtn){
  cancelcartBtn.addEventListener("click", function () {
    cartoffcanvas.classList.remove("show-canvas");
  });
 }
  // Navigation ============ End =======> 


  // Tour Single page  tab2
  window.addEventListener("scroll", highlightActiveTab);

  function highlightActiveTab() {
    const scrollPos = window.scrollY + 1;

    document.querySelectorAll(".tour-tab a").forEach((link) => {
      const refElement = document.querySelector(link.getAttribute("href"));

      if (refElement.offsetTop <= scrollPos &&
        refElement.offsetTop + refElement.offsetHeight > scrollPos) {
        activateLink(link);
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Helper function to activate the current link
  function activateLink(activeLink) {
    document.querySelectorAll(".tour-tab a").forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }

  // Smooth scroll for internal links
  document.querySelectorAll(".tour-single-content a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor click behavior

      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });



  // Scroll to top   ============ start =====>
  const scrollTopBtn = document.getElementById("scroll_to_top");
  window.addEventListener('scroll', function () {
    scrollTopBtn.classList.toggle("show", window.scrollY > 20);

  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });



// accordion code  ============ start =====>
  const detailsElements = document.querySelectorAll("details");
const summaryElements = document.querySelectorAll("summary");

if (detailsElements.length > 0) {
  detailsElements[0].open = true;
}
summaryElements.forEach((summary, index) => {
  summary.addEventListener("click", () => {
    detailsElements.forEach((details, i) => {
      if (i !== index) {
        details.open = false;
      }
    });
  });
});

// route start
function toggleAccordion(expand, toggle) {
  const toggleBtns = document.querySelectorAll(toggle);
  const expandSecs = document.querySelectorAll(expand);

  toggleBtns.forEach((toggleBtn, index) => {
      const expandSec = expandSecs[index];
      
      console.log(expandSecs[index]);
      toggleBtn.addEventListener('click', function() {
          expandSec.classList.toggle('expanded');

          if (expandSec.classList.contains('expanded')) {
              toggleBtn.textContent = 'Show Less'; 
          } else {
              toggleBtn.textContent = 'Show More'; 
          }
      });
  });
}

toggleAccordion(".route-sec", "#all-route .toggleBtn");
toggleAccordion(".itinerary-list", "#Itinerary .toggleBtn");
// route end


// index page slider start
function createSlider(sliderId, prevBtnId, nextBtnId, numSlides = 4) {
  const slider = document.getElementById(sliderId);
  
  // Check if the slider and cards exist in the HTML
  const cards = slider ? slider.querySelectorAll(".slider .card") : [];
  if (cards.length === 0) {
    // console.warn(`No .card elements found inside #${sliderId}. Slider will not be initialized.`);
    return; // Exit if no cards are found
  }
  
  const totalCards = cards.length; // Total number of cards
  let perView = getPerView(numSlides); // Function to determine perView based on viewport size

  // Set minimum width for each card based on perView
  function setCardWidths() {
    const cardWidth = 
      slider.offsetWidth / perView - ((perView - 1) * 10) / perView; // Card width calculation
    // console.log(slider.offsetWidth, perView);
    cards.forEach((card) => {
      card.style.minWidth = cardWidth + "px";
    });
  }

  // Function to determine the number of visible cards based on viewport size
  function getPerView(numSlides) {
    if (window.innerWidth >= 1200) {
      return numSlides; // Large screens
    } else if (window.innerWidth >= 768) {
      return 2; // Medium screens
    } else {
      return 1; // Small screens
    }
  }

  // Utility function to slide cards
  function slideCards(direction) {
    const cardWidth = cards[0].offsetWidth; // Get the width of a single card

    // Check if perView is greater than total cards
    if (perView >= totalCards) {
      console.warn("Cannot slide, perView exceeds total number of cards.");
      return; // Exit if there are not enough cards to slide
    }

    // Slide only 1 card at a time
    if (direction === "prev") {
      // Move the last card to the front
      const lastCard = slider.querySelector(".card:last-child");
      slider.insertBefore(lastCard, slider.firstChild);
      slider.style.transform = `translateX(-${cardWidth}px)`;
    } else if (direction === "next") {
      // Move the first card to the back
      const firstCard = slider.querySelector(".card:first-child");
      slider.appendChild(firstCard);
      slider.style.transform = `translateX(0)`;
    }

    // Reset transition and trigger reflow
    slider.style.transition = "none";
    void slider.offsetHeight; // Trigger reflow

    // Enable transition and set final position
    setTimeout(() => {
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform =
        direction === "prev"
          ? `translateX(0)`
          : `translateX(-${cardWidth}px)`; // Move by 1 card width
    }, 20);
  }

  // Button events for manual slide
  document
    .getElementById(prevBtnId)
    .addEventListener("click", () => slideCards("prev"));
  document
    .getElementById(nextBtnId)
    .addEventListener("click", () => slideCards("next"));

  // Set initial card widths
  setCardWidths();

  // Update card widths on window resize
  window.addEventListener("resize", () => {
    perView = getPerView(); // Update perView based on new viewport size
    setCardWidths(); // Recalculate card widths
  });
}

// Initialize sliders
createSlider("slider1", "prevBtn1", "nextBtn1", 4); // Slide 1 card at a time
createSlider("slider2", "prevBtn2", "nextBtn2", 4); // Slide 1 card at a time
createSlider("slider3", "prevBtn3", "nextBtn3", 3); // Slide 1 card at a time
createSlider("slider4", "prevBtn4", "nextBtn4", 4); // Slide 1 card at a time

// index page slider end

// faq page start

  function openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
  }

  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].addEventListener("click", function (event) {
          openCity(event, event.currentTarget.getAttribute("data-city"));
      });
  }

  // Set the first tab to be open by default
  if (tablinks.length > 0) {
      tablinks[0].click();
  }


var search = ((searchInput, faqWrapper, searchResults, valueResult, tabsWrapper) => {
  const resCont = searchResults.querySelector('.faq__results-container');
  const nothingTxt = resCont?.dataset.text;
  searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      valueResult.innerText = query;
      resCont.innerHTML = '';
      if (query === '') {
          resCont.innerHTML = '';
          faqWrapper.style.display = 'block';
          tabsWrapper.style.display = 'block';
          searchResults.style.display = "none";
          //   searchWrapper.style.display = 'none';
      } else {
          faqWrapper.style.display = 'none';
          tabsWrapper.style.display = 'none';
          searchResults.style.display = "block";
          //   searchWrapper.style.display = 'block';
          const faqElements = faqWrapper.querySelectorAll('.wp-block-create-block-rd-addons-details');
          faqElements.forEach(faqElem => {
              const title = faqElem.querySelector('summary').textContent.toLowerCase();
              const text = faqElem.querySelector('.content').textContent.toLowerCase();
              if (title.includes(query) || text.includes(query)) {
                  const searchResultElem = document.createElement('div');
                  searchResultElem.classList.add('wp-block-create-block-rd-addons-details');

                  const details = document.createElement('details');
                  searchResultElem.appendChild(details);

                  // Create and append the headline
                  const headline = document.createElement('summary');
                  headline.textContent = faqElem.querySelector('summary').textContent;
                  details.appendChild(headline);

                  // Create and append the text
                  const resultText = document.createElement('div');
                  resultText.classList.add('content');
                  resultText.innerHTML = faqElem.querySelector('.content').innerHTML;
                  details.appendChild(resultText);

                  // Append the search result element to the search results container
                  resCont.appendChild(searchResultElem)
              }
          });
          if (resCont.innerHTML === '') {
              resCont.innerHTML = `<p class="faq__nothing">${nothingTxt}</p>`;
          }
      }
  });
});
// Ensure these variables reference actual DOM elements
let searchInput = document.querySelector('.faq__search-input');
let faqWrapper = document.querySelector('.faq__wrapper');
let searchResults = document.querySelector('.faq__results');
let valueResult = document.querySelector('.faq__results-value');
let tabsWrapper = document.querySelector('.tab_wrapper');
//   let searchWrapper = document.querySelector('.faq__tabs');

// Initialize the search function with the proper elements
if(document.querySelector('.faq__results-container')){
  search(searchInput, faqWrapper, searchResults, valueResult, tabsWrapper);
}
//faq page end

// JavaScript to initialize Flatpickr
// if(document.getElementById("#datePicker")){
 
// }

flatpickr("#datePicker", {
  enableTime: false, // Enable time selection
  dateFormat: "Y-m-d H:i", // Format of the date
  altInput: true, // Use an alternate input field
  altFormat: "F j, Y", // Human-friendly format
  disableMobile: "true"
});

});  // Dcumnet Script  ============ End =====> 



  
// single page slider start
let slideIndex = 1;
const slides = document.getElementsByClassName("gallery-slider");
const dots = document.getElementsByClassName("demo");
const prevButton = document.querySelector(".swiper-button-prev");
const nextButton = document.querySelector(".swiper-button-next");

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);

    prevButton.addEventListener("click", () => plusSlides(-1));
    nextButton.addEventListener("click", () => plusSlides(1));

    Array.from(dots).forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index + 1));
    });
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
    });

    Array.from(dots).forEach(dot => {
        dot.classList.remove("active");
    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}
// single page slider end