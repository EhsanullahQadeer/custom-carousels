function setupPagination(totalItems, itemsPerPage) {
  const paginationContainer = document.querySelectorAll(".pagination");
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  let paginationHtml = "";

  if (currentPage > 1) {
    paginationHtml += `<button class="page-btn back-btn" data-page="${
      currentPage - 1
    }"></button>`;
  } else {
    paginationHtml += `<button class="page-btn back-btn disabled"></button>`;
  }

  const maxPageButtons = 5;
  let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  let endPage = startPage + maxPageButtons - 1;

  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHtml += `<button class="page-btn page-num ${
      i === currentPage ? "active" : ""
    }" data-page="${i}">${i}</button>`;
  }

  if (currentPage < pageCount) {
    paginationHtml += `<button class="page-btn next-btn" data-page="${
      currentPage + 1
    }"></button>`;
  } else {
    paginationHtml += `<button class="page-btn next-btn disabled"></button>`;
  }
  paginationContainer.forEach((container) => {
    container.innerHTML = paginationHtml;
  });
  document.querySelectorAll(".page-btn").forEach((button) => {
    if (!button.classList.contains("disabled")) {
      button.addEventListener("click", function () {
        const page = parseInt(this.getAttribute("data-page"));
        currentPage = page;
        displayProductsList(currentPage, filteredProducts);
        setupPagination(totalItems, itemsPerPage);
      });
    }
  });
}
