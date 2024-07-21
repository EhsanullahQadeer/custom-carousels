let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
const caruoselProducts = products.slice(0, 7);
document.addEventListener("DOMContentLoaded", function () {
  const slideContainer = document.querySelector(".slide-container");

  // Function to generate HTML for a single slide
  function generateSlide(product) {
    return `
        <div class="slide">
        <div class="slid-child-wrap">
        <div class="img-wrap">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-details">
          <strong class="product-item-brand-slide"> ${product.brand} </strong>
         <strong class="product-item-name-slide">${product.name}</strong>
        
          <div class="price-box-slide">
            <p class="special-price">
              <span class="price-label">Precio online</span>
              <span class="price">${formatPrice(product.onlinePrice)}</span>
            </p>

            <p class="old-price">
              <span class="price-label">Normal</span>
              <span class="price">&nbsp;${formatPrice(product.price)}</span>
            </p>
          </div>
        </div>
        </div>
      </div>
    `;
  }

  // Function to update carousel with products
  function updateCarousel() {
    const dotNavigation = document.querySelector(".dot-navigation");
    slideContainer.innerHTML = "";
    dotNavigation.innerHTML = "";
    // Adding duplicates of products for infinite scrolling effect
    const displayProducts = [
      ...caruoselProducts,
      ...caruoselProducts.slice(0, 2),
    ];

    displayProducts.forEach((product, index) => {
      const slideHTML = generateSlide(product);
      slideContainer.innerHTML += slideHTML;

      if (index < caruoselProducts.length) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
          showSlide(index);
        });
        dotNavigation.appendChild(dot);
      }
    });

    // Show first slide initially
    showSlide(0);

    addDragAndTouchEvents();
  }

  // Function to show slide based on index
  function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const slideWidth = slides[0].offsetWidth; // Width of each slide
    const dots = document.querySelectorAll(".dot");

    // Calculate the correct index to display
    currentIndex = index % caruoselProducts.length;
    const offset = -currentIndex * slideWidth; // Calculate transform offset
    slideContainer.style.transition = "transform 0.3s ease";
    slideContainer.style.transform = `translateX(${offset}px)`;

    // Update active dot
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  // Add drag and touch event listeners
  function addDragAndTouchEvents() {
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide, index) => {
        slide.addEventListener("dragstart", dragStart(index));
        slide.addEventListener("dragend", dragEnd);
        slide.addEventListener("dragover", dragOver);
        slide.addEventListener("touchstart", touchStart(index));
        slide.addEventListener("touchend", touchEnd);
        slide.addEventListener("touchmove", touchMove);
      const slideChildren = slide.querySelectorAll("*");
      slideChildren.forEach((child) => {
        child.setAttribute("draggable", true);
        child.addEventListener("dragstart", dragStart(index));
        child.addEventListener("dragend", dragEnd);
        child.addEventListener("dragover", dragOver);
        child.addEventListener("touchstart", touchStart(index));
        child.addEventListener("touchend", touchEnd);
        child.addEventListener("touchmove", touchMove);
      });
    });
  }

  function dragStart(index) {
    return function (event) {
      event.dataTransfer.setDragImage(
        event.target,
        window.outerWidth,
        window.outerHeight
      );
      currentIndex = index;
      startPos = event.pageX;
      isDragging = true;
      animationID = requestAnimationFrame(animation);
      slideContainer.style.transition = "none";
    };
  }

  function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) {
      currentIndex += 1;
    }

    if (movedBy > 100) {
      currentIndex -= 1;
    }

    // Wrap around logic
    if (currentIndex >= caruoselProducts.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = caruoselProducts.length - 1;
    }

    setPositionByIndex();
    updateDots(); // Update dots after drag ends
  }

  function dragOver(event) {
    if (isDragging) {
      event.preventDefault();
      const currentPosition = event.pageX;
      currentTranslate = prevTranslate + currentPosition - startPos;
      setSliderPosition();
    }
  }

  function touchStart(index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
      slideContainer.style.transition = "none";
    };
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50) {
      currentIndex += 1;
    }

    if (movedBy > 50) {
      currentIndex -= 1;
    }

    // Wrap around logic
    if (currentIndex >= caruoselProducts.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = caruoselProducts.length - 1;
    }

    setPositionByIndex();
    updateDots(); // Update dots after touch ends
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      setSliderPosition();
    }
  }

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    slideContainer.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setPositionByIndex() {
    const slideWidth = slideContainer.querySelector(".slide").offsetWidth;
    currentTranslate = currentIndex * -slideWidth;
    prevTranslate = currentTranslate;
    slideContainer.style.transition = "transform 0.3s ease";
    setSliderPosition();
  }

  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  // Initialize carousel
  updateCarousel();
});
