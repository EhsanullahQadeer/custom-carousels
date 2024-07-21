document.addEventListener("DOMContentLoaded", function () {
  /***************************displaying the components*******************************************************/

  // inital display of products
  displayProductsList(currentPage, filteredProducts);
  //  inital pagiantion
  setupPagination(filteredProducts.length, itemsPerPage);
  // Initial rendering of category and brand filters
  renderCategoryAndBrandFilters(categories, brands);
  // Call the function to render price range options initially
  renderPriceRangeOptions();
  /***************************filters*******************************************************/

  // Event listener for category and brand checkboxes
  document
    .querySelectorAll('input[name="category"], input[name="brand"]')
    .forEach((input) => {
      input.addEventListener("change", filterProducts);
    });

  // Event listener for price filter form submission
  document
    .getElementById("priceFilterForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      filterProducts();
    });

  const collapsibleItems = document.querySelectorAll(
    '[data-role="collapsible"]'
  );

  collapsibleItems.forEach(function (item) {
    const title = item.querySelector(".filter-options-title");

    // Toggle content visibility when title is clicked
    title.addEventListener("click", function () {
      const content = item.querySelector(".filter-options-content");
      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0";
      }
    });
  });

  function openModal() {
    document
      .querySelector(".filter-sidebar")
      .querySelector(".filter")
      .classList.toggle("open-modal");
  }

  document.querySelector(".filter-title").addEventListener("click", openModal);
  document.querySelector(".modal-header").addEventListener("click", openModal);
});
