// Function to render category and brand checkboxes dynamically
function renderCategoryAndBrandFilters(categories, brands) {
  const categoryFilterHtml = categories
    .map(
      (category) => `
      <label><input type="checkbox" name="category" value="${category}"> <span>${category}</span></label>
  `
    )
    .join("");

  const brandFilterHtml = brands
    .map(
      (brand) => `
      <label><input type="checkbox" name="brand" value="${brand}"> <span>${brand}</span></label>
  `
    )
    .join("");

  document.getElementById("categoryFilter").innerHTML = categoryFilterHtml;
  document.getElementById("brandFilter").innerHTML = brandFilterHtml;
}

// Function to filter products based on current filters
function filterProducts() {
  const categoryFilters = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((input) => input.value);
  const brandFilters = Array.from(
    document.querySelectorAll('input[name="brand"]:checked')
  ).map((input) => input.value);

  const priceFilterForm = document.getElementById("priceFilterForm");
  const fromInput = priceFilterForm.querySelector(".am-filter-price.-from");
  const toInput = priceFilterForm.querySelector(".am-filter-price.-to");

  const minPrice = parseFloat(fromInput.value) || 0;
  const maxPrice = parseFloat(toInput.value) || Infinity;

  // Filter products based on all criteria
  filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilters.length === 0 ||
      categoryFilters.includes(product.category);
    const matchesBrand =
      brandFilters.length === 0 || brandFilters.includes(product.brand);
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesCategory && matchesBrand && matchesPrice;
  });

  currentPage = 1; // Reset to first page when filters change
  displayProductsList(currentPage, filteredProducts);
  setupPagination(filteredProducts.length, itemsPerPage);
}

// Function to render price range options dynamically
function renderPriceRangeOptions() {
  const priceRangeContainer = document.getElementById("price-selection-wrap");
  const priceFilterForm = document.getElementById("priceFilterForm");
  const fromInput = priceFilterForm.querySelector(".am-filter-price.-from");
  const toInput = priceFilterForm.querySelector(".am-filter-price.-to");
  priceRangeContainer.innerHTML = ""; // Clear previous options

  priceRanges.forEach((range) => {
    const label = `S/ ${range.min.toLocaleString()} - S/ ${range.max.toLocaleString()}`;
    const inputId = `price-${range.min}-${range.max}`;

    const html = `
          <label>
              <input type="radio" name="priceRange" id="${inputId}" data-min="${
      range.min
    }" data-max="${range.max}">
              <span class="label">
                  <span class="price">S/ ${range.min.toLocaleString()}</span> - 
                  <span class="price">S/ ${range.max.toLocaleString()}</span>
              </span>
          </label>
      `;

    priceRangeContainer.insertAdjacentHTML("beforeend", html);
  });

  // Attach event listener to handle price range selection
  priceRangeContainer.addEventListener("change", function (event) {
    if (event.target.matches('input[type="radio"][name="priceRange"]')) {
      const minPrice = parseFloat(event.target.dataset.min);
      const maxPrice = parseFloat(event.target.dataset.max);
      // Update the manual price input fields
      fromInput.value = minPrice;
      toInput.value = maxPrice;

      // Filter products based on the selected price range
      filterProducts();
    }
  });

  // Initial selection if a radio button is already checked
  const checkedRadio = priceRangeContainer.querySelector(
    'input[type="radio"][name="priceRange"]:checked'
  );
  if (checkedRadio) {
    const minPrice = parseFloat(checkedRadio.dataset.min);
    const maxPrice = parseFloat(checkedRadio.dataset.max);
    debugger;
    fromInput.value = minPrice.toLocaleString();
    toInput.value = maxPrice.toLocaleString();
  }
}
