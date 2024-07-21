function getSlidesPerView() {
  if (window.innerWidth >= 1025) return 5; // Large screens
  if (window.innerWidth >= 640) return 3; // Medium screens
  return 2; // Small screens
}

// Function to update carousel with products
function updateCarousel() {
  if (!caruoselProducts.length) {
    return;
  }

  slideContainer.innerHTML = "";
  dotNavigation.innerHTML = "";
  visibleSlides = getSlidesPerView();

  let slidesGroup = [...caruoselProducts];
  let missingSlides;
  do {
    missingSlides = visibleSlides - (slidesGroup.length % visibleSlides);
    if (missingSlides !== visibleSlides) {
      // Check if additional slides are needed
      slidesGroup = [
        ...slidesGroup,
        ...caruoselProducts.slice(0, missingSlides),
      ];
    }
  } while (missingSlides !== visibleSlides);
  slidesLength = slidesGroup.length;
  slidesGroup.forEach((product) => {
    const slideHTML = generateSlide(product);
    slideContainer.innerHTML += slideHTML;
  });

  const slides = document.querySelectorAll(".slide");
  slideWidth = slides[0].offsetWidth;
  totalSlideSets = Math.ceil(slides.length / visibleSlides);

  // Create dots based on the number of slide sets
  for (let i = 0; i < totalSlideSets; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      showSlide(i * visibleSlides);
    });
    dotNavigation.appendChild(dot);
  }

  // Show first slide initially
  showSlide(currentIndex, true);

  addDragAndTouchEvents();
  for (let i = 0; i < visibleSlides; i++) {
    // Append  and prepend each item to the new container
    slideContainer.appendChild(slides[i].cloneNode(true));
    slideContainer.prepend(slides[slides.length - (i + 1)].cloneNode(true));
  }
  // 
  const addButtons = document.querySelectorAll('.add-btn');
  const remButtons = document.querySelectorAll('.rem-btn');
  const countInputs = document.querySelectorAll('.count-input');
  addButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let currentValue = parseInt(countInputs[index].value, 10);
        countInputs[index].value = isNaN(currentValue) ? 1 : currentValue + 1;
    });
});

remButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let currentValue = parseInt(countInputs[index].value, 10);
        if (isNaN(currentValue)) {
            countInputs[index].value = 1;
        } else if (currentValue > 1) {
            countInputs[index].value = currentValue - 1;
        }
    });
});
}

// Function to show slides based on index
function showSlide(index, stopTransition) {
  if (index >= slidesLength + visibleSlides || index < -visibleSlides) {
    return;
  }
  currentIndex = index;
  //
  const offset = -(currentIndex + visibleSlides) * slideWidth; // Calculate transform offset
  if (stopTransition) {
    slideContainer.style.transition = "none";
  } else {
    slideContainer.style.transition = "transform 1.2s ease 0ms";
  }
  currentTranslate = offset;
  prevTranslate = offset;
  slideContainer.style.transform = `translateX(${offset}px)`;
  updateDots();
}

// Show previous set of slides
function showPrevSlide() {
  showSlide(currentIndex - visibleSlides);
}

// Show next set of slides
function showNextSlide() {
  showSlide(currentIndex + visibleSlides);
}

function checkIndex() {
  const slides = document.querySelectorAll(".slide");
  const slideWidth = slides[0].offsetWidth;
  const visibleSlides = Math.floor(slideContainer.offsetWidth / slideWidth);
  if (currentIndex === -visibleSlides) {
    showSlide(slidesLength - visibleSlides, true);
    return;
  }
  if (currentIndex === slidesLength) {
    showSlide(0, true);
    return;
  }
}

function updateDots() {
  // Update active dot
  const dots = document.querySelectorAll(".dot");
  const activeDotIndex =
    currentIndex > slidesLength - 1
      ? 0
      : Math.floor(Math.abs(currentIndex / visibleSlides));

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[activeDotIndex].classList.add("active");
}

// Transition events
slideContainer.addEventListener("transitionend", checkIndex);
// Add arrow controls listners
leftArrow.addEventListener("click", showPrevSlide);
rightArrow.addEventListener("click", showNextSlide);

// Initialize carousel
updateCarousel();
// Window resize event listener
window.addEventListener("resize", updateCarousel);


