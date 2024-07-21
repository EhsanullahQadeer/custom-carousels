function displayProductsList(page,filteredProducts) {
  const productList = document.getElementsByClassName("products-list")[0];
  const totalProducts = document.querySelectorAll(".toolbar-number");
  
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  let productsHtml = paginatedProducts
    .map(
      (product) => `
      <div class="product-item-wrap">
        <div class="item product product-item">
          <div class="product-item-info">
            <span class="product-item-photo">
              <img
                class="product-image-photo"
                src="${product.image}"
                loading="lazy"
                width="240"
                height="300"
                alt="${product.name}"
              />
            </span>
            <div class="product details product-item-details">
              <div class="product-item-brand">
                <a href="" class="product-item-link">${product.brand}</a>
              </div>
              <div class="product-item-name">
                <a class="product-item-link" href="">
                  ${product.name}
                </a>
              </div>
              <div class="product-item-sku">Código ${product.id}</div>
              <div class="price-box">
                <span class="price">${formatPrice(product.price)}</span>
              </div>
              <div class="product-item-inner">
                <a href="#" class="tocompare">
                  <span>Añadir para comparar</span>
                </a>
                <div class="action-btn">
                  <button
                    title="Añadir al carro"
                    class="action tocart primary"
                  >
                    <span>Añadir al carro</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  productList.innerHTML = productsHtml;

  totalProducts.forEach((elem) => {
    elem.innerText = filteredProducts.length;
  });
}
