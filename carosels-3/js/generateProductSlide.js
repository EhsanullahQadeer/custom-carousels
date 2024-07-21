function generateSlide(product) {
  return `
          <div class="slide">
            <div class="slid-child-wrap">
              <div class="img-wrap">
                <img class="front-img" src="${product.imageUrl_1}" alt="${product.name}" />
                <img class="back-img" src="${product.imageUrl_2}" alt="${product.name}" />
                <span class="chip">${product.condtion}</span>
                <img class="heart-icon" src="./assets/heart-icon.svg" alt="heart"/>
              </div>
              <div class="product-details">
                <h3 class="product-item-desc"> ${product.description}</h3>
                <p class="product-item-category">${product.category}</p>
              </div>
            </div>

          </div>
        `;
}
