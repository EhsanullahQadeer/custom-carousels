// Add drag and touch event listeners
function addDragAndTouchEvents() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    slide.addEventListener("touchstart", touchStart);
    slide.addEventListener("touchend", touchEnd);
    slide.addEventListener("touchmove", touchMove);
  });
}

function touchStart(event) {
  startPos = getPositionX(event);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  slideContainer.style.transition = "none";
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -50) {
    currentIndex += visibleSlides;
  }

  if (movedBy > 50) {
    currentIndex -= visibleSlides;
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
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slideContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = -(currentIndex + visibleSlides) * slideWidth;
  prevTranslate = currentTranslate;
  slideContainer.style.transition = "transform 1.2s ease 0ms";
  setSliderPosition();
}
